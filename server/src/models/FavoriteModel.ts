import { ObjectId } from 'mongoose';

export interface FavoriteModel {
    _id: ObjectId,
    slideId: number,
    title: string,
    rate: number,
    genre: string,
    overview: string,
    img: string,
    time: Date
}