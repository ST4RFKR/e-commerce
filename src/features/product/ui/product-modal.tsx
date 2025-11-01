"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Dialog, DialogContent } from "@/shared/components/ui"
import { cn } from "@/shared/lib/utils"
import { useCurrencySymbol } from "@/shared/hooks"
import { useProductModal } from "../model/use-product-modal"
import { useTranslations } from "next-intl"
import { ProductImage } from "@/app/generated/prisma"
import { useAddToCart } from "@/entities/cart"

export function ProductModal() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const symbol = useCurrencySymbol()
    const { isOpen, product, closeModal } = useProductModal()
    const t = useTranslations("HomePage");
    const addToCart = useAddToCart(closeModal);

    const handleAddToCart = () => {
        if (!product) return
        addToCart.mutate(product.id)
    }

    if (!product) return null

    const { title, description, price, images } = product

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent
                className="max-w-5xl w-full m-0 p-4 sm:p-6 md:p-8 bg-white rounded-2xl"
            >
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 relative">
                    {/* Left side: Images */}
                    <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                        {/* Main image */}
                        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] overflow-hidden rounded-xl sm:rounded-2xl shadow-md">
                            <img
                                src={images[currentImageIndex].imageUrl}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
                                {images.map((image: ProductImage, index: number) => (
                                    <div
                                        key={image.id}
                                        className={cn(
                                            "relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0",
                                            index === currentImageIndex
                                                ? "border-primary"
                                                : "border-transparent"
                                        )}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img
                                            src={image.imageUrl}
                                            alt={title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right side: Info */}
                    <div className="flex flex-col gap-4 sm:gap-6 flex-1">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight pr-8 sm:pr-0">
                                {title}
                            </h2>

                        </div>

                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                            {description}
                        </p>

                        {/* Spacer to push button to bottom */}
                        <div className="flex-grow" />

                        <div className="flex justify-between items-center gap-4 mt-4">
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap">
                                {price}
                                {symbol}
                            </p>
                            <Button
                                size="lg"
                                onClick={handleAddToCart}
                                className="flex sm:flex-none min-w-[140px] rounded-2xl"
                            >
                                <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                {t("addToCart")}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
