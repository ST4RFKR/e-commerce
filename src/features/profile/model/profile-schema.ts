import { z } from "zod";

export const profileSchema = z.object({
    fullName: z.string().min(2, 'Too short'),
    email: z.string().email(),
    phone: z.string().min(2, 'Too short').optional(),
    address: z.string().min(2, 'Too short').optional(),
    password: z.string().min(2, 'Too short'),
    confirmPassword: z
        .string()
        .min(1, 'Confirm password required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});


export type Profile = z.infer<typeof profileSchema>
