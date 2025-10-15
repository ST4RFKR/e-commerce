import { z } from "zod";
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
export const CartItemDTOSchema = z.object({
  id: z.number(),
  productId: z.number(),
  cartId: z.number(),
  title: z.string(),
  imageUrl: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const CartDTOSchema = z.object({
  items: z.array(CartItemDTOSchema),
  totalAmount: z.number(),
});

export type CartItemDTO = z.infer<typeof CartItemDTOSchema>;
export type CartDTO = z.infer<typeof CartDTOSchema>;
