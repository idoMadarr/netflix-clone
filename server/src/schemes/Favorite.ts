import { Schema, model } from 'mongoose';

const favoriteScheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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
})

export default model('Favorite', favoriteScheme);