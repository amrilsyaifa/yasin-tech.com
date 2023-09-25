"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonySchema = void 0;
const zod_1 = require("zod");
exports.TestimonySchema = zod_1.z.object({
    image: zod_1.z
        .string({
        required_error: "Image profile is required",
    })
        .min(1, "Image profile is required"),
    name: zod_1.z
        .string({
        required_error: "Full name is required",
    })
        .min(1, "Full name is required"),
    company: zod_1.z
        .string({
        required_error: "Company is required",
    })
        .min(1, "Company is required"),
    job_title: zod_1.z
        .string({
        required_error: "Job Title is required",
    })
        .min(1, "Job Title is required"),
    desc_ID: zod_1.z
        .string({
        required_error: "Description ID is required",
    })
        .min(1, "Description ID is required"),
    desc_EN: zod_1.z
        .string({
        required_error: "Description EN is required",
    })
        .min(1, "Description EN is required"),
    rating: zod_1.z
        .string({
        required_error: "Rating is required",
    })
        .min(1, "Rating is required"),
});
