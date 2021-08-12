"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const isAuth_1 = __importDefault(require("../utills/isAuth"));
const favoriteController_1 = require("../controllers/favoriteController");
const route = express_1.Router();
// Url: http://localhost:5000/favorite/
// Method: GET
// Desc: Fetch user favorites
// Security: Private
route.get('/', isAuth_1.default, favoriteController_1.fetchFavorites);
// Url: http://localhost:5000/favorite/add/:slideId
// Method: POST
// Desc: Add slide to favorites
// Security: Private
route.post('/add/:slideId', [
    express_validator_1.body('title', 'Title is required').notEmpty(),
    express_validator_1.body('rate', 'Rate is required').notEmpty(),
    express_validator_1.body('genre', 'Genre is required').notEmpty(),
    express_validator_1.body('overview', 'Overview is required').notEmpty(),
    express_validator_1.body('img', 'Img is required').notEmpty(),
    express_validator_1.body('slideId', 'SlideId is required').notEmpty(),
    isAuth_1.default
], favoriteController_1.addFavorite);
// Url: http://localhost:5000/favorite/remove/:slideId
// Method: DELETE
// Desc: Remove slide from favorites
// Security: Private
route.delete('/remove/:slideId', isAuth_1.default, favoriteController_1.removeFavorite);
exports.default = route;
