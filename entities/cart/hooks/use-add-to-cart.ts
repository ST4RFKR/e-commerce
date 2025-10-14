import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"
import { cartApi } from "../api/cart-api"

export const useAddToCart = (closeModal?: () => void) => {
    const queryClient = useQueryClient()
    const t = useTranslations("Cart");

    return useMutation({
        mutationKey: ["addToCart", "cart"],
        mutationFn: cartApi.addProductToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            closeModal?.();
            toast.success(t("toast.added"));
        },
    })
}
