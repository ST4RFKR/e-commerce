import { cartRepository } from "@/entities/cart/repositories/cart.repository";
import { Language } from "@/entities/product/types/product";
import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cartItemId = parseInt(id);
    const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";

    try {

        const { quantity } = await req.json();
        const token = req.cookies.get("cartToken")?.value;
        console.log(id);


        if (!token) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 404 }
            );
        }
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                id: cartItemId,
            },
        });
        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }
        await prisma.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity,
            },
        });
        const updateCart = await cartRepository.findCart(locale as Language, token);

        return NextResponse.json(updateCart);

    } catch (error) {
        console.error("[CART_PATCH] Error", error);

        if (error instanceof Error) {
            if (error.message === "INVALID_QUANTITY") {
                return NextResponse.json(
                    { error: "Quantity must be at least 1" },
                    { status: 400 }
                );
            }
            if (error.message === "CART_NOT_FOUND") {
                return NextResponse.json(
                    { error: "Cart not found" },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            { error: "Failed to update item" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const token = req.cookies.get("cartToken")?.value;
        if (!token) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 404 }
            );
        }
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }
        await prisma.cartItem.delete({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json(
            { message: "Item deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[CART_DELETE] Error", error);
        return NextResponse.json(
            { error: "Failed to delete item" },
            { status: 500 }
        );
    }
}