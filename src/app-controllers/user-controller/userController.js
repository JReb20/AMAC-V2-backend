import { corsMiddleware } from '../../../utils/cors';
import Joi from 'joi';
import userService from '../../../services/userService';
import { initializeServices } from '../../../services/initService';

initializeServices();

const userSchema = Joi.object({
    idUser: Joi.number().integer().required(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    phoneNumber: Joi.string().max(10).optional(),
    pictureUrl: Joi.string().max(255).optional(),
    dasId: Joi.string().max(50).optional(),
    matricule: Joi.string().optional(),
    isAdmin: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
});

const handlers = {
    '/users': async (req, res) => {
        if (req.method === 'GET') {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        }
    },

    '/users/allTeamLeaders': async (req, res) => {
        if (req.method === 'GET') {
            const teamLeaders = await userService.getAllTeamLeaders();
            return res.status(200).json(teamLeaders);
        }
    },

    '/users/allJobFunction': async (req, res) => {
        if (req.method === 'GET') {
            const jobFunctions = await userService.getAllJobFunctions();
            return res.status(200).json(jobFunctions);
        }
    },

    '/users/update-password': async (req, res) => {
        if (req.method === 'PATCH') {
            const { token, newPassword, passwordConfirmation } = req.body;
            const success = await userService.resetPasswordWithToken(token, newPassword, passwordConfirmation);
            return success ? res.status(200).json({ message: 'Password has been updated' }) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/teamLeader/{idUser}': async (req, res) => {
        if (req.method === 'GET') {
            const { idUser } = req.query;
            const teamLeader = await userService.getTeamLeaderById(idUser);
            return teamLeader ? res.status(200).json(teamLeader) : res.status(404).json({ message: 'Team leader not found' });
        }
    },

    '/users/{id_user}': async (req, res) => {
        const { id_user } = req.query;
        if (req.method === 'GET') {
            const user = await userService.getUserById(id_user);
            return user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
        } else if (req.method === 'PUT') {
            const user = req.body;
            const { error } = userSchema.validate(user);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedUser = await userService.updateUser(id_user, user);
            return updatedUser ? res.status(200).json(updatedUser) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/findByEmail/{email}': async (req, res) => {
        if (req.method === 'GET') {
            const { email } = req.query;
            const user = await userService.findByEmail(email);
            return user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/findByToken/{token}': async (req, res) => {
        if (req.method === 'GET') {
            const { token } = req.query;
            const user = await userService.findByToken(token);
            return user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/contacts': async (req, res) => {
        if (req.method === 'GET') {
            const contacts = await userService.getContacts();
            return res.status(200).json(contacts);
        }
    },

    '/users/contacts/{idContact}': async (req, res) => {
        if (req.method === 'POST') {
            const { idContact } = req.query;
            const success = await userService.toggleContact(idContact);
            return success ? res.status(200).json({ message: 'Successful' }) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/checkCredentials': async (req, res) => {
        if (req.method === 'POST') {
            const auth = req.body;
            const user = await userService.checkCredentials(auth);
            return user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/register': async (req, res) => {
        if (req.method === 'POST') {
            const user = req.body;
            const { error } = userSchema.validate(user);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const success = await userService.registerUser(user);
            return success ? res.status(200).json({ message: 'Registration successful' }) : res.status(400).json({ message: 'Failed to register' });
        }
    },

    '/users/checkLastUpdate': async (req, res) => {
        if (req.method === 'GET') {
            const { idUser, lastUpdateField } = req.query;
            const lastUpdate = await userService.checkLastUpdate(idUser, lastUpdateField);
            return lastUpdate ? res.status(200).json(lastUpdate) : res.status(404).json({ message: 'User or field not found' });
        }
    },

    '/users/addResetPasswordToken/{email}/{token}': async (req, res) => {
        if (req.method === 'POST') {
            const { email, token } = req.query;
            const success = await userService.addResetPasswordToken(email, token);
            return success ? res.status(200).json({ message: 'Password reset token updated' }) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/resetPasswordWithToken': async (req, res) => {
        if (req.method === 'POST') {
            const passwordChangeRequest = req.body;
            const success = await userService.resetPasswordWithToken(passwordChangeRequest.token, passwordChangeRequest.newPassword, passwordChangeRequest.passwordConfirmation);
            return success ? res.status(200).json({ message: 'Password has been updated' }) : res.status(404).json({ message: 'User not found' });
        }
    },

    '/users/findAllByRole': async (req, res) => {
        if (req.method === 'GET') {
            const { jobFunction } = req.query;
            const users = await userService.findAllByRole(jobFunction);
            return users ? res.status(200).json(users) : res.status(404).json({ message: 'Users by role not found' });
        }
    }
};

const handler = async (req, res) => {
    const { method, url } = req;

    if (method === 'POST' || method === 'GET') {
        const route = method === 'POST' ? url : url.split('?')[0];
        const routeHandler = handlers[route];

        if (routeHandler) {
            await routeHandler(req, res);
        } else {
            res.setHeader('Allow', Object.keys(handlers));
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default corsMiddleware(handler);