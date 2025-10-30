'use client'
import { FormInput } from "@/shared/components/common/forms/form-input/form-input";
import { Button } from "@/shared/components/ui";
import { useForm } from "react-hook-form";
import { Profile, profileSchema } from "../model/profile-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMe } from "@/features/auth/hooks/useMe";

import { useUpdateProfile } from "../hooks/use-update-profile";
import { useTranslations } from "next-intl";
import { useEffect } from "react";


export function ProfileFormPersonalData() {

    const { data } = useMe();
    const updateProfile = useUpdateProfile();
    const t = useTranslations("ProfilePage")


    const { register, handleSubmit, formState: { errors }, reset } = useForm<Profile>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: data?.email ?? "",
            fullName: data?.fullName ?? "",
            phone: data?.phone ?? "",
            address: data?.address ?? "",
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        if (data) {
            reset({
                email: data.email ?? "",
                fullName: data.fullName ?? data.name ?? "",
                phone: data.phone ?? "",
                address: data.address ?? "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [data, reset]);

    const onSubmit = (formData: Omit<Profile, 'password' | 'confirmPassword'>) => {
        updateProfile.mutate({
            id: data?.id, data: {
                email: formData.email,
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.address
            }
        });
    };
    return (
        <div className="flex flex-col gap-4">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    required
                    label={t('form.email')}
                    {...register('email')}
                    error={errors.email?.message}
                />
                <FormInput
                    required
                    label={t('form.fullName')}
                    {...register('fullName')}
                    error={errors.fullName?.message}

                />
                <FormInput
                    label={t('form.phone')}
                    {...register('phone')}
                    error={errors.phone?.message}
                />
                <FormInput
                    label={t('form.address')}
                    {...register('address')}
                    error={errors.address?.message}
                />
                <FormInput
                    required
                    label={t('form.password')}
                    type="password"
                    {...register('password')}

                    error={errors.password?.message}
                />
                <FormInput
                    required
                    label={t('form.confirmPassword')}
                    type="password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                />
                <div className="flex justify-end col-span-full">
                    <Button type="submit" className="w-[200px]">
                        {t('form.save')}
                    </Button>
                </div>
            </form>


        </div>
    )
}
