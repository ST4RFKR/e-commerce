'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { LoginFormData, RegisterFormData } from '../types/auth';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/features/auth/hooks/useAuth';


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultForm?: 'login' | 'register';
}

export const AuthModal: React.FC<Props> = ({
    open,
    onOpenChange,
    defaultForm = 'login',
}) => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>(defaultForm);
    const t = useTranslations('Auth');
    const registerUser = useAuth();
    const handleLoginSubmit = async (data: LoginFormData) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false
            })

            if (!resp?.ok) {
                toast.error(t('login.toast.error'));
                return
            }
            onOpenChange(false);
            toast.success(t('login.toast.success'));

        } catch (error) {
            console.log('Error[login]:', error);
            toast.error(t('login.toast.error'));
        }
    };

    const handleRegisterSubmit = async (data: RegisterFormData) => {
        try {
            console.log('Register data:', data);
            await registerUser.mutate(data);
            onOpenChange(false);
        } catch (error) {
            console.log('Error[register]:', error);
            toast.error(t('register.toast.error'));
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        onOpenChange(newOpen);
        // Сбрасываем форму на логин при закрытии
        if (!newOpen) {
            setTimeout(() => setActiveForm('login'), 200);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px] max-w-[95vw] p-6">
                <DialogHeader className="sr-only">
                    <DialogTitle>
                        {activeForm === 'login' ? 'Вход в систему' : 'Регистрация'}
                    </DialogTitle>
                    <DialogDescription>
                        {activeForm === 'login'
                            ? 'Войдите в свой аккаунт'
                            : 'Создайте новый аккаунт'}
                    </DialogDescription>
                </DialogHeader>

                {activeForm === 'login' ? (
                    <LoginForm
                        onSubmit={handleLoginSubmit}
                        onSwitchToRegister={() => setActiveForm('register')}
                    />
                ) : (
                    <RegisterForm
                        onSubmit={handleRegisterSubmit}
                        onSwitchToLogin={() => setActiveForm('login')}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
