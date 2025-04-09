import { FunctionalException, TechnicalException } from '../exceptions';
import { JobFunction } from '../models/JobFunction';
import { User } from '../models/User';
import userRepository from '../repositories/userRepository';
import jobFunctionRepository from '../repositories/jobFunctionRepository';
import { PasswordUtils } from '../utils/PasswordUtils';

class UserService {
    async fetchUsers() {
        const users = await userRepository.fetchUsers();
        if (users.length === 0) {
            throw new FunctionalException(404, "No users found");
        }
        return users;
    }

    async fetchUserById(userId) {
        const user = await userRepository.fetchUserById(userId);
        if (!user) {
            throw new FunctionalException(404, "No user found with id " + userId);
        }
        return user;
    }

    async checkCredentials(auth) {
        const user = await userRepository.findByEmail(auth.email);
        const password = await userRepository.getPasswordByEmail(auth.email);

        if (!password || password.isEmpty()) {
            throw new FunctionalException(400, "Invalid credentials");
        }
        if (!user.isActive) {
            throw new FunctionalException(403, "Account is not activated");
        }
        if (user.deletedDate) {
            throw new FunctionalException(403, "Account has been deleted");
        }

        if (!PasswordUtils.validatePassword(auth.password, password)) {
            throw new FunctionalException(400, "Invalid credentials");
        }

        return await userRepository.getUserByEmail(auth.email);
    }

    async createUser(user) {
        if (!await userRepository.isEmailNotExistOrHasNullPassword(user.email)) {
            throw new FunctionalException(409, "User already has an account");
        }

        // Validate email
        AuthUtils.validate(user.email);
        return await userRepository.createUser(user);
    }

    async updatePassword(userId, oldPassword, newPassword) {
        const user = await userRepository.fetchUserById(userId);
        if (!user) {
            throw new FunctionalException(404, "User not found");
        }

        if (!PasswordUtils.validatePassword(oldPassword, user.hashPassword)) {
            throw new FunctionalException(400, "Passwords don't match");
        }

        user.hashPassword = PasswordUtils.generateStrongPasswordHash(newPassword);
        return await userRepository.updateUser(user);
    }

    async addResetPasswordToken(email, token) {
        return await userRepository.addResetPasswordToken(email, token);
    }

    async passwordChangeWithToken(token, newPassword) {
        const user = await userRepository.findByToken(token);

        if (!PasswordUtils.isWithinLast15Minutes(user.tokenDate)) {
            throw new FunctionalException(401, "Your token expired, please retry");
        }

        user.hashPassword = PasswordUtils.generateStrongPasswordHash(newPassword);
        return await userRepository.updateUser(user);
    }

    async deleteById(userId) {
        const user = await userRepository.fetchUserById(userId);
        if (!user) {
            throw new FunctionalException(404, "User not found " + userId);
        }

        try {
            await userRepository.deleteById(userId);
            return true;
        } catch (error) {
            throw new TechnicalException("Failed to delete user");
        }
    }

    async updateUser(userId, user) {
        const existingUser = await this.fetchUserById(userId);
        user.hashPassword = existingUser.hashPassword;
        user.tokenDate = existingUser.tokenDate;
        user.token = existingUser.token;
        return await userRepository.updateUser(user);
    }

    async checkLastUpdate(idUser, lastUpdateField) {
        return await userRepository.checkLastUpdate(idUser, lastUpdateField);
    }

    async findByEmail(email) {
        return await userRepository.findByEmail(email);
    }

    async findByToken(token) {
        return await userRepository.findByToken(token);
    }

    async getAllJobFunction() {
        return await jobFunctionRepository.getAllJobFunction();
    }

    async getContacts(userId) {
        return await userRepository.getContacts(userId);
    }

    async getContactById(userId, contactId) {
        return await userRepository.getContactById(userId, contactId);
    }

    async addContact(userId, contactId) {
        return await userRepository.addContact(userId, contactId);
    }

    async removeContact(userId, contactId) {
        return await userRepository.removeContact(userId, contactId);
    }

    async getAllTeamLeaders() {
        return await userRepository.getAllTeamLeaders();
    }

    async findAllByRole(jobFunctionId) {
        return await userRepository.findAllByRole(jobFunctionId);
    }
}

export default new UserService();