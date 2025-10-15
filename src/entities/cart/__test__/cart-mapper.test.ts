import { cartMapper } from '../model/cart-mapper';
import { createMockCart, mockCartWithOneItem, mockEmptyCart } from './fixtures/cart.fixtures';


// Мокаем convertPrice для контролируемого тестирования
jest.mock("@/shared/lib/convert-price", () => ({
    convertPrice: jest.fn((price: number, language: string) => {
        // Простая имитация конвертации для тестов
        if (language === 'uk') return price * 40; // курс гривны
        if (language === 'ru') return price * 90; // курс рубля
        return price; // для 'en' и других
    })
}));

describe('cartMapper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('toDTO', () => {
        it('should convert full cart with multiple items to DTO', () => {
            const mockCart = createMockCart();
            const result = cartMapper.toDTO(mockCart);

            expect(result).toEqual({
                items: [
                    {
                        id: 1,
                        productId: 101,
                        cartId: 1,
                        title: "Gaming Laptop Pro",
                        imageUrl: "https://example.com/images/laptop-001.jpg",
                        price: 250,
                        quantity: 2
                    },
                    {
                        id: 2,
                        productId: 102,
                        cartId: 1,
                        title: "Wireless Gaming Mouse",
                        imageUrl: "https://example.com/images/mouse-002.jpg",
                        price: 50,
                        quantity: 1
                    },
                    {
                        id: 3,
                        productId: 103,
                        cartId: 1,
                        title: "USB-C Fast Charging Cable",
                        imageUrl: "https://example.com/images/cable-003.jpg",
                        price: 100,
                        quantity: 3
                    }
                ],
                totalAmount: 850
            });
        });

        it('should handle empty cart', () => {
            const emptyCart = mockEmptyCart();
            const result = cartMapper.toDTO(emptyCart);

            expect(result).toEqual({
                items: [],
                totalAmount: 0
            });
        });

        it('should handle cart with one item', () => {
            const cartWithOneItem = mockCartWithOneItem();
            const result = cartMapper.toDTO(cartWithOneItem);

            expect(result.items).toHaveLength(1);
            expect(result.totalAmount).toBe(500);
        });


    });
});
