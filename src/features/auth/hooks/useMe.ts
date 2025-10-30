import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth-api";

export const useMe = () => {


    return useQuery({
        queryKey: ["profile"],
        queryFn: () => authApi.getMe(),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
};
