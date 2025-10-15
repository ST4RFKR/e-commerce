'use client';
import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '../../ui';
import { cn } from '@/shared/lib/utils';
import { useCurrencySymbol } from '@/shared/hooks';


interface Props {
    count: number;
    total: string;
    className?: string;
    onClick?: () => void;
}

export const CartButton = ({ count, total, className, onClick }: Props) => {
    const symbol = useCurrencySymbol();


    return (
        <Button
            loading={false}
            className={cn('group relative', className)}
            variant={'default'}
            size={'default'}
            onClick={onClick}>

            <div>
                <b>{total} {symbol}</b>
                <span className="h-full w-[1px] bg-white/30 mx-3" />
            </div>


            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <b>{count}</b>
            </div>
            <ArrowRight
                size={20}
                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
        </Button>
    );
};
