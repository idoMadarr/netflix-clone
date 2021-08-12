import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { FAVORITE_FAIL, NO_SLIDES } from '../notes/notes';

import Favorite from '../schemes/Favorite';
import { FavoriteModel } from '../models/FavoriteModel';

export const fetchFavorites: RequestHandler = async (req, res, next) => {
    const user = req.currentUser._id;

    try {
        const favorites = await Favorite.findOne({ user });
        
        if (!favorites || favorites.favorites.length === 0) {
            return res.status(401).json({ message: NO_SLIDES });
        }

        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
}

export const addFavorite: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const slideId = +req.params.slideId;
    const user = req.currentUser._id;

    try {
        // Check if the user already have a Favorites: 
        const favorites = await Favorite.findOne({ user });
        if (!favorites) {
            const newFavorite = await new Favorite({ user, favorites: [ { ...req.body } ] });
            await newFavorite.save();
            return res.status(200).json(newFavorite);
        }
        
        // Check if the slide already exists in user Favorites:
        const favoriteExists = favorites.favorites.find((slide: FavoriteModel) => slide.slideId === slideId);
        if (favoriteExists) {
            return res.status(401).json({ message: FAVORITE_FAIL });
        }

        const addFavorite = { ...req.body };
        await Favorite.findOneAndUpdate({ user }, { favorites: [ addFavorite, ...favorites.favorites ] }, { new: true });
        res.status(200).json({ message: `${addFavorite.title || addFavorite.name} added to your favorite list`, addFavorite });
    } catch (error) {
        next(error);
    }
}

export const removeFavorite: RequestHandler = async (req, res, next) => {
    const slideId = +req.params.slideId;
    const user = req.currentUser._id;

    try {
        let userFavorites = await Favorite.findOne({ user });
        
        const updateFavorites = userFavorites.favorites.filter((slide :FavoriteModel) => slide.slideId !== slideId);
        const favorite = userFavorites.favorites.find((slide :FavoriteModel) => slide.slideId === slideId);
        userFavorites.favorites = updateFavorites;
        
        await Favorite.findOneAndUpdate({ user }, { favorites: userFavorites.favorites }, { new: true });
        res.status(200).json({favorite, message: `${favorite.title || favorite.name} has removed from your list`});
    } catch (error) {
        next(error);
    }
}