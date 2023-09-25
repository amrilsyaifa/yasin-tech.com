import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required"),
  tags: z
    .object({
      value: z.string().min(1, "Value is required"),
      label: z.string().min(1, "Label is required"),
    })
    .array(),
  imageLinks: z.string().array().optional(),
  thumbnail: z.string().optional(),
  slug: z.string().optional(),
});

export const PostAPISchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required"),
  tag_ids: z.string().array(),
  status: z.string(),
  temp_images: z.string().array().optional(),
  thumbnail: z.string().optional(),
  slug: z.string().optional(),
});

export const ForShowPostAPISchema = z.object({
  for_show: z.boolean(),
});

export type ForShowPostAPISchemaType = z.infer<typeof ForShowPostAPISchema>;
export type PostSchemaType = z.infer<typeof PostSchema>;
export type PostAPISchemaType = z.infer<typeof PostAPISchema>;
