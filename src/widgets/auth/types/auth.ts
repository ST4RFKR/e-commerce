import { z } from 'zod';


export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email required')
        .email('Invalid email'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
    fullName: z
        .string()
        .min(1, 'Full name required'),
    confirmPassword: z
        .string()
        .min(1, 'Confirm password required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
