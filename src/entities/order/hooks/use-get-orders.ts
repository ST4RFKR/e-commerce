import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { orderApi } from "../api/order-api"


export const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => orderApi.getOrders(),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    })
}
