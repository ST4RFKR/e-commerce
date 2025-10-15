import { calculateTotalAmount } from '@/shared/lib/calculate-total-amount';
import { CartResponse } from "../types/cart";

import { Language } from '@/shared/types/types';
import prisma from '../../../../prisma/prisma-client';
import { Prisma } from '@/app/generated/prisma';


export const cartRepository = {
    async _recalculateCartTotal(tx: Prisma.TransactionClient, cartId: number): Promise<void> {
        const cart = await tx.cart.findFirst({
            where: { id: cartId },
            include: {
                items: {
                    include: {
                        productItem: {
                            include: {
                                images: { take: 1 },
                                translations: true
                            }
                        }
                    }
                }
            }
        });
        if (!cart) {
            throw new Error("CART_NOT_FOUND");
        }

        if (cart) {
            const totalAmount = calculateTotalAmount(cart.items);
            await tx.cart.update({
                where: { id: cartId },
                data: { totalAmount },
            });
        }
    },

    async findCartByToken(token: string, language: Language = 'en'): Promise<CartResponse | null> {
        const userCart = await prisma.cart.findFirst({
            where: { token },
            include: {
                items: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        productItem: {
                            include: {
                                images: { take: 1 },
                                translations: { where: { language } }
                            }
                        }
                    },
                }
            },
        });

        return userCart;
    },
    async createEmptyCart(token: string): Promise<CartResponse> {
        return await prisma.cart.create({
            data: {
                token,
                totalAmount: 0
            },
            include: {
                items: {
                    include: {
                        productItem: {
                            include: {
                                images: { take: 1 },
                                translations: true
                            }
                        }
                    },
                }
            },
        });
    },

    /**
    * Добавление товара в корзину
    */
    async addItem(token: string, productId: number): Promise<void> {
        return await prisma.$transaction(async (tx) => {
            // 1. Проверка продукта
            const product = await tx.product.findUnique({
                where: { id: productId },
            });

            if (!product) {
                throw new Error("PRODUCT_NOT_FOUND");
            }

            // 2. Находим или создаем корзину
            let userCart = await tx.cart.findFirst({
                where: { token },
            });

            if (!userCart) {
                userCart = await tx.cart.create({
                    data: { token },
                });
            }

            // 3. Находим товар в корзине
            const existingCartItem = await tx.cartItem.findFirst({
                where: {
                    cartId: userCart.id,
                    productId: productId,
                },
            });

            // 4. Обновляем или создаем CartItem
            if (existingCartItem) {
                await tx.cartItem.update({
                    where: { id: existingCartItem.id },
                    data: {
                        quantity: { increment: 1 },
                    },
                });
            } else {
                await tx.cartItem.create({
                    data: {
                        cartId: userCart.id,
                        productId: productId,
                        quantity: 1,
                    },
                });
            }

            // 5. Пересчитываем totalAmount
            await this._recalculateCartTotal(tx, userCart.id);
        });
    },
    async updateItemQuantity(cartItemId: number, quantity: number, token: string): Promise<void> {
        return await prisma.$transaction(async (tx) => {
            // 1. Валидация количества
            if (quantity < 1) {
                throw new Error("INVALID_QUANTITY");
            }

            // 2. Проверяем существование товара в корзине
            const cartItem = await tx.cartItem.findUnique({
                where: { id: cartItemId },
                include: { cart: true }
            });

            if (!cartItem) {
                throw new Error("CART_ITEM_NOT_FOUND");
            }

            // 3. Проверяем, что товар принадлежит корзине пользователя
            if (cartItem.cart.token !== token) {
                throw new Error("CART_ITEM_ACCESS_DENIED");
            }

            // 4. Обновляем количество
            await tx.cartItem.update({
                where: { id: cartItemId },
                data: { quantity },
            });
            // 5. Пересчитываем totalAmount
            await this._recalculateCartTotal(tx, cartItem.cartId);;

        });
    },
    async removeItem(cartItemId: number, token: string): Promise<void> {
        return await prisma.$transaction(async (tx) => {

            // 1. Проверяем существование товара в корзине
            const cartItem = await tx.cartItem.findUnique({
                where: { id: cartItemId },
                include: { cart: true }
            });

            if (!cartItem) {
                throw new Error("CART_ITEM_NOT_FOUND");
            }

            // 2. Проверяем, что товар принадлежит корзине пользователя
            if (cartItem.cart.token !== token) {
                throw new Error("CART_ITEM_ACCESS_DENIED");
            }

            // 3. Удаляем товар
            await tx.cartItem.delete({
                where: { id: cartItemId },
            });

            // 4. Пересчитываем totalAmount
            await this._recalculateCartTotal(tx, cartItem.cartId);
        });
    },

}
