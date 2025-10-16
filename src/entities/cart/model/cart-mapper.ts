import { convertPrice } from "@/shared/lib/convert-price";
import { CartDTO, CartResponse } from "../types/cart";
import { Language } from "@/shared/types/types";


export const cartMapper = {
    toDTO(cart: CartResponse): CartDTO {
        let totalAmount = 0;
        return {
            items: cart.items.map(item => {
                const translation = item.productItem?.translations?.[0];
                const image = item.productItem?.images?.[0];
                const language = (translation?.language as Language) || 'en';

                const price = convertPrice(item.productItem?.price || 0, language);
                totalAmount += price * item.quantity;
                return {
                    id: item.id,
                    productId: item.productId,
                    cartId: item.cartId,
                    title: translation?.title || '',
                    imageUrl: image?.imageUrl || '',
                    price,
                    quantity: item.quantity
                };
            }),
            totalAmount
        };
    },
};
