import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, "Username is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const RegisterSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(1, "Username is required")
      .min(6, "Must be at least 6 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Email is invalid"),
    phone_number: z
      .string({
        required_error: "Phone number is required",
      })
      .min(1, "Phone number is required")
      .min(8, "Must be at least 8 characters"),
    first_name: z
      .string({
        required_error: "First name is required",
      })
      .min(1, "Must be at least 1 characters"),
    last_name: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required")
      .min(8, "Must be at least 8 characters")
      .max(32, "Password must be less than 32 characters")
      .refine(
        (value) => /[a-zA-Z]/.test(value),
        "Must be at least contain 1 alphabets"
      )
      .refine((value) => /\d/.test(value), "Must contain at least 1 number")
      .refine(
        (value) => /[A-Z]/.test(value),
        "Must be at least contain 1 capital case"
      )
      .refine(
        (value) => /[a-z]/.test(value),
        "Must be at least contain 1 small case"
      )
      .refine(
        (value) => /(?=.[#!@=])[^&\\;<>]+$/.test(value),
        "Must be at least contain 1 special characters"
      ),
    password_confirm: z
      .string({
        required_error: "Confirm your password",
      })
      .min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const LoginGoogleSchema = z.object({
  access_token: z
    .string({
      required_error: "Access token is required",
    })
    .min(1, "Access token is required"),
});

export const ValidateUserTempByIdSchema = z.object({
  identify: z
    .string({
      required_error: "Identify is required",
    })
    .min(1, "Identify is required"),
});

export const RegisterRemainSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(1, "Username is required")
      .min(6, "Must be at least 6 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Email is invalid"),
    phone_number: z
      .string({
        required_error: "Phone number is required",
      })
      .min(1, "Phone number is required")
      .min(8, "Must be at least 8 characters"),
    first_name: z
      .string({
        required_error: "First name is required",
      })
      .min(1, "Must be at least 1 characters"),
    last_name: z.string().optional(),
    image: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required")
      .min(8, "Must be at least 8 characters")
      .max(32, "Password must be less than 32 characters")
      .refine(
        (value) => /[a-zA-Z]/.test(value),
        "Must be at least contain 1 alphabets"
      )
      .refine((value) => /\d/.test(value), "Must contain at least 1 number")
      .refine(
        (value) => /[A-Z]/.test(value),
        "Must be at least contain 1 capital case"
      )
      .refine(
        (value) => /[a-z]/.test(value),
        "Must be at least contain 1 small case"
      )
      .refine(
        (value) => /(?=.[#!@=])[^&\\;<>]+$/.test(value),
        "Must be at least contain 1 special characters"
      ),
    password_confirm: z
      .string({
        required_error: "Confirm your password",
      })
      .min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export type RegisterRemainSchemaType = z.infer<typeof RegisterRemainSchema>;
export type ValidateUserTempByIdSchemaType = z.infer<
  typeof ValidateUserTempByIdSchema
>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginGoogleSchemaType = z.infer<typeof LoginGoogleSchema>;
