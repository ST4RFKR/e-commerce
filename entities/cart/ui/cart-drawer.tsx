'use client';
import React from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Link } from '@/app/i18n/navigation';
import { CartDrawerItem } from './cart-drawer-item';
import { useCurrencySymbol } from '@/shared/hooks';
import { useCart } from '../hooks/use-cart';
import { useTranslations } from 'next-intl';


type CartDrawerProps = {
    children: React.ReactNode;
    className?: string;
};

export const CartDrawer = ({ children, className }: CartDrawerProps) => {
    const symbol = useCurrencySymbol();
    const { data, onClickCountButton, onClickRemoveItemCart } = useCart();

    const t = useTranslations("Cart");

    if (!data) return null;

    const { totalAmount, items } = data;

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className={cn('flex flex-col bg-[#F4F1EE] p-2 overflow-hidden', className)}>
                <SheetTitle className="sr-only">Dialog</SheetTitle>
                {items.length > 0 && (
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2 text-lg">
                            {t('title')}{' '}
                            <span className="font-bold">
                                {items.length}
                            </span>
                        </SheetTitle>
                    </SheetHeader>
                )}

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 gap-4">
                        <ShoppingCart className="w-12 h-12 text-gray-400" />
                        <p className="text-lg font-medium">{t('empty')}</p>
                        <p className="text-sm text-gray-500 text-center max-w-xs">
                            {t('emptyDescription')}
                        </p>
                        <SheetClose>
                            <Button className="w-[250px] h-10 text-base" size="lg">
                                <ArrowLeft className="w-5 mr-2" />
                                {t('backButton')}
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        <div className="divide-y">
                            {items.map((item: any) => (
                                <CartDrawerItem
                                    key={item.productId}
                                    product={item}
                                    symbol={symbol}
                                    onClickCountButton={onClickCountButton}
                                    onRemove={onClickRemoveItemCart}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {items.length > 0 && (
                    <SheetFooter className="-mx-6 bg-white p-8">
                        <div className="w-full">
                            <div className="flex mb-4">
                                <span className="flex flex-1 text-lg text-neutral-500">
                                    {t('toPay')}
                                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                </span>

                                <span className="font-bold text-lg">{totalAmount} {symbol}</span>
                            </div>
                            <Link href="/checkout">
                                <Button
                                    onClick={() => { }}
                                    type="submit"
                                    className="w-full h-12 text-base">
                                    {t('checkout')}
                                    <ArrowRight className="w-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
