import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date()
    }
});
