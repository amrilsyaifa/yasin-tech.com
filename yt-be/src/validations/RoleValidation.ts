import { z } from "zod";

export const RoleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required"),
  description: z.string().optional(),
});

export type CreateRole = z.infer<typeof RoleSchema>;
