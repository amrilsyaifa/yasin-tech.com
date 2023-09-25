"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uploadFileTempSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["doc", "file", "image"],
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    },
});
const UploadFileTemp = (0, mongoose_1.model)("UploadFileTemp", uploadFileTempSchema);
exports.default = UploadFileTemp;
