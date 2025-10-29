import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cart-api";
import { CartDTO, CartItemDTO } from "../types/cart";
import { useLocale } from "next-intl";

export const useUpdateItemQuantity = () => {
    const queryClient = useQueryClient();
    const locale = useLocale();

    return useMutation({
        mutationKey: ["updateItemQuantity", "cart", locale],
        mutationFn: cartApi.updateItemQuantity,

        onMutate: async ({ cartItemId, quantity }) => {

            await queryClient.cancelQueries({ queryKey: ["cart", locale] });
            const previousCart = queryClient.getQueryData(["cart", locale]);

            queryClient.setQueryData(["cart", locale], (old: CartDTO) => {
                if (!old) return old;
                return {
                    ...old,
                    items: old.items.map((item: CartItemDTO) =>
                        item.id === cartItemId ? { ...item, quantity } : item
                    ),
                    totalAmount: old.items.reduce((sum: number, item: CartItemDTO) => {
                        const q = item.id === cartItemId ? quantity : item.quantity;
                        return sum + q * (item.price ?? 0);
                    }, 0),
                };
            });

            return { previousCart };
        },

        onError: (_error, _vars, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(["cart", locale], context.previousCart);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart", locale] });
        },
    });
};
