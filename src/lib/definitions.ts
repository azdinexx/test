import { z } from 'zod';

export const SignupFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Please enter a valid email.' })
    .trim(),
  password: z.string(),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      error?: string;
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: number;
  userRole: string;
  expiresAt: Date;
};

export type ProfileFormState =
  | {
      error?: string;
      success?: string;
    }
  | undefined;
