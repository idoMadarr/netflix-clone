"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailCheck = exports.signIn = exports.signUp = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const User_1 = __importDefault(require("../schemes/User"));
const notes_1 = require("../notes/notes");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
        const hashPassword = yield bcryptjs_1.hash(password, 12);
        const newUser = yield new User_1.default({ username, email, password: hashPassword });
        yield newUser.save();
        const payload = { id: newUser._id };
        const token = jsonwebtoken_1.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ token, username });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const userExist = yield User_1.default.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ message: notes_1.SIGN_IN_FAILED });
        }
        const isMatch = yield bcryptjs_1.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ message: notes_1.SIGN_IN_FAILED });
        }
        const payload = { id: userExist._id };
        const token = jsonwebtoken_1.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ token, username: userExist.username });
    }
    catch (error) {
        next(error);
    }
});
exports.signIn = signIn;
const emailCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const userExist = yield User_1.default.findOne({ email });
        if (userExist) {
            return res.status(401).json(true);
        }
        res.status(200).json(false);
    }
    catch (error) {
        next(error);
    }
});
exports.emailCheck = emailCheck;
