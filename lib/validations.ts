import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  father_name: z.string().min(3, "Father's name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"]),
  intermediateGroup: z.string().min(1, "Please select your intermediate group"),
  otherGroup: z.string().optional(),
  courseInterest: z.string().min(2, "Please select a course"),
  address: z.string().min(10, "Please provide your full address"),
  message: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
