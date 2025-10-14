import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { cartApi } from "../api/cart-api"

export const useUpdateItemQuantity = () => {
    const queryClient = useQueryClient()
    const t = useTranslations("Cart");

    return useMutation({
        mutationKey: ["updateItemQuantity", "cart"],
        mutationFn: cartApi.updateItemQuantity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
    })
}
