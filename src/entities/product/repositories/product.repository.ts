import { Language } from "@/shared/types/types";
import prisma from "../../../../prisma/prisma-client";


export const productRepository = {

    async getAllProducts(language: Language = 'en', page = 1, limit = 8) {
        const skip = (page - 1) * limit;
        const products = await prisma.product.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                images: true,
                translations: {
                    where: { language },
                },
            },
        });
        const total = await prisma.product.count();
        return {
            products,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            }
        }
    }
}

