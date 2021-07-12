import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { sign, JwtPayload } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';

import User from '../schemes/User';
import { UserModel } from '../models/UserModel';
import { SIGN_UP_FAILED, SIGN_IN_FAILED } from '../notes/notes';

export const signUp: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { username, email, password } = req.body;
        const userExist: UserModel = await User.findOne({ email });
        if (userExist) {
            return res.status(401).json({ message: SIGN_UP_FAILED });
        }
    
        const hashPassword = await hash(password, 12);
        const newUser = await new User({ username, email, password: hashPassword });
        await newUser.save();

        const payload: JwtPayload = { id: newUser._id };
        const token = sign(payload, process.env.JWT_SECRET!);       
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
}

export const signIn: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const userExist: UserModel = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ message: SIGN_IN_FAILED });
        }

        const isMatch = await compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ message: SIGN_IN_FAILED });
        }

        const payload: JwtPayload = { id: userExist._id };
        const token = sign(payload, process.env.JWT_SECRET!);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
}

export const emailCheck: RequestHandler = async (req, res, next) => {
    const { email } = req.body;

    try {
        const userExist: UserModel = await User.findOne({ email });
        if (userExist) {
            return res.status(401).json({ message: SIGN_IN_FAILED });
        }
        res.status(200).json(true);
    } catch (error) {
        next(error);
    }
}