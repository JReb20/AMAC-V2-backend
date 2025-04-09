import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    origin: '*',
    credentials: true,
    allowedHeaders: '*',
    maxAge: 3600,
});

export const corsMiddleware = (handler) => async (req, res) => {
    await cors(req, res);
    return handler(req, res);
};