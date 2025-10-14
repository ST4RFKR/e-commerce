import React from 'react';
import { CheckoutBlock } from './checkout-block';
import { cn } from '@/shared/lib/utils';
import { FormInput } from '@/shared/components/common/forms/form-input/form-input';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '../model/checkout-schema';
import type { z } from 'zod';
import { useTranslations } from 'next-intl';

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface Props {
    className?: string;
}

export const CheckoutFormPersonalData = ({ className }: Props) => {
    const t = useTranslations('Checkout');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
        console.log('Checkout data:', data);
    };

    return (
        <CheckoutBlock
            title={"3. " + t("personalData")}
            className={cn('bg-white rounded-3xl p-6', className)}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormInput
                    required
                    label={t('form.firstName')}
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    placeholder={t('form.firstNamePlaceholder')}
                />

                <FormInput
                    required
                    label={t('form.lastName')}
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    placeholder={t('form.lastNamePlaceholder')}
                />

                <FormInput
                    required
                    label={t('form.email')}
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder={t('form.emailPlaceholder')}
                />

                <FormInput
                    required
                    label={t('form.phone')}
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder={t('form.phonePlaceholder')}
                />
                <button
                    type="submit"
                    className="w-full h-12 bg-primary text-white rounded-2xl text-base font-medium mt-4"
                >
                    {t("form.confirm")}
                </button>
            </form>
        </CheckoutBlock>
    );
};
