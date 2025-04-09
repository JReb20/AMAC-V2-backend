import axios from 'axios';

const userApiClient = axios.create({
    baseURL: process.env.PERSON_SERVICE_URL || 'http://localhost:9195/api/v1',
});

// Fonction pour vérifier les informations d'identification
export const checkCredentials = async (auth) => {
    try {
        const response = await userApiClient.post('/check-credentials', auth);
        return response.data;
    } catch (error) {
        throw new Error('Failed to check credentials');
    }
};

// Fonction pour trouver un utilisateur par token
export const findByToken = async (token) => {
    try {
        const response = await userApiClient.get(`/find-by-token/${token}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to find user by token');
    }
};

// Fonction pour enregistrer un utilisateur
export const registerUser = async (userRegistrationJson) => {
    try {
        const response = await userApiClient.post('/register', userRegistrationJson);
        return response.data;
    } catch (error) {
        throw new Error('Failed to register user');
    }
};

// Fonction pour mettre à jour les détails d'un utilisateur
export const updateUser = async (userId, user) => {
    try {
        const response = await userApiClient.put(`/update/${userId}`, user);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

// Fonction pour ajouter un token de réinitialisation de mot de passe
export const addResetPasswordToken = async (email, token) => {
    try {
        const response = await userApiClient.post('/add-reset-password-token', { email, token });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add reset password token');
    }
};

export default {
    checkCredentials,
    findByToken,
    registerUser,
    updateUser,
    addResetPasswordToken
};