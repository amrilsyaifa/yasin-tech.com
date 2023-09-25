"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testimonySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
    },
    desc_ID: {
        type: String,
        required: true,
    },
    desc_EN: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ["draft", "publish"],
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
const Testimony = (0, mongoose_1.model)("Testimony", testimonySchema);
exports.default = Testimony;
