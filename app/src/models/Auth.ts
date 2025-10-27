import { userSchema } from "./User";
import { z } from "zod";

export const authLoginSchema = userSchema.pick({
  username: true,
  password: true,
});

export type AuthLogin = z.infer<typeof authLoginSchema>;

export const authRegisterSchema = userSchema.pick({
  username: true,
  email: true,
  password: true,
});

export type AuthRegister = z.infer<typeof authRegisterSchema>;

export type AuthVerifyData = {
  id: number;
  username: string;
  fullname: string;
  updated_at: string;
  role_id: number;
  role_name: string;
  redirect: string;
  // kapim_role_permissions: any;
};
