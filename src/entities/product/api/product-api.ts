import axios from "axios";
import { ProductDTO } from "../types/product";


export const productApi = {
    getProducts: async (language?: string, page = 1, limit = 8) => {
        const params = new URLSearchParams({
            ...(language && { language }),
            page: page.toString(),
            limit: limit.toString(),
        });


        const url = `${process.env.NEXT_PUBLIC_API_URL}/product?${params.toString()}`;

        const response = await axios.get<{
            products: ProductDTO[], pagination: {
                page: number,
                limit: number,
                total: number,
                pages: number
            }
        }>(url);
        return response.data;
    },
};
