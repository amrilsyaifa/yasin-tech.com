"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForShowPostAPISchema = exports.PostAPISchema = exports.PostSchema = void 0;
const zod_1 = require("zod");
exports.PostSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title is required",
    })
        .min(1, "Title is required"),
    description: zod_1.z
        .string({ required_error: "Description is required" })
        .min(1, "Description is required"),
    tags: zod_1.z
        .object({
        value: zod_1.z.string().min(1, "Value is required"),
        label: zod_1.z.string().min(1, "Label is required"),
    })
        .array(),
    imageLinks: zod_1.z.string().array().optional(),
    thumbnail: zod_1.z.string().optional(),
    slug: zod_1.z.string().optional(),
});
exports.PostAPISchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title is required",
    })
        .min(1, "Title is required"),
    description: zod_1.z
        .string({ required_error: "Description is required" })
        .min(1, "Description is required"),
    tag_ids: zod_1.z.string().array(),
    status: zod_1.z.string(),
    temp_images: zod_1.z.string().array().optional(),
    thumbnail: zod_1.z.string().optional(),
    slug: zod_1.z.string().optional(),
});
exports.ForShowPostAPISchema = zod_1.z.object({
    for_show: zod_1.z.boolean(),
});
