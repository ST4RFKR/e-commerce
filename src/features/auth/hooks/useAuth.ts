import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { authApi } from "../api/auth-api"
import { useRouter } from "next/navigation";


export const useAuth = () => {
    // const queryClient = useQueryClient()
    const router = useRouter();

    return useMutation({
        mutationKey: ["auth"],
        mutationFn: authApi.registerUser,
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["cart"] })
            toast.success("Проверьте почту, чтобы завершить регистрацию");
            router.push("/");
        },
    })
}
