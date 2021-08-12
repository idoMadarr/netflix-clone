"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoriteScheme = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    favorites: [
        {
            slideId: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            rate: {
                type: Number,
                required: true
            },
            genre: {
                type: String,
                required: true
            },
            overview: {
                type: String,
                required: true
            },
            img: {
                type: String,
                require: true
            },
            time: {
                type: Date,
                default: Date.now,
                required: true
            }
        }
    ]
});
exports.default = mongoose_1.model('Favorite', favoriteScheme);
