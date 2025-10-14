import { Cart, CartItem, Product, ProductImage, ProductTranslation } from "@/app/generated/prisma";
export type CartItemWithProduct = CartItem & {
    productItem: (Product & {
        translations: ProductTranslation[];
        images: ProductImage[];
    }) | null;
};


export interface CartResponse extends Cart {
    items: CartItemWithProduct[];
    totalAmount: number;
}
export interface CartItemDTO {
    id: number;
    productId: number;
    cartId: number;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
}

export interface CartDTO {
    items: CartItemDTO[];
    totalAmount: number;
}
