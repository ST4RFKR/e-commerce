import { z } from "zod";
import { Product, ProductImage, ProductTranslation } from "@/app/generated/prisma";
import { LanguageSchema } from "@/shared/types/types";


export interface ProductResponce extends Product {
    images: ProductImage[],
    translations: ProductTranslation[]
}
export const ProductImageSchema = z.object({
    id: z.number(),
    productId: z.number(),
    imageUrl: z.string()
});

export const ProductDTOSchema = z.object({
    id: z.number().positive(),
    price: z.number().nonnegative(),
    stock: z.number().int().min(0),
    isActive: z.boolean(),
    title: z.string().min(1),
    description: z.string(),
    slug: z.string().min(1),
    language: LanguageSchema,

    images: z.array(ProductImageSchema),
});

export type ProductDTO = z.infer<typeof ProductDTOSchema>;
