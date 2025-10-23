import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function GlobalNotFound() {
    return (
        <html>
            <body>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg text-center shadow-lg">
                        <CardHeader className="p-6">
                            <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br bg-primary rounded-full flex items-center justify-center">

                                <span className="text-4xl font-bold text-white">404</span>
                            </div>
                            <CardTitle className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                                Oops...Page not found
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6 p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="flex-1">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                <Button asChild size="lg" className="h-12">
                                    <Link href="/" className="flex items-center justify-center">
                                        <Home className="w-5 h-5 mr-2" />
                                        Home
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </body>
        </html>
    );
}
