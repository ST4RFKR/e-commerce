import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { authApi } from "../api/auth-api"
import { useRouter } from "next/navigation";


export const useAuth = () => {
    const router = useRouter();

    return useMutation({
        mutationKey: ["auth"],
        mutationFn: authApi.registerUser,
        onSuccess: () => {
            toast.success("Проверьте почту, чтобы завершить регистрацию");
            router.push("/");
        },
    })
}
