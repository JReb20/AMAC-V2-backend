import { FunctionalException } from '../exceptions';
import { AuthInfraMapper } from '../mappers/authInfraMapper';
import { User } from '../models/User';
import personApiClient from './rest/userApiClient';

class AuthManager {
    async checkCredentials(auth) {
        const userJson = await personApiClient.checkCredentials(AuthInfraMapper.map(auth));

        if (!userJson) {
            throw new FunctionalException(502, "Failed to login user");
        }

        return new User(
            userJson.userId,
            userJson.isAdmin,
            userJson.updateDate
        );
    }

    async checkLastUpdate(user) {
        const isUpdated = await personApiClient.checkLastUpdate(user.id, user.lastUpdate);
        if (isUpdated === null) {
            throw new FunctionalException(502, "Failed to check last update");
        }
        return isUpdated;
    }
}

export default new AuthManager();