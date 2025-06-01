import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),

  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .regex(/^[\w\s.,!?'"()-]+$/, "Message contains invalid characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export const textInputSchema = z
  .string()
  .min(1, "This field is required")
  .max(255, "Input must be less than 255 characters");

export type TextInputData = z.infer<typeof textInputSchema>;

export const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .or(z.literal(""))
  .optional();

export const phoneSchema = z
  .string()
  .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
  .optional()
  .or(z.literal(""));

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query cannot be empty")
    .max(100, "Search query must be less than 100 characters"),
});

export type SearchData = z.infer<typeof searchSchema>;
