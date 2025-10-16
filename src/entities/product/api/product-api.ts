import axios from "axios";
import { ProductDTO } from "../types/product";


export const productApi = {
    getProducts: async (language?: string) => {
        const params = new URLSearchParams();
        if (language) {
            params.append('language', language);
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}/product?${params.toString()}`;

        const response = await axios.get<ProductDTO[]>(url);
        return response.data;
    },
};
