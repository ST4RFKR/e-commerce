import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartApi } from "../api/cart-api"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"

export const useRemoveItemCart = () => {
    const queryClient = useQueryClient()
    const t = useTranslations("Cart");

    return useMutation({
        mutationKey: ["removeItemFromCart", "cart"],
        mutationFn: cartApi.removeItemFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            toast.success(t("toast.removed"));
        },
    })
}
