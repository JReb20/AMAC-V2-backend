import jwt from 'jsonwebtoken';

class JwtTokenUtil {
    constructor(secret) {
        this.secret = secret || process.env.JWT_SECRET;
    }

    generateToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: '1h' });
    }

    verifyToken(token) {
        return jwt.verify(token, this.secret);
    }
}

export default new JwtTokenUtil();