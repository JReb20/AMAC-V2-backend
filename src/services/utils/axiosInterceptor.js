import axios from 'axios';
import JwtTokenUtil from './jwtTokenUtil';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9191/api/v1', // Remplacez par l'URL de votre API
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = { id: 1, isAdmin: true, refreshTokenCode: 'refreshTokenCode' };
        const userToken = JwtTokenUtil.generateUserToken(user);
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;