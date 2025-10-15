import { NextRequest, NextResponse } from "next/server";
import { cartServices } from "@/entities/cart/server";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const { quantity } = await req.json();
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 404 }
            );
        }

        await cartServices.updateItemQuantity(parseInt(id), quantity, token);

        return NextResponse.json(
            { message: "Item updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[CART_PATCH] Error", error);

        if (error instanceof Error) {
            if (error.message === "INVALID_QUANTITY") {
                return NextResponse.json(
                    { error: "Quantity must be at least 1" },
                    { status: 400 }
                );
            }
            if (error.message === "CART_ITEM_NOT_FOUND") {
                return NextResponse.json(
                    { error: "Cart item not found" },
                    { status: 404 }
                );
            }
            if (error.message === "CART_ITEM_ACCESS_DENIED") {
                return NextResponse.json(
                    { error: "Access denied" },
                    { status: 403 }
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

        await cartServices.removeItemFromCart(parseInt(id), token);

        return NextResponse.json(
            { message: "Item deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[CART_DELETE] Error", error);

        if (error instanceof Error) {
            if (error.message === "CART_ITEM_NOT_FOUND") {
                return NextResponse.json(
                    { error: "Cart item not found" },
                    { status: 404 }
                );
            }
            if (error.message === "CART_ITEM_ACCESS_DENIED") {
                return NextResponse.json(
                    { error: "Access denied" },
                    { status: 403 }
                );
            }
        }

        return NextResponse.json(
            { error: "Failed to delete item" },
            { status: 500 }
        );
    }
}
