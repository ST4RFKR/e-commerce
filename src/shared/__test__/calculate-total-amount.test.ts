import { calculateTotalAmount } from '../lib/calculate-total-amount';
import { createMockCart, mockEmptyCart } from '@/entities/cart/__test__/fixtures/cart.fixtures';


describe('calculateTotalAmount', () => {
    it('should return 0 for empty cart', () => {
        const cart = mockEmptyCart();
        expect(calculateTotalAmount(cart.items)).toBe(0);
    });

    it('should calculate total for multiple items', () => {
        const cart = createMockCart();
        expect(calculateTotalAmount(cart.items)).toBe(850);
    });


});
