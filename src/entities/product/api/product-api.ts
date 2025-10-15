import axios from "axios";
import { ProductDTO } from "../types/product";


export const productApi = {
    getProducts: async (language?: string) => {
        const params = new URLSearchParams();
        if (language) {
            params.append('language', language);
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}/product?${params.toString()}`;
        console.log('Request URL:', url); // Должно быть: /api/product?language=en

        const response = await axios.get<ProductDTO[]>(url);
        return response.data;
    },
};
