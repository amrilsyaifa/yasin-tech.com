"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userTempSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    phone_number: {
        type: String,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    image: {
        type: String,
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
const UserTemp = (0, mongoose_1.model)("UserTemp", userTempSchema);
exports.default = UserTemp;
