'use client';
import { useCart } from "@/entities/cart/hooks/use-cart";
import { CartButton, LanguageSwitcher, Logo } from "@/shared/components/common";
import { ProfileButton } from "@/shared/components/common/profile-button/profile-button";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useLocale } from "next-intl";
import { AuthModal } from "@/features/auth/ui";

export const Header = () => {
    const [open, setOpen] = useState(false);
    const params = useSearchParams();
    const router = useRouter();
    const locale = useLocale()
    const isVerified = params.has('verified');

    useEffect(() => {
        if (isVerified) {
            toast.success('Вы успешно зарегистрировались!');
            router.replace(`/${locale}`);
        }
    }, [isVerified, locale, router]);

    const { data } = useCart();
    const items = data?.items ?? [];
    const totalAmount = data?.totalAmount ?? 0;


    return <header className="mb-8 flex items-center flex-col sm:flex-row justify-between">
        <Logo />
        <div className='flex gap-4'>
            <LanguageSwitcher />

            <ProfileButton onClickSignIn={() => setOpen(true)} />
            <AuthModal open={open} onOpenChange={setOpen} />

            <CartButton count={items.length} total={totalAmount} />

        </div>
    </header>
};
