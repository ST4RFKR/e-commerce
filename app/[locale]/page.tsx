
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/shared/components/common';
import { Header } from '@/widgets';
import { ProductList } from '@/entities/product';
import { ScrollToTopAdvanced } from '@/shared/components/common/scroll-to-top/scroll-to-top';


type Props = {
    params: Promise<{ locale: string }>;
};


export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);


    return (
        <div className="min-h-screen p-8">
            <Container>
                <Header />
                <ProductList />
                <ScrollToTopAdvanced />
            </Container>
        </div >
    );
}
