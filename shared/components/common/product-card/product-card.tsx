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
    const { title, description, price, images } = product;


    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow pb-6">
            <div className="aspect-video overflow-hidden">
                <img
                    src={images[0].imageUrl}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            <CardHeader>
                <CardTitle className="text-xl">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 justify-between">
                    <div className="text-2xl font-bold text-primary">
                        {price} {symbol}
                    </div>
                    <Button
                        className="flex items-center"
                        onClick={() => openModal(product)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        {t("toChoose")}
                    </Button>

                </div>
                <ProductModal />
            </CardContent>
        </Card>
    );
}