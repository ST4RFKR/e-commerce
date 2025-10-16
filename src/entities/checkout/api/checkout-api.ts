import { CheckoutSchema } from "@/features/checkout/model/checkout-schema";
import axios from "axios";


export const checkoutApi = {
    createOrder: async (data: CheckoutSchema) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/checkout/create-order`;
        console.log('Request URL:', url);

        const response = await axios.post(url, data);
        return response.data;
    },
};
