import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productApi } from "../api/product-api";
import { useLocale } from "next-intl";


export const useProducts = (page = 1, limit = 8) => {
    const locale = useLocale();

    return useQuery({
        queryKey: ["products", locale, page, limit],
        queryFn: () => productApi.getProducts(locale, page, limit),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
};
