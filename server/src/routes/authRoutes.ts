import { Router } from 'express';
import { body } from 'express-validator';
import { signUp, signIn, emailCheck } from '../controllers/authController';

const route = Router();

// Url: http://localhost:5000/auth/sign-up
// Method: POST
// Desc: Sign up
// Security: Public
route.post('/sign-up', [
    body('username', 'Username is required').notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password must be between 6 to 9 characters').isLength({ min: 6, max: 9 })
], signUp)

// Url: http://localhost:5000/auth/sign-in
// Method: POST
// Desc: Sign in
// Security: Public
route.post('/sign-in', [
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password must be between 6 to 9 characters').isLength({ min: 6, max: 9 })
], signIn)

// Url: http://localhost:5000/auth/email-validation
// Method: POST
// Desc: Email checking
// Security: Public
route.post('/email-validation', emailCheck)

export default route;