import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z
    .string()
    .refine((val) => val.length > 0, { message: "Username is required" }),
  email: z
    .email({ message: "Invalid email" })
    .refine((val) => val.length > 0, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type User = z.infer<typeof userSchema>;
export type NewUser = Omit<User, "id">;

