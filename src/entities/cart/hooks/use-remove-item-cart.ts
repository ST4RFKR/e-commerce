import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartApi } from "../api/cart-api"
import { toast } from "react-toastify"
import { useLocale, useTranslations } from "next-intl"
import { CartDTO, CartItemDTO } from "../types/cart"

export const useRemoveItemCart = () => {
    const queryClient = useQueryClient()
    const t = useTranslations("Cart");
    const locale = useLocale();

    return useMutation({
        mutationKey: ["removeItemFromCart", "cart"],
        mutationFn: cartApi.removeItemFromCart,
        onMutate: async (cartItemId: number) => {

            await queryClient.cancelQueries({ queryKey: ["cart", locale] });
            const previousCart = queryClient.getQueryData(["cart", locale]);

            queryClient.setQueryData(["cart", locale], (old: CartDTO) => {
                if (!old) return old;
                return {
                    ...old,
                    items: old.items.filter((item: CartItemDTO) =>
                        item.id !== cartItemId
                    ),
                    totalAmount: old.items.reduce((sum, item: CartItemDTO) => {
                        sum += item.quantity * (item.price ?? 0);
                        return sum
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart", locale] });
            toast.success(t("toast.removed"));
        },
    })
}
