import { Language } from "@/shared/types/types";
import { cartRepository } from "../repositories/cart.repository"
import { cartMapper } from "../model/cart-mapper";


export const cartServices = {
    async getCart(token: string, language: string) {
        let cart = await cartRepository.findCartByToken(token, language as Language);

        if (!cart) {
            cart = await cartRepository.createEmptyCart(token);
        }

        return cartMapper.toDTO(cart);
    },
    async addItemToCart(token: string, productId: number, userId: number): Promise<void> {
        await cartRepository.addItem(token, productId, userId);
    },

    async updateItemQuantity(cartItemId: number, quantity: number, token: string): Promise<void> {
        await cartRepository.updateItemQuantity(cartItemId, quantity, token);
    },

    async removeItemFromCart(cartItemId: number, token: string): Promise<void> {
        await cartRepository.removeItem(cartItemId, token);
    }

}
