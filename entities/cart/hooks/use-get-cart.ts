
import { useQuery } from "@tanstack/react-query";
import { cartApi } from "../api/cart-api";
import { useLocale } from "next-intl";



export const useGetCart = () => {
    const locale = useLocale();

    return useQuery({
        queryKey: ["cart", locale],
        queryFn: () => cartApi.getCart(locale),
        staleTime: 1000 * 60 * 5,
    });
};