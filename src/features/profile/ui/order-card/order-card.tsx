import { Card } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui/badge";
import { useCurrencySymbol } from "@/shared/hooks";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Clock, CreditCard, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Order, OrderItem } from "../accordion/order-history";
import { formatDate } from "@/shared/lib/format-date";

export function OrderCard({ order }: { order: Order }) {
    const t = useTranslations("ProfilePage")
    const symbol = useCurrencySymbol()

    const formattedDate = formatDate(order.createdAt)

    const statusConfig = {
        PENDING: { label: t("OrderHistory.status.PENDING"), color: "bg-yellow-500" },
        SUCCEEDED: { label: t("OrderHistory.status.SUCCEEDED"), color: "bg-green-500" },
        CANCELLED: { label: t("OrderHistory.status.CANCELLED"), color: "bg-red-500" },
        PROCESSING: { label: t("OrderHistory.status.PROCESSING"), color: "bg-blue-500" },
    }
    const items: OrderItem[] = JSON.parse(order.items)
    const statusInfo = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.PENDING
    return (
        <Card key={order.id} className="p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                        {t("OrderHistory.orderNumber")} {order.id}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                </div>
                <Badge variant="secondary" className="w-fit text-xs py-0">
                    {statusInfo.label}
                </Badge>
            </div>

            <Separator className="mb-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <div className="flex items-start gap-2">
                    <CreditCard className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{t("OrderHistory.amount")}</p>
                        <p className="font-semibold text-sm">
                            {order.totalAmount} {symbol}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{t("OrderHistory.orderDate")}</p>
                        <p className="font-semibold text-sm">{formattedDate}</p>
                    </div>
                </div>
            </div>

            <Separator className="mb-2" />

            <div className="flex items-start gap-2">
                <ShoppingBag className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1.5">{t("OrderHistory.products")}</p>
                    <div className="space-y-1.5">
                        {items.map((item, index) => (
                            <div
                                key={`${item.productId}-${index}`}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-muted/50 rounded-lg p-1.5"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {t("OrderHistory.productTitle")}: {item.productItem.translations[0].title}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">
                                        {item.quantity} {t("OrderHistory.quantity")}
                                    </span>
                                    <span className="font-semibold whitespace-nowrap">
                                        {item.productItem.price * item.quantity} {symbol}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}
