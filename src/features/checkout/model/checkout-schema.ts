import { LanguageSchema } from '@/shared/types/types'
import { z } from 'zod'

export const checkoutSchema = z.object({
    firstName: z.string().min(2, 'Too short'),
    lastName: z.string().min(2, 'Too short'),
    email: z.string().email(),
    phone: z.string().min(2, 'Too short'),
    address: z.string().min(2, 'Too short').optional(),
    comment: z.string().min(2, 'Too short').optional(),
    locale: LanguageSchema.optional(),

})
export type CheckoutSchema = z.infer<typeof checkoutSchema>
