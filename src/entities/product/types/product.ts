import { Product, ProductImage, ProductTranslation } from "@/app/generated/prisma";
import { Language } from "@/shared/types/types";


export interface ProductResponce extends Product {
    images: ProductImage[],
    translations: ProductTranslation[]
}
export interface ProductDTO {
    id: number;
    price: number;
    stock: number;
    isActive: boolean;

    title: string;
    description: string;
    slug: string;
    language: Language;

    images: ProductImage[];
}
