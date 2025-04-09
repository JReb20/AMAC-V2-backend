import prisma from '../db';
import { User } from '../models/User';

class UserDao {
    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async findByToken(token) {
        return await prisma.user.findUnique({
            where: { token }
        });
    }

    async getUserByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                idUser: true,
                isAdmin: true,
                updateDate: true
            }
        });
        return user ? new User(user.idUser, user.isAdmin, user.updateDate) : null;
    }

    async personHasAccountWithoutPasswordByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user && user.hashPassword === null;
    }

    async personHasAccountWithPasswordByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user && user.hashPassword !== null;
    }

    async getPasswordByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { hashPassword: true }
        });
        return user ? user.hashPassword : null;
    }

    async isEmailNotExistOrHasNullPassword(email) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return !user || user.hashPassword === null;
    }

    async findById(id) {
        return await prisma.user.findUnique({
            where: { id }
        });
    }

    async getAllTeamLeaders() {
        return await prisma.user.findMany({
            where: { isTeamLeader: true }
        });
    }

    async getContactsByIdUser(userId) {
        return await prisma.user.findMany({
            where: { id: userId },
            include: { contacts: true } // Assurez-vous que la relation est définie dans votre modèle Prisma
        });
    }

    async getContactById(userId, contactId) {
        return await prisma.user.findFirst({
            where: {
                id: userId,
                contacts: { some: { id: contactId } }
            }
        });
    }

    async addContact(userId, contactId) {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                contacts: {
                    connect: { id: contactId }
                }
            }
        });
    }

    async removeContact(userId, contactId) {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                contacts: {
                    disconnect: { id: contactId }
                }
            }
        });
    }

    async findAllByRole(jobFunctionId) {
        return await prisma.user.findMany({
            where: { jobFunctionId }
        });
    }
}

export default new UserDao();