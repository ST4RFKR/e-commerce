import { NextRequest, NextResponse } from "next/server";
import { cartRepository } from "@/entities/cart/repositories/cart.repository";
import { Language } from "@/shared/types/types";
import { cartServices } from "@/entities/cart/services/cart.services";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('language') || 'en';

    try {
        const token = req.cookies.get('cartToken')?.value;
        if (!token) {
            return NextResponse.json({
                items: [],
                totalAmount: 0,
                _count: { items: 0 }
            });
        }
        const cart = await cartServices.getCart(token, language as Language);
        return NextResponse.json(cart);


    } catch (error) {
        console.log("[CART_GET] Server Error", error);
        return NextResponse.json({ totalAmount: 0, items: [] });
    }

}


export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get("cartToken")?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const { productId } = await req.json();
        console.log(token, productId);


        const updatedCart = await cartRepository.addItem(token, productId);

        const response = NextResponse.json(updatedCart);
        response.cookies.set("cartToken", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
        });

        return response;

    } catch (error) {
        console.error("[CART_POST] Error", error);

        if (error instanceof Error) {
            if (error.message === "PRODUCT_NOT_FOUND") {
                return NextResponse.json(
                    { error: "Product not found" },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            { error: "Failed to add item to cart" },
            { status: 500 }
        );
    }
}

