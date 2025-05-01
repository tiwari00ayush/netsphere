import { z } from 'zod';

// Login schema for email and password
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
});

// Signup schema extending login schema
export const signupSchema = loginSchema.extend({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().optional(),
});
