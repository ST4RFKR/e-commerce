import { convertPrice } from "@/shared/lib/convert-price";
import { productMapper } from "../model/product-mapper";



describe('productMapper', () => {
    it('should throw error when translation is missing', () => {
        const product = {
            id: 1,
            sku: 'sku',
            price: convertPrice(10, 'en'),
            stock: 10,
            isActive: true,
            images: [],
            translations: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        expect(() => productMapper.toDTO(product)).toThrow();
    });
    it('should correctly map a valid product to DTO', () => {


        const mockProduct = {
            id: 42,
            sku: 'flower-1',
            price: 100,
            stock: 15,
            isActive: true,
            images: [
                {
                    id: expect.any(Number),
                    productId: 42,
                    imageUrl: 'img1.jpg',
                },
            ],
            translations: [
                {
                    id: expect.any(Number),
                    language: 'en',
                    productId: 42,
                    title: 'Red Rose',
                    description: 'Beautiful red rose',
                    slug: 'red-rose',
                    metaTitle: null,
                    metaDesc: null,
                },
                {
                    id: expect.any(Number),
                    language: 'it',
                    productId: 42,
                    title: 'Rosa Rossa',
                    description: 'Bella rosa rossa',
                    slug: 'rosa-rossa',
                    metaTitle: null,
                    metaDesc: null,
                },
                {
                    id: expect.any(Number),
                    language: 'uk',
                    productId: 42,
                    title: 'Червона троянда',
                    description: 'Гарна червона троянда',
                    slug: 'chervona-troyanda',
                    metaTitle: null,
                    metaDesc: null,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        };


        const dto = productMapper.toDTO(mockProduct);

        expect(dto).toEqual({
            id: 42,
            price: expect.any(Number),
            stock: 15,
            isActive: true,
            title: 'Red Rose',
            description: 'Beautiful red rose',
            slug: 'red-rose',
            images: [{
                id: expect.any(Number),
                productId: 42,
                imageUrl: 'img1.jpg',
            }],
            language: 'en',
        });
    });
});
