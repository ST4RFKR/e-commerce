import { calculateTotalAmount } from '@/shared/lib/calculate-total-amount';

import { CartDTO, CartResponse } from "../types/cart";

import prisma from "@/prisma/prisma-client";
import { cartMapper } from "../model/cart-mapper";
import { Language } from '@/shared/types/types';


export const cartRepository = {

    async findCart(language: Language = 'en', token: string): Promise<CartDTO> {

        const userCart = await prisma.cart.findFirst({
            where: { token },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productItem: {
                            include: {
                                images: {
                                    take: 1
                                },
                                translations: {
                                    where: {
                                        language: language
                                    }
                                }
                            }
                        }
                    },
                }
            },
        });
        if (!userCart) {
            return {
                items: [],
                totalAmount: 0,
            };
        }
        return cartMapper.toDTO(userCart);
    },
    /**
    * Добавление товара в корзину
    */
    async addItem(token: string, productId: number): Promise<CartResponse> {

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

            // 5. Получаем обновленную корзину
            const updatedCart = await tx.cart.findFirst({
                where: { token },
                include: {
                    items: {
                        orderBy: { createdAt: 'desc' },
                        include: {
                            productItem: {
                                include: {
                                    images: { take: 1 },
                                    translations: true
                                }
                            }
                        }
                    },
                },
            });

            if (!updatedCart) {
                throw new Error("CART_NOT_FOUND");
            }

            // 6. Пересчитываем totalAmount
            const totalAmount = calculateTotalAmount(updatedCart.items);

            // 7. Обновляем totalAmount в БД
            await tx.cart.update({
                where: { id: updatedCart.id },
                data: { totalAmount },
            });

            return {
                ...updatedCart,
                totalAmount
            };
        });
    },





}