import { CartResponse } from "@/entities/cart/types/cart";

export function calculateTotalAmount(items: CartResponse["items"]): number {
    return items.reduce((sum, item) => sum + (item.productItem?.price || 0) * item.quantity, 0);
}
