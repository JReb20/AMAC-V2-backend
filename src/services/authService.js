import { FunctionalException } from './exceptions';
import { AuthResponseJson, PasswordChangeWithTokenJson } from './models';
import authRepository from './repositories/authRepository';
import emailApiClient from './rest/emailApiClient';
import userApiClient from './rest/userApiClient';
import JwtTokenUtil from './utils/jwtTokenUtil';
import PasswordUtils from './utils/passwordUtils';

class AuthService {
    async login(auth) {
        try {
            const user = await authRepository.checkCredentials(auth);
            if (!user) {
                throw new FunctionalException(401, "Invalid credentials");
            }
            return this.getAuthResponseFromUser(user);
        } catch (error) {
            throw new FunctionalException(500, "Failed to login user");
        }
    }

    async register(userRegistrationJson) {
        try {
            // Validation de l'email
            AuthUtils.validate(userRegistrationJson.email);
            const token = PasswordUtils.generateRandomCode(40);
            const registered = await userApiClient.registerUser(userRegistrationJson);
            const tokenised = await userApiClient.addResetPasswordToken(userRegistrationJson.email, token);

            if (!registered || !tokenised) {
                throw new FunctionalException(400, "Failed to register user");
            }

            await emailApiClient.sendAccountCreationConfirmation(userRegistrationJson.email, token);
            return true;
        } catch (error) {
            throw new FunctionalException(400, "Failed to register user");
        }
    }

    async confirm(token) {
        const userJson = await userApiClient.findByToken(token);
        if (!userJson) {
            throw new FunctionalException(400, "Invalid token");
        }
        if (!PasswordUtils.isWithinLast15Minutes(userJson.tokenDate)) {
            throw new FunctionalException(401, "Your token expired, please retry");
        }

        userJson.isActive = true;
        return await userApiClient.updateUser(userJson.id, userJson);
    }

    getAuthResponseFromUser(user) {
        const userToken = JwtTokenUtil.generateUserToken(user);
        const refreshToken = JwtTokenUtil.generateRefreshToken(user);
        return new AuthResponseJson(userToken, refreshToken);
    }

    async getNewAuthToken(refreshToken) {
        const user = JwtTokenUtil.getUserFromRefreshToken(refreshToken);
        if (!user) {
            throw new FunctionalException(401, "Invalid refresh token");
        }
        if (!authRepository.checkLastUpdate(user)) {
            throw new FunctionalException(401, "Invalid refresh token");
        }

        return this.getAuthResponseFromUser(user);
    }

    async passwordForgot(email) {
        const token = PasswordUtils.generateRandomCode(40);
        const isSuccess = await userApiClient.addResetPasswordToken(email, token);
        if (!isSuccess) {
            return false;
        }
        return await emailApiClient.sendResetPasswordMail(email, token);
    }

    async resetPasswordWithToken(token, password, passwordConfirmation) {
        const userJson = await userApiClient.findByToken(token);
        if (password !== passwordConfirmation) {
            throw new FunctionalException(400, "Passwords don't match");
        }
        if (!userJson) {
            throw new FunctionalException(400, "Invalid token");
        }
        if (!PasswordUtils.isWithinLast15Minutes(userJson.tokenDate)) {
            throw new FunctionalException(401, "Your token expired, please retry");
        }

        const passwordChangeRequest = new PasswordChangeWithTokenJson(token, password);
        return await userApiClient.addResetPasswordToken(passwordChangeRequest);
    }
}

export default new AuthService();