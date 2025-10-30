import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"


import { profileApi } from "../api/profile-api";
import { useTranslations } from "next-intl";


export const useUpdateProfile = () => {
    const t = useTranslations("ProfilePage")

    return useMutation({
        mutationKey: ["profile", "auth"],
        mutationFn: profileApi.updateProfile,
        onSuccess: () => {
            toast.success(t("notifications.success"));
        }
    })
}
