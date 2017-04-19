import { Schema } from 'mongoose'

export const SoundSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date()
    },
    chanel: {
        type: String
    }
});
