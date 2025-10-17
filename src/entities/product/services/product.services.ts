import { Language } from "@/shared/types/types";
import { productMapper } from "../model/product-mapper";
import { productRepository } from "../repositories/product.repository";

export const productServices = {
    async getAllProducts(language: Language = 'en', page: number, limit: number) {
        const res = await productRepository.getAllProducts(language, page, limit);

        return {
            products: res.products.map(productMapper.toDTO),
            pagination: { ...res.pagination }
        }
    }
}

