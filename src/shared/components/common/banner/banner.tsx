'use client';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
interface BannerProps {
    title?: string;
    description?: string;
    mobileImage: string;
    desktopImage: string;
    className?: string;
    overlayColor?: string; // например: "bg-black/40"
    textAlign?: 'left' | 'center' | 'right';
    contentPosition?: 'start' | 'center' | 'end';
}

export function Banner({
    title,
    description,
    mobileImage,
    desktopImage,
    className,
    overlayColor = "bg-black/30",
    textAlign = "center",
    contentPosition = "center"
}: BannerProps) {
    const contentAlignment = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end"
    };

    const textAlignment = {
        left: "text-left",
        center: "text-center",
        right: "text-right"
    };
    const t = useTranslations("HomePage");

    return (
        <div className={cn("relative h-[220px] w-full mb-5 overflow-hidden rounded-lg", className)}>
            {/* Mobile Image */}
            <div className="md:hidden absolute inset-0">
                <Image src={mobileImage} alt={"mobileImage"} fill className="object-cover" priority />
            </div>

            {/* Desktop Image */}
            <div className="hidden md:block absolute inset-0">
                <Image src={desktopImage} alt={'desktopImage'} fill className="object-cover" priority />
            </div>

            {/* Overlay */}
            <div className={cn("absolute inset-0", overlayColor)} />

            {/* Content */}
            <div className={cn(
                "relative z-10 h-full flex flex-col p-6",
                contentAlignment[contentPosition],
                textAlignment[textAlign]
            )}>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                    {title || t("Banner.title")}
                </h2>
                <p className="text-sm md:text-base max-w-md text-white">
                    {description || t("Banner.description")}
                </p>
            </div>
        </div>
    );
}
