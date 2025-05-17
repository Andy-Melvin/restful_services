import { z } from 'zod';

// Schema for frontend validation
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['USER', 'ADMIN', 'user', 'admin']).optional().default('USER'),
});

// Internal schema that includes role (used in backend)
export const registerSchemaInternal = registerSchema.extend({
  role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

// Password strength validation
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(passwordRegex, 'Password must contain at least one number and one special character'),
});
