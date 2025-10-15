import { cn } from '@/shared/lib/utils';
import React from 'react';


interface Props {
    title?: string;
    endAdornment?: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

export function CheckoutBlock({
    title,
    endAdornment,
    className,
    contentClassName,
    children,
}: React.PropsWithChildren<Props>) {
    return (
        <div className={cn('bg-white rounded-3xl', className)}>
            {title && (
                <div className="flex items-center p-5 px-7 border-b border-gray-100">
                    <h1 className="font-bold" >{title}</h1>
                    {endAdornment}
                </div>
            )}

            <div className={cn('px-5 py-4', contentClassName)}>{children}</div>
        </div>
    );
};
