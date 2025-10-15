'use client';

import React, { useId } from 'react';
import { Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, Props>(
    ({ className, name, label, required, error, ...props }, ref) => {
        const id = useId();

        return (
            <div className="flex flex-col">
                {label && (
                    <label htmlFor={id} className="mb-1 text-sm font-medium">
                        {label}
                        {required && <span className="text-red-500"> *</span>}
                    </label>
                )}
                <Input
                    id={id}
                    name={name}
                    ref={ref}
                    className={cn(
                        'h-12 text-md border border-gray-300 rounded-xl focus:border-black',
                        error && 'border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';
