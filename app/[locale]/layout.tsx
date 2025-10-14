import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { setRequestLocale } from 'next-intl/server';
import { routing } from '../i18n/routing';
import '../styles/globals.css';
import { Nunito } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import QueryProvider from '../providers/query-provider';
import { Metadata } from 'next';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};
export const metadata: Metadata = {
    title: 'Bouquet | Main',
    description: '',
};

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }


    const messages = await getMessages({ locale });
    setRequestLocale(locale);


    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${nunito.variable} font-sans antialiased`}>
                <QueryProvider>
                    <NextIntlClientProvider messages={messages}>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        {children}
                    </NextIntlClientProvider>
                </QueryProvider>

            </body>
        </html>
    );
}