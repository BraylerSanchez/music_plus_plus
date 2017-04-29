"use strict";
var mongoose_1 = require("mongoose");
exports.RatingSchema = new mongoose_1.Schema({
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
//# sourceMappingURL=rating.schema.js.map