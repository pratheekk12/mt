"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timezone_1 = require("../Services/timezone");
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    next: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: () => { return timezone_1.default().utc().toDate(); }
    }
}, {
    timestamps: {
        updatedAt: "updatedAt",
    },
    collection: "app_metadata",
});
exports.default = Schema;
//# sourceMappingURL=AppMetadata.js.map