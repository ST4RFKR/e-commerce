import { OrderStatus } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const cartToken = req.cookies.get("cartToken")?.value;

        if (!cartToken) {
            return NextResponse.json(
                { error: "CartToken not found" },
                { status: 404 }
            );
        }
        const userCart = await prisma.cart.findFirst({
            where: {
                token: cartToken,
            },
            include: {
                user: true,
                items: {
                    include: {
                        productItem: {
                            include: {
                                translations: true,
                            }
                        },
                    },
                },
            },
        });
        if (!userCart) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 404 }
            );
        }
        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                userId: userCart?.user?.id,
                status: OrderStatus.PENDING,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                comment: data.comment,
                totalAmount: userCart?.totalAmount,
                items: JSON.stringify(userCart.items),
            }
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: (error as Error)?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
