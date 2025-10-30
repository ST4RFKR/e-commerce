"use client";


import { Link } from "@/app/i18n/navigation";
import { LogoIcon } from "../../icons/logo-icon/logo-icon";
import { useTranslations } from "next-intl";


export function Logo() {
    const t = useTranslations("logo");

    return (
        <div className="flex items-center gap-3 group cursor-pointer select-none">
            <div className="transition-transform duration-300 group-hover:scale-105">
                <Link href="/" aria-label="Logotype link">
                    <LogoIcon width="60px" height="60px" />
                </Link>
            </div>
            <div className="flex flex-col leading-tight">
                <span className="font-semibold text-lg sm:text-xl text-primary tracking-tight">
                    {t("title")}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                    {t("description")}
                </span>
            </div>
        </div>
    );
}
