'use client';

import { SessionProvider } from "next-auth/react";
import QueryProvider from "./query-provider";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify";
type Props = {
    children: React.ReactNode;
    messages: Record<string, string>;
    locale: string;
}

export default function Providers({ children, messages, locale }: Props) {
    return (
        <>
            <SessionProvider>
                <QueryProvider>
                    <NextIntlClientProvider messages={messages} locale={locale} timeZone="Europe/Kyiv">
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
            </SessionProvider>
        </>
    );
}
