'use client';
import { Container } from "@/shared/components/common";
import { CheckoutFormPersonalData } from "./checkout-form-personal-data";
import { CheckoutBlock } from "./checkout-block";
import { CartDrawerItem } from "@/entities/cart/ui/cart-drawer-item";
import { useCurrencySymbol } from "@/shared/hooks";
import { useCart } from "@/entities/cart/hooks/use-cart";

import { useTranslations } from "next-intl";
import { CheckoutItemDetails } from "./checkout-item-details";
import { Package } from "lucide-react";
import { CartItemDTO } from "@/entities/cart/types/cart";

export function CheckoutPage() {
    const currencySymbol = useCurrencySymbol();
    const { data, onClickCountButton, onClickRemoveItemCart } = useCart();
    const t = useTranslations("Checkout");

    return (
        <Container className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold m-4">{t("title")}</h2>
            <div className="flex flex-col gap-4">

                <CheckoutBlock title={"1. " + t("productsInOrder")}>
                    {data?.items.map((item: CartItemDTO) => (
                        <CartDrawerItem
                            key={item.productId}
                            product={item}
                            symbol={currencySymbol}
                            onClickCountButton={onClickCountButton}
                            onRemove={onClickRemoveItemCart}
                        />
                    ))}
                </CheckoutBlock>
                <CheckoutBlock title={"2. " + t("totalAmount")}>
                    <CheckoutItemDetails
                        title={
                            <>
                                <Package className="text-neutral-300 mr-2" />
                                {t("totalAmount")}:
                            </>
                        }
                        value={`${data?.totalAmount} ${currencySymbol}`}
                    />

                </CheckoutBlock>
                <CheckoutFormPersonalData />

            </div>
        </Container>
    );
}
