'use client';

import { useParams } from "next/navigation";

export function useCurrencySymbol() {
    const params = useParams();
    const locale = params.locale;

    const symbol = locale === "uk" ? "₴" : "€";

    return symbol;
}
