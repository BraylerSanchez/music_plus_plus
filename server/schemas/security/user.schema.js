"use strict";
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
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
//# sourceMappingURL=user.schema.js.map