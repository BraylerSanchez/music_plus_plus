"use strict";
var mongoose_1 = require("mongoose");
var sound_schema_1 = require("./sound.schema");
var rating_schema_1 = require("../common/rating.schema");
exports.PlayListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userAt: {
        type: String,
        required: true
    },
    sounds: [sound_schema_1.SoundSchema],
    ratings: [rating_schema_1.RatingSchema],
    shared: {
        type: Boolean
    },
    createAt: {
        type: Date,
        default: Date()
    },
    updateAt: {
        type: Date,
        default: Date()
    }
});
exports.SharedPlaylistSchema = new mongoose_1.Schema({
    origin: {
        type: exports.PlayListSchema,
        required: true
    },
    playbacks: {
        type: [Date]
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
//# sourceMappingURL=playlist.schema.js.map