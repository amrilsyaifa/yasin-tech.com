"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRemainSchema = exports.ValidateUserTempByIdSchema = exports.LoginGoogleSchema = exports.RegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    username: zod_1.z
        .string({
        required_error: "Username is required",
    })
        .min(1, "Username is required"),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});
exports.RegisterSchema = zod_1.z
    .object({
    username: zod_1.z
        .string({
        required_error: "Username is required",
    })
        .min(1, "Username is required")
        .min(6, "Must be at least 6 characters"),
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .min(1, "Email is required")
        .email("Email is invalid"),
    phone_number: zod_1.z
        .string({
        required_error: "Phone number is required",
    })
        .min(1, "Phone number is required")
        .min(8, "Must be at least 8 characters"),
    first_name: zod_1.z
        .string({
        required_error: "First name is required",
    })
        .min(1, "Must be at least 1 characters"),
    last_name: zod_1.z.string().optional(),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(1, "Password is required")
        .min(8, "Must be at least 8 characters")
        .max(32, "Password must be less than 32 characters")
        .refine((value) => /[a-zA-Z]/.test(value), "Must be at least contain 1 alphabets")
        .refine((value) => /\d/.test(value), "Must contain at least 1 number")
        .refine((value) => /[A-Z]/.test(value), "Must be at least contain 1 capital case")
        .refine((value) => /[a-z]/.test(value), "Must be at least contain 1 small case")
        .refine((value) => /(?=.[#!@=])[^&\\;<>]+$/.test(value), "Must be at least contain 1 special characters"),
    password_confirm: zod_1.z
        .string({
        required_error: "Confirm your password",
    })
        .min(1, "Confirm your password"),
})
    .refine((data) => data.password === data.password_confirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
});
exports.LoginGoogleSchema = zod_1.z.object({
    access_token: zod_1.z
        .string({
        required_error: "Access token is required",
    })
        .min(1, "Access token is required"),
});
exports.ValidateUserTempByIdSchema = zod_1.z.object({
    identify: zod_1.z
        .string({
        required_error: "Identify is required",
    })
        .min(1, "Identify is required"),
});
exports.RegisterRemainSchema = zod_1.z
    .object({
    username: zod_1.z
        .string({
        required_error: "Username is required",
    })
        .min(1, "Username is required")
        .min(6, "Must be at least 6 characters"),
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .min(1, "Email is required")
        .email("Email is invalid"),
    phone_number: zod_1.z
        .string({
        required_error: "Phone number is required",
    })
        .min(1, "Phone number is required")
        .min(8, "Must be at least 8 characters"),
    first_name: zod_1.z
        .string({
        required_error: "First name is required",
    })
        .min(1, "Must be at least 1 characters"),
    last_name: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(1, "Password is required")
        .min(8, "Must be at least 8 characters")
        .max(32, "Password must be less than 32 characters")
        .refine((value) => /[a-zA-Z]/.test(value), "Must be at least contain 1 alphabets")
        .refine((value) => /\d/.test(value), "Must contain at least 1 number")
        .refine((value) => /[A-Z]/.test(value), "Must be at least contain 1 capital case")
        .refine((value) => /[a-z]/.test(value), "Must be at least contain 1 small case")
        .refine((value) => /(?=.[#!@=])[^&\\;<>]+$/.test(value), "Must be at least contain 1 special characters"),
    password_confirm: zod_1.z
        .string({
        required_error: "Confirm your password",
    })
        .min(1, "Confirm your password"),
})
    .refine((data) => data.password === data.password_confirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
});
