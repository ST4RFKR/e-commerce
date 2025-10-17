import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { checkoutApi } from "../api/checkout-api"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"


export const useCreateOrder = () => {
    const queryClient = useQueryClient()
    const t = useTranslations("Checkout");
    const router = useRouter();

    return useMutation({
        mutationKey: ["createOrder", "cart"],
        mutationFn: checkoutApi.createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            toast.success(t("toast.success"));
            router.push("/");
        },
    })
}
