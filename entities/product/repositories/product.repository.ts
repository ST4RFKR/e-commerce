import prisma from "@/prisma/prisma-client";
import { Language } from "@/shared/types/types";


export const productRepository = {

    async getAllProducts(language: Language = 'en') {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                images: true,
                translations: {
                    where: { language },
                },
            },
        });
        return products
    }
}

