import Joi from 'joi';
import { initializeServices } from '../../services/initService';
import authService from '../../services/authService';
import { corsMiddleware } from '../../services/utils/cors';

initializeServices();

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    dasId: Joi.string().required(),
    matricule: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

// Handlers pour chaque route
const handlers = {
    '/auth/login': async (req, res) => {
        const auths = req.body;
        const { error } = authSchema.validate(auths);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const authResponse = await authService.login(auths.email, auths.password);
        return res.status(200).json(authResponse);
    },

    '/auth/register': async (req, res) => {
        const registers = req.body;
        const { error } = registerSchema.validate(registers);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        await authService.register(registers);
        return res.status(200).json({ message: 'Registration successful' });
    },

    '/auth/register/confirm': async (req, res) => {
        const token = req.query.token;
        const success = await authService.confirmRegistration(token);
        return success ? res.status(200).json({ message: 'Account successfully activated' }) : res.status(400).json({ message: 'Invalid token' });
    },

    '/auth/password-forgot': async (req, res) => {
        const { email } = req.body;
        const success = await authService.passwordForgot(email);
        return success ? res.status(200).json({ message: 'Email sent with token' }) : res.status(404).json({ message: 'Email not found' });
    },

    '/auth/reset-password-with-token': async (req, res) => {
        const { token, password, passwordConfirmation } = req.body;
        const success = await authService.resetPasswordWithToken(token, password, passwordConfirmation);
        return success ? res.status(200).json({ message: 'Password reset successful' }) : res.status(404).json({ message: 'Token invalid or expired' });
    },

    '/auth/token': async (req, res) => {
        const { refreshToken } = req.query;
        const newToken = await authService.getNewAuthToken(refreshToken);
        return res.status(200).json(newToken);
    }
};

const handler = async (req, res) => {
    const { method, url } = req;

    if (method === 'POST' || method === 'GET') {
        const route = method === 'POST' ? url : url.split('?')[0];
        const routeHandler = handlers[route];

        if (routeHandler) {
            await routeHandler(req, res);
        }
        else {
            res.setHeader('Allow', Object.keys(handlers));
            res.status(405).end(`Method ${method} Not Allowed`);
        }

    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default corsMiddleware(handler);