"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSchema = void 0;
const mongoose_1 = require("mongoose");
exports.profileSchema = new mongoose_1.Schema({
    phone_number: {
        type: String,
        required: true,
        unique: true,
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
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address",
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
const Profile = (0, mongoose_1.model)("Profile", exports.profileSchema);
exports.default = Profile;
