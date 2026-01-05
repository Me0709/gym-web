import type z from "zod";
import type { authSchema } from "../schemas/auth.schemas";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  TRAINER: 'trainer',
  MEMBER: 'member',
  VARIOUS: 'various',
} as const;

export type AppRole = typeof ROLES[keyof typeof ROLES];

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: AppRole[];
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export type LoginFormValues = z.infer<typeof authSchema>;
