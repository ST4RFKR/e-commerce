import { productServices } from "@/entities/product/services/product.services";
import { Language } from "@/shared/types/types";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    const language = searchParams.get('language') || 'en';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '8';


    try {
        const products = await productServices.getAllProducts(language as Language, Number(page), Number(limit));

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

}
