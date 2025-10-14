import { convertPrice } from "@/shared/lib/convert-price";
import { ProductDTO, ProductResponce } from "@/entities/product/types/product";
import { Language } from "@/shared/types/types";

export const productMapper = {
    toDTO(product: ProductResponce): ProductDTO {
        const translation = product.translations[0];

        if (!translation) {
            throw new Error('Translation not found');
        }

        return {
            id: product.id,
            price: convertPrice(product.price, translation.language as Language),
            stock: product.stock,
            isActive: product.isActive,
            title: translation.title,
            description: translation.description,
            slug: translation.slug,
            images: product.images,
            language: translation.language as Language

        };
    },
};