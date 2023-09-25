"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsSchema = exports.RolesSchema = void 0;
const zod_1 = require("zod");
const VALUES = ["publish", "draft"];
exports.RolesSchema = zod_1.z.object({
    roles: zod_1.z
        .object({
        title: zod_1.z.string().min(1, "Title is required"),
        slug: zod_1.z.string().min(1, "Slug is required"),
        description: zod_1.z.string(),
    })
        .array(),
});
exports.TagsSchema = zod_1.z.object({
    tags: zod_1.z
        .object({
        status: zod_1.z.enum(VALUES),
        slug: zod_1.z.string().min(1, "Slug is required"),
        name: zod_1.z.string().min(1, "Name is required"),
    })
        .array(),
});
