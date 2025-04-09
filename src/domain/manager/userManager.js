import { FunctionalException, TechnicalException } from '../exceptions';
import { User } from '../models/User';
import userDao from './userDao';
import { UserInfraMapper } from '../mappers/userInfraMapper';
import { JobFunction } from '../models/JobFunction';
import { JobFunctionRepository } from './jobFunctionRepository';

class UserManager {
    constructor(userDao, jobFunctionRepository) {
        this.userDao = userDao;
        this.jobFunctionRepository = jobFunctionRepository;
    }

    async fetchUsers() {
        const users = await this.userDao.fetchUsers();
        if (users.length === 0) {
            throw new FunctionalException(404, "No users found");
        }
        return UserInfraMapper.map(users);
    }

    async fetchUserById(userId) {
        const user = await this.userDao.fetchUserById(userId);
        if (!user) {
            throw new FunctionalException(404, "No user found with id " + userId);
        }
        return UserInfraMapper.map(user);
    }

    async createUser(user) {
        const existingUser = await this.userDao.findByEmail(user.email);
        if (existingUser) {
            throw new FunctionalException(409, "User already has an account");
        }

        return await this.userDao.create(user);
    }

    async deleteById(userId) {
        const user = await this.userDao.fetchUserById(userId);
        if (!user) {
            throw new FunctionalException(404, "User not found " + userId);
        }

        try {
            await this.userDao.deleteById(userId);
            return true;
        } catch (error) {
            throw new TechnicalException("Failed to delete user");
        }
    }

    async updateUser(userId, user) {
        const existingUser = await this.fetchUserById(userId);
        user.hashPassword = existingUser.hashPassword; // Keep the existing password
        return await this.userDao.update(user);
    }

    async checkLastUpdate(idUser, lastUpdateField) {
        return await this.userDao.checkLastUpdate(idUser, lastUpdateField);
    }

    async findByEmail(email) {
        const user = await this.userDao.findByEmail(email);
        if (!user) {
            throw new TechnicalException("User not found");
        }
        return UserInfraMapper.map(user);
    }

    async findByToken(token) {
        const user = await this.userDao.findByToken(token);
        if (!user) {
            throw new TechnicalException("User with this token not found");
        }
        return UserInfraMapper.map(user);
    }

    async addResetPasswordToken(email, token) {
        return await this.userDao.addResetPasswordToken(email, token);
    }

    async getAllJobFunction() {
        return await this.jobFunctionRepository.getAllJobFunction();
    }

    async getContacts(userId) {
        return await this.userDao.getContacts(userId);
    }

    async getContactById(userId, contactId) {
        return await this.userDao.getContactById(userId, contactId);
    }

    async addContact(userId, contactId) {
        return await this.userDao.addContact(userId, contactId);
    }

    async removeContact(userId, contactId) {
        return await this.userDao.removeContact(userId, contactId);
    }

    async getAllTeamLeaders() {
        return await this.userDao.getAllTeamLeaders();
    }

    async findAllByRole(jobFunctionId) {
        return await this.userDao.findAllByRole(jobFunctionId);
    }
}

export default new UserManager(userDao, new JobFunctionRepository());