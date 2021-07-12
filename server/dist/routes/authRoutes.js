"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const route = express_1.Router();
// Url: http://localhost:5000/auth/sign-up
// Method: POST
// Desc: Sign up
// Security: Public
route.post('/sign-up', [
    express_validator_1.body('username', 'Username is required').notEmpty(),
    express_validator_1.body('email', 'Valid email is required').isEmail(),
    express_validator_1.body('password', 'Password must be between 6 to 9 characters').isLength({ min: 6, max: 9 })
], authController_1.signUp);
// Url: http://localhost:5000/auth/sign-in
// Method: POST
// Desc: Sign in
// Security: Public
route.post('/sign-in', [
    express_validator_1.body('email', 'Valid email is required').isEmail(),
    express_validator_1.body('password', 'Password must be between 6 to 9 characters').isLength({ min: 6, max: 9 })
], authController_1.signIn);
// Url: http://localhost:5000/auth/email-validation
// Method: POST
// Desc: Email checking
// Security: Public
route.post('/email-validation', authController_1.emailCheck);
exports.default = route;
