import { z } from "zod";

const VALUES = ["publish", "draft"] as const;

export const RolesSchema = z.object({
  roles: z
    .object({
      title: z.string().min(1, "Title is required"),
      slug: z.string().min(1, "Slug is required"),
      description: z.string(),
    })
    .array(),
});

export const TagsSchema = z.object({
  tags: z
    .object({
      status: z.enum(VALUES),
      slug: z.string().min(1, "Slug is required"),
      name: z.string().min(1, "Name is required"),
    })
    .array(),
});

export type RolesSchemaType = z.infer<typeof RolesSchema>;
export type TagsSchemaType = z.infer<typeof TagsSchema>;
