import axios from 'axios';

const emailApiClient = axios.create({
    baseURL: 'http://127.0.0.1:9199/api/v1',
});

// Fonction pour envoyer un email de confirmation de création de compte
export const sendAccountCreationConfirmation = async (email, token) => {
    try {
        const response = await emailApiClient.post('/send-confirmation', {
            email,
            token
        });
        return response;
    } catch (error) {
        throw new Error('Failed to send account creation confirmation email');
    }
};

// Fonction pour envoyer un email de réinitialisation de mot de passe
export const sendResetPasswordMail = async (email, token) => {
    try {
        const response = await emailApiClient.post('/send-reset-password', {
            email,
            token
        });
        return response;
    } catch (error) {
        throw new Error('Failed to send reset password email');
    }
};

export default {
    sendAccountCreationConfirmation,
    sendResetPasswordMail
};