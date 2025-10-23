'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LogIn, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';

import { useState } from 'react';
import { AuthModal } from '@/widgets/auth/ui';
import { Alert, AlertDescription } from '@/shared/components/ui';

export default function NotAuthPage() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const t = useTranslations('NotAuth');

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardHeader className="pt-6">
                    <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br bg-primary rounded-full flex items-center justify-center">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                        {t('title')}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                        {t('description')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Alert className="text-left">
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                            {t('alertDescription')}
                        </AlertDescription>
                    </Alert>

                    <div className="flex flex-col gap-3">
                        <Button onClick={() => setOpen(true)} size="lg" className="w-full">
                            <LogIn className="w-4 h-4 mr-2" />
                            {t('loginButton')}
                        </Button>
                        <AuthModal open={open} onOpenChange={setOpen} />
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="flex items-center justify-center text-slate-500 hover:text-slate-700"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('backButton')}
                        </Button>

                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 hover:text-slate-700"
                        >
                            <Link href="/" className="flex items-center justify-center">
                                {t('homeButton')}
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
