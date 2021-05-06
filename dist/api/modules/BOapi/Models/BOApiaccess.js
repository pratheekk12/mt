"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    apiId: {
        type: String,
        required: true,
    },
    apiName: {
        type: String,
        required: false,
    },
    apiUserNode: {
        type: String,
        required: true,
    },
    apiUser: {
        type: String,
        required: true,
    },
    apiReturnValue: {
        type: String,
        required: true,
    },
    apiReturnStatus: {
        type: Boolean,
        required: true,
    },
    apiLastSuccessTime: {
        type: Date,
        required: true,
    },
}, {
    timestamps: {
        updatedAt: "updatedAt",
    },
    collection: "boapiaccess",
});
exports.default = Schema;
//# sourceMappingURL=BOApiaccess.js.map