import { Language } from "@/shared/types/types";
import { productMapper } from "../model/product-mapper";
import { productRepository } from "../repositories/product.repository";
import { ProductDTO } from "../types/product";

export const productServices = {
    async getAllProducts(language: Language = 'en'): Promise<ProductDTO[]> {
        const products = await productRepository.getAllProducts(language);

        return products.map(p => productMapper.toDTO(p));
    }

}