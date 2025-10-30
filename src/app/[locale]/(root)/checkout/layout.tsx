import { Container, Logo } from '@/shared/components/common';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Bouquet | Checkout',
    description: '',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-[#F5F0E9] p-4"  >
            <Container>
                <Suspense>
                    <Logo />
                </Suspense>
                {children}
            </Container>
        </main>
    );
}
