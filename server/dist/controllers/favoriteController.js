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
exports.removeFavorite = exports.addFavorite = exports.fetchFavorites = void 0;
const express_validator_1 = require("express-validator");
const notes_1 = require("../notes/notes");
const Favorite_1 = __importDefault(require("../schemes/Favorite"));
const fetchFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.currentUser._id;
    try {
        const favorites = yield Favorite_1.default.findOne({ user });
        if (!favorites || favorites.favorites.length === 0) {
            return res.status(401).json({ message: notes_1.NO_SLIDES });
        }
        res.status(200).json(favorites);
    }
    catch (error) {
        next(error);
    }
});
exports.fetchFavorites = fetchFavorites;
const addFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const slideId = +req.params.slideId;
    const user = req.currentUser._id;
    try {
        // Check if the user already have a Favorites: 
        const favorites = yield Favorite_1.default.findOne({ user });
        if (!favorites) {
            const newFavorite = yield new Favorite_1.default({ user, favorites: [Object.assign({}, req.body)] });
            yield newFavorite.save();
            return res.status(200).json(newFavorite);
        }
        // Check if the slide already exists in user Favorites:
        const favoriteExists = favorites.favorites.find((slide) => slide.slideId === slideId);
        if (favoriteExists) {
            return res.status(401).json({ message: notes_1.FAVORITE_FAIL });
        }
        const addFavorite = Object.assign({}, req.body);
        yield Favorite_1.default.findOneAndUpdate({ user }, { favorites: [addFavorite, ...favorites.favorites] }, { new: true });
        res.status(200).json({ message: `${addFavorite.title || addFavorite.name} added to your favorite list`, addFavorite });
    }
    catch (error) {
        next(error);
    }
});
exports.addFavorite = addFavorite;
const removeFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slideId = +req.params.slideId;
    const user = req.currentUser._id;
    try {
        let userFavorites = yield Favorite_1.default.findOne({ user });
        const updateFavorites = userFavorites.favorites.filter((slide) => slide.slideId !== slideId);
        const favorite = userFavorites.favorites.find((slide) => slide.slideId === slideId);
        userFavorites.favorites = updateFavorites;
        yield Favorite_1.default.findOneAndUpdate({ user }, { favorites: userFavorites.favorites }, { new: true });
        res.status(200).json({ favorite, message: `${favorite.title || favorite.name} has removed from your list` });
    }
    catch (error) {
        next(error);
    }
});
exports.removeFavorite = removeFavorite;
