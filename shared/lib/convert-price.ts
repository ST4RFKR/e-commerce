import { Language } from "../types/types";

export function convertPrice(price: number, language: Language) {
    switch (language) {
        case 'uk': return price * 45;
        default: return price;
    }
}