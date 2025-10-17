import { Language } from "@/shared/types/types";
import {
    Section,
    Heading,
    Text,
    Img,
    Row,
    Column,
} from "@react-email/components";

import { getTranslations } from "next-intl/server";


interface ProductItem {
    id: number;
    name: string;
    imageUrl?: string;
}

interface CartItem {
    id: number;
    productItem: ProductItem;
    quantity: number;
    price: number;
}

interface Props {
    orderId: number;
    items: CartItem[];
    locale: Language
}

export const CreateOrderEmailTemplate = async ({ orderId, items, locale }: Props) => {


    const t = await getTranslations({ locale, namespace: "EmailTemplate.createOrder" });
    console.log(locale)

    const totalAmount = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <Section className="py-[16px] text-center font-sans">
            {/* Заголовок */}
            <Heading as="h1" className="mb-[8px] text-[26px] font-semibold">
                {t("orderCreated")} 🎉
            </Heading>

            <Text className="mb-[16px] text-[16px] text-gray-700">
                {t("orderCreated")} <strong>#{orderId}</strong> {t("successfullyCreated")}.
            </Text>

            {/* Таблица товаров */}
            <Section className="my-[16px] rounded-[8px] border border-gray-200 border-solid p-[16px] pt-0">
                <table className="mb-[16px]" width="100%">
                    <thead>
                        <tr>
                            <th className="border-0 border-b border-solid border-gray-200 py-[8px]"></th>
                            <th
                                align="left"
                                className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
                                colSpan={6}
                            >
                                <Text className="font-semibold">{t("product")}</Text>
                            </th>
                            <th
                                align="center"
                                className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
                            >
                                <Text className="font-semibold">{t("quantity")}</Text>
                            </th>
                            <th
                                align="center"
                                className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
                            >
                                <Text className="font-semibold">{t("price")}</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="border-0 border-b border-solid border-gray-200 py-[8px]">
                                    <Img
                                        alt={item.productItem.name}
                                        className="rounded-[8px] object-cover"
                                        height={80}
                                        src={
                                            item.productItem.imageUrl ||
                                            "https://via.placeholder.com/80"
                                        }
                                    />
                                </td>
                                <td
                                    align="left"
                                    className="border-0 border-b border-solid border-gray-200 py-[8px]"
                                    colSpan={6}
                                >
                                    <Text>{item.productItem.name}</Text>
                                </td>
                                <td
                                    align="center"
                                    className="border-0 border-b border-solid border-gray-200 py-[8px]"
                                >
                                    <Text>{item.quantity}</Text>
                                </td>
                                <td
                                    align="center"
                                    className="border-0 border-b border-solid border-gray-200 py-[8px]"
                                >
                                    <Text>
                                        {(item.price * item.quantity).toFixed(2)} {t("currency")}
                                    </Text>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Row>
                    <Column align="right">
                        <Text className="mt-[8px] text-right text-[16px] font-semibold">
                            {t("totalAmount")}: {totalAmount} {t("currency")}
                        </Text>
                    </Column>
                </Row>
            </Section>

            {/* Подпись */}
            <Text className="mt-[16px] text-[14px] text-gray-600">
                {t("managerContact")}
            </Text>
            <Text className="mt-[8px] text-[14px] text-gray-500">
                {t("bestRegards")} <strong>Natalia 👋</strong>
            </Text>
        </Section>
    );
};
