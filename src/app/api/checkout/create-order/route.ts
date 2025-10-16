import { checkoutSchema } from './../../../../features/checkout/model/checkout-schema';
import { NextRequest, NextResponse } from "next/server";
import { checkoutServices } from "@/entities/checkout/services/checkout.services";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const validatedData = checkoutSchema.parse(data);
        const cartToken = req.cookies.get("cartToken")?.value;

        if (!cartToken) {
            return NextResponse.json(
                { error: "CartToken not found" },
                { status: 404 }
            );
        }
        const order = await checkoutServices.createOrder(cartToken, validatedData);

        return NextResponse.json(order);

    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: (error as Error)?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
