import { PrismaClient } from '@prisma/client';
import emailApiClient from './rest/emailApiClient';
import UserApiClient from './rest/userApiClient';

const prisma = new PrismaClient();

export const initializeServices = () => {

    return {
        prisma,
        emailApiClient,
        UserApiClient
    };
};