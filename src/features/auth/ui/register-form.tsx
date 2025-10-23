'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { RegisterFormData, registerSchema } from '../types/auth';
import { FormInput } from '@/shared/components/common/forms/form-input/form-input';
import { useTranslations } from 'next-intl';

interface Props {
    onSubmit: (data: RegisterFormData) => void;
    onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onSubmit, onSwitchToLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const t = useTranslations('Auth');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">
                {t('register.title')}
            </h2>

            <FormInput
                label={t('register.name')}
                type="text"
                required
                error={errors.fullName?.message}
                {...register('fullName')}
            />

            <FormInput
                label={t('register.email')}
                type="email"
                required
                error={errors.email?.message}
                {...register('email')}
            />

            <FormInput
                label={t('register.password')}
                type="password"
                required
                error={errors.password?.message}
                {...register('password')}
            />

            <FormInput
                label={t('register.confirmPassword')}
                type="password"
                required
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />

            <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isSubmitting}
            >
                {isSubmitting ? t('register.loading') : t('register.button')}
            </Button>

            <div className="text-center text-sm text-gray-600 mt-4">
                {t('register.haveAccount')}{' '}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 hover:underline font-medium"
                >
                    {t('register.signIn')}
                </button>
            </div>
        </form>
    );
};
