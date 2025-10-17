'use client';
import { Plus } from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui";
import { useCurrencySymbol } from "@/shared/hooks";
import { useTranslations } from "next-intl";
import { useProductModal } from '@/features/product/model/use-product-modal';
import { ProductModal } from "@/features/product/ui/product-modal";
import { ProductDTO } from "@/entities/product/types/product";
type ProductCardProps = {
    product: ProductDTO;
};


export function ProductCard({ product }: ProductCardProps) {
    const { openModal } = useProductModal();


    const symbol = useCurrencySymbol();
    const t = useTranslations("HomePage");
    const { title, description, price, images, isActive } = product;


    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow pb-6">
            <div className="aspect-video overflow-hidden relative">
                <img
                    src={images[0].imageUrl}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div
                    className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-md
                        ${isActive
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                >
                    {isActive ? t("inStock") : t("outOfStock")}
                </div>
            </div>
            <CardHeader>
                <CardTitle className="text-md md:text-xl truncate">{title}</CardTitle>
                <CardDescription className="line-clamp-2 ">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 justify-between items-center">
                    <div className="text-lg md:text-2xl font-bold text-primary">
                        {price} {symbol}
                    </div>
                    <Button
                        className="flex items-center"
                        onClick={() => openModal(product)}
                    >
                        <Plus className=" h-4 w-4" />
                        <div className="font-semibold hidden sm:block md:block">
                            {t("toChoose")}
                        </div>
                    </Button>

                </div>
                <ProductModal />
            </CardContent>
        </Card>
    );
}
