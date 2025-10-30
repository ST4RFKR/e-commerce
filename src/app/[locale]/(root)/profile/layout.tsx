import { Container } from '@/shared/components/common';
import '../../../styles/globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/widgets';
import { Footer } from '@/widgets/footer/footer';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Soap Bouquets',
    description: 'Flowers that last forever',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk">
            <body className={inter.className}>
                <div className="min-h-screen flex flex-col justify-between pt-4">
                    <Container className='w-full'>
                        <Suspense fallback={null}>
                            <Header hasCart={false} hasProfile={false} />
                        </Suspense>
                        {children}
                    </Container>
                    <Footer />
                </div>

            </body>
        </html>
    );
}
