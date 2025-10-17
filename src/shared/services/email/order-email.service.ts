import { sendEmail } from "@/shared/components/email-templates/email-send/email-send";
import { CreateOrderEmailTemplate } from "@/shared/components/email-templates/create-order/create-order";
import { convertPrice } from "@/shared/lib/convert-price";
import { Language } from "@/shared/types/types";
import { CartItem, Product, ProductImage, ProductTranslation } from "@/app/generated/prisma";

interface CartItemWithProduct extends CartItem {
    productItem: (Product & {
        translations: ProductTranslation[];
        images: ProductImage[];
    }) | null
}
interface OrderEmailData {
    email: string;
    orderId: number;
    locale: Language;
    items: CartItemWithProduct[];
}

export const orderEmailService = {
    async sendOrderConfirmation(data: OrderEmailData) {
        try {
            const emailComponent = await CreateOrderEmailTemplate({
                locale: data.locale ?? 'uk',
                orderId: data.orderId,
                items: data.items.map((item) => ({
                    id: item.id,
                    productItem: {
                        id: item.productId,
                        name: item.productItem?.translations?.[0]?.title || '',
                        imageUrl: item.productItem?.images?.[0]?.imageUrl || '',
                    },
                    quantity: item.quantity,
                    price: convertPrice(
                        (item.productItem?.price || 0),
                        (data.locale ?? 'uk') as Language
                    ),
                })),
            });

            const subject = `Soap Bouquets / ${data.locale === 'en' ? 'Order' : 'Замовлення'
                } #${data.orderId}`;

            await sendEmail(data.email, subject, emailComponent);

            return { success: true };
        } catch (error) {
            console.error('Error sending order confirmation email:', error);
            throw error;
        }
    },
};
