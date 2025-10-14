import axios from "axios";


export const cartApi = {
    getCart: async (language?: string) => {
        const params = new URLSearchParams();
        if (language) {
            params.append('language', language);
        }
        const url = `${process.env.NEXT_PUBLIC_API_URL}/cart?${params.toString()}`;

        const response = await axios.get(url);
        return response.data;
    },

    addProductToCart: async (productId: number) => {
        const response = await axios.post(`/api/cart`, { productId })
        return response.data
    },
    updateItemQuantity: async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) => {
        const response = await axios.patch(`/api/cart/` + cartItemId, { quantity })
        return response.data
    },
    removeItemFromCart: async (cartItemId: number) => {
        const response = await axios.delete(`/api/cart/` + cartItemId)
        return response.data
    }

};
