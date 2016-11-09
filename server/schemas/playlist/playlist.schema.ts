import { Schema } from 'mongoose'
import { SoundSchema } from './sound.schema'

export const PlayListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userAt: {
        type: String,
        required: true
    },
    sounds: [SoundSchema],
    createAt: {
        type: Date,
        default: Date()
    },
    updateAt: {
        type: Date,
        default: Date()
    }
});
