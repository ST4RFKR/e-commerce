import { Link } from "@/app/i18n/navigation";
import { Button } from "@/shared/components/ui";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

export function CheckoutEmpty() {
    const t = useTranslations("Checkout");

    return <div className="flex flex-col items-center justify-center gap-6 py-20 px-4">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-150" />
            <div className="relative bg-muted rounded-full p-10 shadow-lg">
                <ShoppingCart className="w-24 h-24 text-muted-foreground" strokeWidth={1.5} />
            </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
            <h3 className="text-3xl font-bold text-foreground text-balance">{t("cartEmpty")}</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
                {t("cartEmptyDescription")}
            </p>
        </div>
        <Button asChild size="lg" className="mt-4 shadow-md hover:shadow-lg transition-shadow">
            <Link href="/">{t("cartEmptyButton")}</Link>
        </Button>
    </div>
}
