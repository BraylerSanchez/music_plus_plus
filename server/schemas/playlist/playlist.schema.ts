import { Schema } from 'mongoose'
import { SoundSchema } from './sound.schema'
import { RatingSchema } from '../common/rating.schema'

export const PlayListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    userAt: {
        type: String,
        required: true
    },
    sounds: [SoundSchema],
    ratings: [RatingSchema],
    createAt: {
        type: Date,
        default: Date()
    },
    updateAt: {
        type: Date,
        default: Date()
    }
});

export const SharedPlaylistSchema = new Schema({
    origin: {
        type: PlayListSchema,
        required: true
    },
    sharedPlaylists: {
        type: [PlayListSchema]
    },
    userAt: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userPictureUrl: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date()
    }
});