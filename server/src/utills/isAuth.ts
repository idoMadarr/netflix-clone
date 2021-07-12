import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../schemes/User'; 

interface Decoded {
    id: string,
    iat: number
}

const isAuth: RequestHandler = async (req, res, next) => {
    const token: string = req.header('Authentication')?.split(' ')[1]!;
    
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET!) as Decoded;
        req.currentUser = await User.findById({ _id: decoded.id });
        next();
    } catch (error) {
        next(error);
    }
}

export default isAuth;