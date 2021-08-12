import { Router } from 'express';
import { body } from 'express-validator';
import isAuth from '../utills/isAuth';
import { fetchFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController';

const route = Router();

// Url: http://localhost:5000/favorite/
// Method: GET
// Desc: Fetch user favorites
// Security: Private
route.get('/', isAuth, fetchFavorites);

// Url: http://localhost:5000/favorite/add/:slideId
// Method: POST
// Desc: Add slide to favorites
// Security: Private
route.post('/add/:slideId', [
    body('title', 'Title is required').notEmpty(),
    body('rate', 'Rate is required').notEmpty(),
    body('genre', 'Genre is required').notEmpty(),
    body('overview', 'Overview is required').notEmpty(),
    body('img', 'Img is required').notEmpty(),
    body('slideId', 'SlideId is required').notEmpty(),
    isAuth
], addFavorite);

// Url: http://localhost:5000/favorite/remove/:slideId
// Method: DELETE
// Desc: Remove slide from favorites
// Security: Private
route.delete('/remove/:slideId', isAuth, removeFavorite);

export default route;