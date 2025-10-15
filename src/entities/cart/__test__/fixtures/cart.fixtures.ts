import { CartResponse } from '@/entities/cart/types/cart';

export const createMockCartItem = (overrides?: Partial<CartResponse['items'][0]>) => ({
    id: 1,
    cartId: 1,
    productId: 101,
    quantity: 2,
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-15T10:00:00Z"),
    productItem: {
        id: 101,
        sku: "LAPTOP-001",
        price: 250,
        stock: 15,
        isActive: true,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-10T00:00:00Z"),
        images: [
            {
                id: 1,
                productId: 101,
                imageUrl: "https://example.com/images/laptop-001.jpg",
            },
        ],
        translations: [
            {
                id: 1,
                productId: 101,
                language: "en",
                title: "Gaming Laptop Pro",
                description: "High-performance gaming laptop with RTX 4060",
                slug: "gaming-laptop-pro",
                metaTitle: "Buy Gaming Laptop Pro - Best Price",
                metaDesc: "Professional gaming laptop with latest specs",
            },
            {
                id: 2,
                productId: 101,
                language: "uk",
                title: "Ігровий Ноутбук Pro",
                description: "Високопродуктивний ігровий ноутбук з RTX 4060",
                slug: "igroviy-noutbuk-pro",
                metaTitle: "Купити Ігровий Ноутбук Pro - Найкраща Ціна",
                metaDesc: "Професійний ігровий ноутбук з новітніми характеристиками",
            },
        ],
    },
    ...overrides,
});

export const createMockCart = (overrides?: Partial<CartResponse>): CartResponse => ({
    id: 1,
    userId: 1,
    token: "test-cart-token-123",
    totalAmount: 850,
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-15T12:30:00Z"),
    items: [
        createMockCartItem({ id: 1, productId: 101, quantity: 2 }),
        createMockCartItem({
            id: 2,
            productId: 102,
            quantity: 1,
            productItem: {
                id: 102,
                sku: "MOUSE-002",
                price: 50,
                stock: 50,
                isActive: true,
                createdAt: new Date("2024-01-01T00:00:00Z"),
                updatedAt: new Date("2024-01-05T00:00:00Z"),
                images: [{
                    id: 2,
                    productId: 102,
                    imageUrl: "https://example.com/images/mouse-002.jpg",
                }],
                translations: [
                    {
                        id: 3,
                        productId: 102,
                        language: "en",
                        title: "Wireless Gaming Mouse",
                        description: "RGB gaming mouse with adjustable DPI",
                        slug: "wireless-gaming-mouse",
                        metaTitle: "Wireless Gaming Mouse - Ultra Precise",
                        metaDesc: "Professional wireless gaming mouse with RGB",
                    },
                ],
            },
        }),
        createMockCartItem({
            id: 3,
            productId: 103,
            quantity: 3,
            productItem: {
                id: 103,
                sku: "CABLE-003",
                price: 100,
                stock: 100,
                isActive: true,
                createdAt: new Date("2024-01-01T00:00:00Z"),
                updatedAt: new Date("2024-01-08T00:00:00Z"),
                images: [{
                    id: 3,
                    productId: 103,
                    imageUrl: "https://example.com/images/cable-003.jpg",
                }],
                translations: [
                    {
                        id: 5,
                        productId: 103,
                        language: "en",
                        title: "USB-C Fast Charging Cable",
                        description: "Durable 2m USB-C cable with fast charging support",
                        slug: "usb-c-fast-charging-cable",
                        metaTitle: "USB-C Cable - Fast Charging 100W",
                        metaDesc: "High-quality USB-C cable for fast charging",
                    },
                ],
            },
        }),
    ],
    ...overrides,
});

export const mockEmptyCart = (): CartResponse => createMockCart({
    id: 2,
    items: [],
    totalAmount: 0,
});
export const mockCartWithOneItem = (): CartResponse => createMockCart({
    id: 3,
    items: [createMockCartItem()],
    totalAmount: 500,
});

export const mockCartWithTwoItems = (): CartResponse => createMockCart({
    id: 4,
    items: [createMockCartItem(), createMockCartItem()],
    totalAmount: 1000,
});
