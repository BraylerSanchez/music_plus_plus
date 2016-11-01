"use strict";
var mongoose_1 = require('mongoose');
var sound_schema_1 = require('./sound.schema');
exports.PlayListSchema = new mongoose_1.Schema({
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
    sounds: [sound_schema_1.SoundSchema],
    createAt: {
        type: Date,
        default: Date()
    },
    updateAt: {
        type: Date,
        default: Date()
    }
});
//# sourceMappingURL=playlist.schema.js.map