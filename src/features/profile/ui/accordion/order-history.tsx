"use client"

import { useGetOrders } from "@/entities/order/hooks/use-get-orders"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui"
import { Badge } from "@/shared/components/ui/badge"

import { Package } from "lucide-react"
import { useTranslations } from "next-intl"
import { OrderCard } from "../order-card/order-card"

// TODO: fix types

export interface OrderItem {
    productId: number
    sku: string
    title: string
    quantity: number
    price: number
    productItem: {
        id: number
        price: number
        images: [{
            id: number
            imageUrl: string
            productId: number
        }]
        translations: [{
            language: string
            title: string
        }]
    },
}

export interface Order {
    id: number
    userId: number
    token: string
    totalAmount: number
    status: string
    paymentId: string | null
    items: string
    fullName: string
    email: string
    phone: string
    comment: string | null
    deliveryType: string
    deliveryCity: string | null
    deliveryWarehouse: string | null
    deliveryStoreId: number | null
    createdAt: string
    updatedAt: string
}


export function OrderHistory() {
    const t = useTranslations("ProfilePage")
    const { data: orders, isLoading, error } = useGetOrders()


    if (isLoading) {
        return (
            <div className="border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5" />
                    <span className="font-semibold">{t("OrderHistory.title")}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t("OrderHistory.loading")}</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5" />
                    <span className="font-semibold">{t("OrderHistory.title")}</span>
                </div>
                <p className="text-sm text-destructive">{t("OrderHistory.error")}</p>
            </div>
        )
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5" />
                    <span className="font-semibold">{t("OrderHistory.title")}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t("OrderHistory.empty")}</p>
            </div>
        )
    }

    return (
        <Accordion type="single" collapsible className="border rounded-2xl">
            <AccordionItem value="orders" className="border-none">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2 px-2">
                        <Package className="w-5 h-5" />
                        <span>{t("OrderHistory.title")}</span>
                        <Badge variant="secondary" className="ml-2">
                            {orders.length}
                        </Badge>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4">
                    <div className="flex md:flex-row flex-col gap-3">
                        {orders.map((order: Order) => {
                            return (
                                <OrderCard key={order.id} order={order} />
                            )
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
