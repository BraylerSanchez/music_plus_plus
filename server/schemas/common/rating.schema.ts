import { Schema } from 'mongoose'

export const RatingSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date()
    }
});