import { ObjectId } from 'mongoose';

export interface UserModel {
    _id: ObjectId,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}