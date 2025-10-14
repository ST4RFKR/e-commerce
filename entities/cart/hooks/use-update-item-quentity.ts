import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartApi } from "../api/cart-api"

export const useUpdateItemQuantity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["updateItemQuantity", "cart"],
        mutationFn: cartApi.updateItemQuantity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
    })
}
