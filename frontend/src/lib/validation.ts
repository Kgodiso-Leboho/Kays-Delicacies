import { z } from "zod";

export const authSchema = z.object({
  fullName: z.string().min(2, "Full name is required").optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});