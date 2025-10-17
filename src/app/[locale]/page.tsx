import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/shared/components/common';
import { Header } from '@/widgets';
import { ProductList } from '@/entities/product';
import { ScrollToTopAdvanced } from '@/shared/components/common/scroll-to-top/scroll-to-top';
import { Footer } from '@/widgets/footer/footer';
import { Banner } from '@/shared/components/common/banner/banner';


type Props = {
    params: Promise<{ locale: string }>;
};


export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);


    return (
        <div className="min-h-screen p-2 flex flex-col justify-between">
            <main>
                <Container>
                    <Header />
                    <Banner
                        title="Букети з мила"
                        description="Зроблені власними руками"
                        desktopImage="https://images.prom.ua/6493287968_w640_h640_6493287968.jpg"
                        mobileImage="https://images.prom.ua/6493287968_w640_h640_6493287968.jpg"
                        textAlign='left'
                    />
                    <ProductList />
                    <ScrollToTopAdvanced />
                </Container>

            </main>
            <Footer />
        </div>
    );
}
