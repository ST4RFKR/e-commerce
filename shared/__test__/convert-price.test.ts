import { convertPrice } from "../lib/convert-price";
import { Language } from "../types/types";

describe('convertPrice', () => {
    it('should return price multiplied by 45 for Ukrainian', () => {
        expect(convertPrice(10, 'uk')).toBe(450);
        expect(convertPrice(0, 'uk')).toBe(0);
    });

    it('should return original price for other languages', () => {
        expect(convertPrice(10, 'en')).toBe(10);
        expect(convertPrice(99, 'it')).toBe(99);
        expect(convertPrice(50, 'fr' as unknown as Language)).toBe(50);
    });
});