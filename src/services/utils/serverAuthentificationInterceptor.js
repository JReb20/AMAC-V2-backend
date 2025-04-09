import JwtTokenUtil from './jwtTokenUtil';

class ServerAuthenticationInterceptor {
    constructor(jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    intercept(req, res, next) {
        const token = req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            // Remove 'Bearer ' from the token
            token = token.slice(7, token.length);
        }
        // Check if the token is present and valid
        if (token) {
            try {
                const user = this.jwtTokenUtil.verifyToken(token);
                req.user = user;
            } catch (error) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }

        next();
    }
}

export default new ServerAuthenticationInterceptor(JwtTokenUtil);