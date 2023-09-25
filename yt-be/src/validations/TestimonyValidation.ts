import { z } from "zod";

export const TestimonySchema = z.object({
  image: z
    .string({
      required_error: "Image profile is required",
    })
    .min(1, "Image profile is required"),
  name: z
    .string({
      required_error: "Full name is required",
    })
    .min(1, "Full name is required"),
  company: z
    .string({
      required_error: "Company is required",
    })
    .min(1, "Company is required"),
  job_title: z
    .string({
      required_error: "Job Title is required",
    })
    .min(1, "Job Title is required"),
  desc_ID: z
    .string({
      required_error: "Description ID is required",
    })
    .min(1, "Description ID is required"),
  desc_EN: z
    .string({
      required_error: "Description EN is required",
    })
    .min(1, "Description EN is required"),
  rating: z
    .string({
      required_error: "Rating is required",
    })
    .min(1, "Rating is required"),
});

export type CreateTestimonyType = z.infer<typeof TestimonySchema>;
