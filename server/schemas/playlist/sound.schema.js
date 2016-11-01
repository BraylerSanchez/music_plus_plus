"use strict";
var mongoose_1 = require('mongoose');
exports.SoundSchema = new mongoose_1.Schema({
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
        type: Date,
        default: Date()
    }
});
//# sourceMappingURL=sound.schema.js.map