'use client';
import { useCart } from "@/entities/cart/hooks/use-cart";
import { CartButton, LanguageSwitcher, Logo } from "@/shared/components/common";


export const Header = () => {


    const { data } = useCart();
    const items = data?.items ?? [];
    const totalAmount = data?.totalAmount ?? 0;

    return <header className="mb-8 flex items-center flex-col sm:flex-row justify-between">
        <Logo />
        <div className='flex gap-4'>
            <LanguageSwitcher />
            <CartButton count={items.length} total={totalAmount} />

        </div>
    </header>
};
