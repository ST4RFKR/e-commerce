
import { productServices } from "@/entities/product";
import { Language } from "@/shared/types/types";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('language') || 'en';

    try {
        const products = await productServices.getAllProducts(language as Language);

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

}