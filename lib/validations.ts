import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"]),
  intermediateGroup: z.string().min(2, "Please specify your intermediate group"),
  courseInterest: z.string().min(2, "Please select a course"),
  address: z.string().min(10, "Please provide your full address"),
  message: z.string().optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
