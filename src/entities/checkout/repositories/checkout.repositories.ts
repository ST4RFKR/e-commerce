import { cartRepository } from "@/entities/cart/server";
import prisma from "../../../../prisma/prisma-client";
import { OrderStatus } from "@/app/generated/prisma";
import { CheckoutSchema } from "@/features/checkout/model/checkout-schema";
import { emailService } from "@/shared/services/email/email.service";

export const checkoutRepository = {
    async createOrder(token: string, data: CheckoutSchema) {
        try {
            const userCart = await cartRepository.findCartByToken(token);
            if (!userCart) {
                throw new Error("CART_NOT_FOUND");
            }
            if (userCart?.totalAmount === 0) {
                throw new Error('Cart is empty');
            }
            const order = await prisma.$transaction(async (tx) => {
                // 1. Создаём заказ
                const newOrder = await tx.order.create({
                    data: {
                        token: token,
                        userId: userCart.userId,
                        status: OrderStatus.PENDING,
                        fullName: `${data.firstName} ${data.lastName}`,
                        email: data.email,
                        phone: data.phone,
                        comment: data.comment,
                        totalAmount: userCart.totalAmount,
                        items: JSON.stringify(userCart.items),
                    },
                });

                // 2. Очищаем корзину
                await tx.cartItem.deleteMany({
                    where: {
                        cartId: userCart.id,
                    },
                });

                // 3. Обнуляем totalAmount
                await tx.cart.update({
                    where: {
                        id: userCart.id,
                    },
                    data: {
                        totalAmount: 0,
                    },
                });

                return newOrder;
            });
            await emailService.sendOrderConfirmation({
                email: data.email,
                orderId: order.id,
                items: userCart.items,
                locale: data.locale ?? 'uk',
            });

            return {
                success: true,
                orderId: order.id,
            };
        } catch (error) {
            console.error('Repository error creating order:', error);
            throw error;
        }

    }
}
