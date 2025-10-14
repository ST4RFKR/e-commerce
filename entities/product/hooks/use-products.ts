import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/product-api";
import { useLocale } from "next-intl";


export const useProducts = () => {
    const locale = useLocale();

    return useQuery({
        queryKey: ["product", locale],
        queryFn: () => productApi.getProducts(locale),
        staleTime: 1000 * 60 * 5,
    });
};
