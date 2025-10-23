'use client';
import React from 'react';
import { CircleUser, User } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { Link } from '@/app/i18n/navigation';
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useTranslations } from 'next-intl';

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

export const ProfileButton = ({ className, onClickSignIn }: Props) => {
    const { data: session } = useSession();
    const t = useTranslations('Auth');

    return (
        <div className={className}>
            {!session ? (
                <Button
                    onClick={onClickSignIn}
                    variant="outline"
                    className="flex items-center gap-1"
                >
                    <User size={16} />
                    {/* <span className="hidden sm:inline">{t('login.button')}</span> */}
                </Button>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                            <CircleUser size={18} className='text-white' />
                            {/* <span className="hidden sm:inline">{session.user?.name}</span> */}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 border-primary">
                        <DropdownMenuItem asChild>
                            <Link href="/profile" className="cursor-pointer">
                                {t('common.profile')}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => signOut()}
                            className="cursor-pointer text-red-600"
                        >
                            {t('common.exit')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

        </div>
    );
};
