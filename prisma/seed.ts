import { DeliveryType, OrderStatus, PrismaClient, UserRole } from "@/app/generated/prisma";




const prisma = new PrismaClient();

const imageUrls = [
    'https://images.prom.ua/3423761009_w640_h640_3423761009.jpg',
    'https://images.prom.ua/6731930987_w640_h640_buket-v-konverte.jpg',
    'https://images.prom.ua/6493287968_w640_h640_6493287968.jpg',
    'https://images.prom.ua/3064761991_w640_h640_3064761991.jpg',
];

const products = [
    {
        sku: 'ROSE-BOUQUET-0011',
        price: 10,
        stock: 25,
        translations: {
            en: {
                title: 'Red Roses Bouquet',
                description: 'Elegant bouquet of fresh red roses, perfect for expressing love and passion. Each rose is carefully selected for its beauty and freshness.',
                slug: 'red-roses-bouquet',
                metaTitle: 'Red Roses Bouquet - Fresh Flowers Delivery',
                metaDesc: 'Order a stunning bouquet of red roses for delivery. Perfect gift for anniversaries, birthdays, and special occasions.',
            },
            it: {
                title: 'Bouquet di Rose Rosse',
                description: 'Elegante bouquet di rose rosse fresche, perfetto per esprimere amore e passione. Ogni rosa è accuratamente selezionata per la sua bellezza e freschezza.',
                slug: 'bouquet-rose-rosse',
                metaTitle: 'Bouquet di Rose Rosse - Consegna Fiori Freschi',
                metaDesc: 'Ordina uno splendido bouquet di rose rosse per la consegna. Regalo perfetto per anniversari, compleanni e occasioni speciali.',
            },
            uk: {
                title: 'Букет червоних троянд',
                description: 'Елегантний букет зі свіжих червоних троянд, ідеальний для вираження кохання та пристрасті. Кожна троянда ретельно відібрана за красою та свіжістю.',
                slug: 'buket-chervonykh-troyand',
                metaTitle: 'Букет червоних троянд - Доставка свіжих квітів',
                metaDesc: 'Замовте приголомшливий букет червоних троянд з доставкою. Ідеальний подарунок на річниці, дні народження та особливі події.',
            },
        },
        imageCount: 3,
    },
    {
        sku: 'TULIP-MIX-0022',
        price: 15,
        stock: 30,
        translations: {
            en: {
                title: 'Mixed Tulips Bouquet',
                description: 'Vibrant bouquet of colorful tulips bringing spring freshness to any occasion. Features a beautiful mix of colors including pink, yellow, and red.',
                slug: 'mixed-tulips-bouquet',
                metaTitle: 'Mixed Tulips Bouquet - Spring Flowers',
                metaDesc: 'Fresh mixed tulips bouquet with vibrant colors. Perfect for celebrations and brightening someone\'s day.',
            },
            it: {
                title: 'Bouquet di Tulipani Misti',
                description: 'Vivace bouquet di tulipani colorati che portano freschezza primaverile in ogni occasione. Presenta una bellissima miscela di colori tra cui rosa, giallo e rosso.',
                slug: 'bouquet-tulipani-misti',
                metaTitle: 'Bouquet di Tulipani Misti - Fiori Primaverili',
                metaDesc: 'Bouquet di tulipani misti freschi con colori vivaci. Perfetto per celebrazioni e per rallegrare la giornata di qualcuno.',
            },
            uk: {
                title: 'Букет мікс тюльпанів',
                description: 'Яскравий букет з різнокольорових тюльпанів, що приносить весняну свіжість до будь-якої події. Включає красивий мікс кольорів: рожевий, жовтий та червоний.',
                slug: 'buket-miks-tyulpaniv',
                metaTitle: 'Букет мікс тюльпанів - Весняні квіти',
                metaDesc: 'Свіжий букет з мікс тюльпанів з яскравими кольорами. Ідеальний для святкувань і для піднесення настрою.',
            },
        },
        imageCount: 4,
    },
    {
        sku: 'LILY-WHITE-0033',
        price: 10,
        stock: 15,
        translations: {
            en: {
                title: 'White Lilies Arrangement',
                description: 'Sophisticated arrangement of pristine white lilies symbolizing purity and elegance. Ideal for weddings, sympathy, or elegant home decor.',
                slug: 'white-lilies-arrangement',
                metaTitle: 'White Lilies Arrangement - Elegant Flowers',
                metaDesc: 'Elegant white lilies arrangement for special occasions. Symbol of purity and grace.',
            },
            it: {
                title: 'Composizione di Gigli Bianchi',
                description: 'Sofisticata composizione di gigli bianchi immacolati che simboleggiano purezza ed eleganza. Ideale per matrimoni, condoglianze o decorazioni domestiche eleganti.',
                slug: 'composizione-gigli-bianchi',
                metaTitle: 'Composizione di Gigli Bianchi - Fiori Eleganti',
                metaDesc: 'Elegante composizione di gigli bianchi per occasioni speciali. Simbolo di purezza e grazia.',
            },
            uk: {
                title: 'Композиція з білих лілій',
                description: 'Вишукана композиція з білосніжних лілій, що символізують чистоту та елегантність. Ідеально підходить для весіль, співчуття або елегантного домашнього декору.',
                slug: 'kompozytsiya-bilykh-liliy',
                metaTitle: 'Композиція з білих лілій - Елегантні квіти',
                metaDesc: 'Елегантна композиція з білих лілій для особливих випадків. Символ чистоти та граціозності.',
            },
        },
        imageCount: 2,
    },
    {
        sku: 'ORCHID-PURPLE-0044',
        price: 20,
        stock: 12,
        translations: {
            en: {
                title: 'Purple Orchid in Pot',
                description: 'Exotic purple orchid plant in decorative pot. Long-lasting beauty that adds sophistication to any space. Easy to care for and blooms for months.',
                slug: 'purple-orchid-pot',
                metaTitle: 'Purple Orchid Plant - Exotic Flowers',
                metaDesc: 'Beautiful purple orchid plant in pot. Long-lasting exotic flower perfect for home or office.',
            },
            it: {
                title: 'Orchidea Viola in Vaso',
                description: 'Pianta di orchidea viola esotica in vaso decorativo. Bellezza duratura che aggiunge raffinatezza a qualsiasi spazio. Facile da curare e fiorisce per mesi.',
                slug: 'orchidea-viola-vaso',
                metaTitle: 'Pianta di Orchidea Viola - Fiori Esotici',
                metaDesc: 'Bellissima pianta di orchidea viola in vaso. Fiore esotico duraturo perfetto per casa o ufficio.',
            },
            uk: {
                title: 'Фіолетова орхідея в горщику',
                description: 'Екзотична фіолетова орхідея в декоративному горщику. Довготривала краса, що додає витонченості будь-якому простору. Легка в догляді та цвіте місяцями.',
                slug: 'fioletova-orkhideya-gorshchyk',
                metaTitle: 'Фіолетова орхідея - Екзотичні квіти',
                metaDesc: 'Прекрасна фіолетова орхідея в горщику. Довготривала екзотична квітка ідеальна для дому чи офісу.',
            },
        },
        imageCount: 5,
    },
    {
        sku: 'PEONY-PINK-0055',
        price: 30,
        stock: 18,
        translations: {
            en: {
                title: 'Pink Peonies Bouquet',
                description: 'Luxurious bouquet of soft pink peonies with their signature lush petals. These romantic flowers are perfect for weddings and special celebrations.',
                slug: 'pink-peonies-bouquet',
                metaTitle: 'Pink Peonies Bouquet - Luxury Flowers',
                metaDesc: 'Stunning pink peonies bouquet. Luxurious flowers for weddings and romantic occasions.',
            },
            it: {
                title: 'Bouquet di Peonie Rosa',
                description: 'Lussuoso bouquet di peonie rosa tenue con i loro caratteristici petali rigogliosi. Questi fiori romantici sono perfetti per matrimoni e celebrazioni speciali.',
                slug: 'bouquet-peonie-rosa',
                metaTitle: 'Bouquet di Peonie Rosa - Fiori di Lusso',
                metaDesc: 'Splendido bouquet di peonie rosa. Fiori lussuosi per matrimoni e occasioni romantiche.',
            },
            uk: {
                title: 'Букет рожевих півоній',
                description: 'Розкішний букет з ніжно-рожевих півоній з їх фірмовими пишними пелюстками. Ці романтичні квіти ідеально підходять для весіль та особливих свят.',
                slug: 'buket-rozhevykh-pivoniy',
                metaTitle: 'Букет рожевих півоній - Розкішні квіти',
                metaDesc: 'Приголомшливий букет рожевих півоній. Розкішні квіти для весіль та романтичних випадків.',
            },
        },
        imageCount: 3,
    },
    {
        sku: 'SUNFLOWER-0076',
        price: 18,
        stock: 22,
        translations: {
            en: {
                title: 'Sunny Sunflowers Bouquet',
                description: 'Cheerful bouquet of bright sunflowers that bring warmth and joy. Perfect for lifting spirits and celebrating life\'s happy moments.',
                slug: 'sunny-sunflowers-bouquet',
                metaTitle: 'Sunflowers Bouquet - Cheerful Flowers',
                metaDesc: 'Bright sunflowers bouquet to spread joy and happiness. Perfect gift for any celebration.',
            },
            it: {
                title: 'Bouquet di Girasoli Solari',
                description: 'Allegro bouquet di girasoli luminosi che portano calore e gioia. Perfetto per sollevare gli spiriti e celebrare i momenti felici della vita.',
                slug: 'bouquet-girasoli-solari',
                metaTitle: 'Bouquet di Girasoli - Fiori Allegri',
                metaDesc: 'Bouquet di girasoli luminosi per diffondere gioia e felicità. Regalo perfetto per ogni celebrazione.',
            },
            uk: {
                title: 'Букет сонячних соняшників',
                description: 'Веселий букет яскравих соняшників, що приносять тепло та радість. Ідеальний для піднесення настрою та святкування щасливих моментів життя.',
                slug: 'buket-sonyachnykh-sonyashnikiv',
                metaTitle: 'Букет соняшників - Веселі квіти',
                metaDesc: 'Яскравий букет соняшників для поширення радості та щастя. Ідеальний подарунок для будь-якого святкування.',
            },
        },
        imageCount: 2,
    },
    {
        sku: 'HYDRANGEA-BLUE-0087',
        price: 22,
        stock: 14,
        translations: {
            en: {
                title: 'Blue Hydrangea Arrangement',
                description: 'Stunning arrangement featuring lush blue hydrangeas. These voluminous flowers create a spectacular display perfect for special events and home decoration.',
                slug: 'blue-hydrangea-arrangement',
                metaTitle: 'Blue Hydrangea Arrangement - Premium Flowers',
                metaDesc: 'Beautiful blue hydrangea flower arrangement. Luxurious and voluminous flowers for any occasion.',
            },
            it: {
                title: 'Composizione di Ortensie Blu',
                description: 'Splendida composizione con ortensie blu rigogliose. Questi fiori voluminosi creano uno spettacolo spettacolare perfetto per eventi speciali e decorazioni domestiche.',
                slug: 'composizione-ortensie-blu',
                metaTitle: 'Composizione di Ortensie Blu - Fiori Premium',
                metaDesc: 'Bellissima composizione floreale di ortensie blu. Fiori lussuosi e voluminosi per ogni occasione.',
            },
            uk: {
                title: 'Композиція з блакитної гортензії',
                description: 'Приголомшлива композиція з пишних блакитних гортензій. Ці об\'ємні квіти створюють видовищну експозицію, ідеальну для особливих подій та домашнього декору.',
                slug: 'kompozytsiya-blakytnoi-hortenziyi',
                metaTitle: 'Композиція з блакитної гортензії - Преміум квіти',
                metaDesc: 'Прекрасна композиція з блакитної гортензії. Розкішні та об\'ємні квіти для будь-якого випадку.',
            },
        },
        imageCount: 4,
    },
    {
        sku: 'CARNATION-RED-0098',
        price: 33,
        stock: 35,
        translations: {
            en: {
                title: 'Red Carnations Bouquet',
                description: 'Classic bouquet of vibrant red carnations. Long-lasting flowers that symbolize deep love and admiration. Perfect for everyday gifting.',
                slug: 'red-carnations-bouquet',
                metaTitle: 'Red Carnations Bouquet - Classic Flowers',
                metaDesc: 'Fresh red carnations bouquet. Classic and long-lasting flowers for expressing love and admiration.',
            },
            it: {
                title: 'Bouquet di Garofani Rossi',
                description: 'Classico bouquet di garofani rossi vibranti. Fiori duraturi che simboleggiano amore profondo e ammirazione. Perfetto per regali quotidiani.',
                slug: 'bouquet-garofani-rossi',
                metaTitle: 'Bouquet di Garofani Rossi - Fiori Classici',
                metaDesc: 'Bouquet di garofani rossi freschi. Fiori classici e duraturi per esprimere amore e ammirazione.',
            },
            uk: {
                title: 'Букет червоних гвоздик',
                description: 'Класичний букет з яскравих червоних гвоздик. Довготривалі квіти, що символізують глибоке кохання та захоплення. Ідеальні для повсякденних подарунків.',
                slug: 'buket-chervonykh-hvozdyk',
                metaTitle: 'Букет червоних гвоздик - Класичні квіти',
                metaDesc: 'Свіжий букет червоних гвоздик. Класичні та довготривалі квіти для вираження кохання та захоплення.',
            },
        },
        imageCount: 1,
    },
    {
        sku: 'ROSE-BOUQUET-0019',
        price: 10,
        stock: 25,
        translations: {
            en: {
                title: 'Red Roses Bouquet',
                description: 'Elegant bouquet of fresh red roses, perfect for expressing love and passion. Each rose is carefully selected for its beauty and freshness.',
                slug: 'red-roses-bouquet',
                metaTitle: 'Red Roses Bouquet - Fresh Flowers Delivery',
                metaDesc: 'Order a stunning bouquet of red roses for delivery. Perfect gift for anniversaries, birthdays, and special occasions.',
            },
            it: {
                title: 'Bouquet di Rose Rosse',
                description: 'Elegante bouquet di rose rosse fresche, perfetto per esprimere amore e passione. Ogni rosa è accuratamente selezionata per la sua bellezza e freschezza.',
                slug: 'bouquet-rose-rosse',
                metaTitle: 'Bouquet di Rose Rosse - Consegna Fiori Freschi',
                metaDesc: 'Ordina uno splendido bouquet di rose rosse per la consegna. Regalo perfetto per anniversari, compleanni e occasioni speciali.',
            },
            uk: {
                title: 'Букет червоних троянд',
                description: 'Елегантний букет зі свіжих червоних троянд, ідеальний для вираження кохання та пристрасті. Кожна троянда ретельно відібрана за красою та свіжістю.',
                slug: 'buket-chervonykh-troyand',
                metaTitle: 'Букет червоних троянд - Доставка свіжих квітів',
                metaDesc: 'Замовте приголомшливий букет червоних троянд з доставкою. Ідеальний подарунок на річниці, дні народження та особливі події.',
            },
        },
        imageCount: 3,
    },
    {
        sku: 'TULIP-MIX-0020',
        price: 15,
        stock: 30,
        translations: {
            en: {
                title: 'Mixed Tulips Bouquet',
                description: 'Vibrant bouquet of colorful tulips bringing spring freshness to any occasion. Features a beautiful mix of colors including pink, yellow, and red.',
                slug: 'mixed-tulips-bouquet',
                metaTitle: 'Mixed Tulips Bouquet - Spring Flowers',
                metaDesc: 'Fresh mixed tulips bouquet with vibrant colors. Perfect for celebrations and brightening someone\'s day.',
            },
            it: {
                title: 'Bouquet di Tulipani Misti',
                description: 'Vivace bouquet di tulipani colorati che portano freschezza primaverile in ogni occasione. Presenta una bellissima miscela di colori tra cui rosa, giallo e rosso.',
                slug: 'bouquet-tulipani-misti',
                metaTitle: 'Bouquet di Tulipani Misti - Fiori Primaverili',
                metaDesc: 'Bouquet di tulipani misti freschi con colori vivaci. Perfetto per celebrazioni e per rallegrare la giornata di qualcuno.',
            },
            uk: {
                title: 'Букет мікс тюльпанів',
                description: 'Яскравий букет з різнокольорових тюльпанів, що приносить весняну свіжість до будь-якої події. Включає красивий мікс кольорів: рожевий, жовтий та червоний.',
                slug: 'buket-miks-tyulpaniv',
                metaTitle: 'Букет мікс тюльпанів - Весняні квіти',
                metaDesc: 'Свіжий букет з мікс тюльпанів з яскравими кольорами. Ідеальний для святкувань і для піднесення настрою.',
            },
        },
        imageCount: 4,
    },
    {
        sku: 'LILY-WHITE-00311',
        price: 10,
        stock: 15,
        translations: {
            en: {
                title: 'White Lilies Arrangement',
                description: 'Sophisticated arrangement of pristine white lilies symbolizing purity and elegance. Ideal for weddings, sympathy, or elegant home decor.',
                slug: 'white-lilies-arrangement',
                metaTitle: 'White Lilies Arrangement - Elegant Flowers',
                metaDesc: 'Elegant white lilies arrangement for special occasions. Symbol of purity and grace.',
            },
            it: {
                title: 'Composizione di Gigli Bianchi',
                description: 'Sofisticata composizione di gigli bianchi immacolati che simboleggiano purezza ed eleganza. Ideale per matrimoni, condoglianze o decorazioni domestiche eleganti.',
                slug: 'composizione-gigli-bianchi',
                metaTitle: 'Composizione di Gigli Bianchi - Fiori Eleganti',
                metaDesc: 'Elegante composizione di gigli bianchi per occasioni speciali. Simbolo di purezza e grazia.',
            },
            uk: {
                title: 'Композиція з білих лілій',
                description: 'Вишукана композиція з білосніжних лілій, що символізують чистоту та елегантність. Ідеально підходить для весіль, співчуття або елегантного домашнього декору.',
                slug: 'kompozytsiya-bilykh-liliy',
                metaTitle: 'Композиція з білих лілій - Елегантні квіти',
                metaDesc: 'Елегантна композиція з білих лілій для особливих випадків. Символ чистоти та граціозності.',
            },
        },
        imageCount: 2,
    },
    {
        sku: 'ORCHID-PURPLE-00422',
        price: 20,
        stock: 12,
        translations: {
            en: {
                title: 'Purple Orchid in Pot',
                description: 'Exotic purple orchid plant in decorative pot. Long-lasting beauty that adds sophistication to any space. Easy to care for and blooms for months.',
                slug: 'purple-orchid-pot',
                metaTitle: 'Purple Orchid Plant - Exotic Flowers',
                metaDesc: 'Beautiful purple orchid plant in pot. Long-lasting exotic flower perfect for home or office.',
            },
            it: {
                title: 'Orchidea Viola in Vaso',
                description: 'Pianta di orchidea viola esotica in vaso decorativo. Bellezza duratura che aggiunge raffinatezza a qualsiasi spazio. Facile da curare e fiorisce per mesi.',
                slug: 'orchidea-viola-vaso',
                metaTitle: 'Pianta di Orchidea Viola - Fiori Esotici',
                metaDesc: 'Bellissima pianta di orchidea viola in vaso. Fiore esotico duraturo perfetto per casa o ufficio.',
            },
            uk: {
                title: 'Фіолетова орхідея в горщику',
                description: 'Екзотична фіолетова орхідея в декоративному горщику. Довготривала краса, що додає витонченості будь-якому простору. Легка в догляді та цвіте місяцями.',
                slug: 'fioletova-orkhideya-gorshchyk',
                metaTitle: 'Фіолетова орхідея - Екзотичні квіти',
                metaDesc: 'Прекрасна фіолетова орхідея в горщику. Довготривала екзотична квітка ідеальна для дому чи офісу.',
            },
        },
        imageCount: 5,
    },
    {
        sku: 'PEONY-PINK-005333',
        price: 30,
        stock: 18,
        translations: {
            en: {
                title: 'Pink Peonies Bouquet',
                description: 'Luxurious bouquet of soft pink peonies with their signature lush petals. These romantic flowers are perfect for weddings and special celebrations.',
                slug: 'pink-peonies-bouquet',
                metaTitle: 'Pink Peonies Bouquet - Luxury Flowers',
                metaDesc: 'Stunning pink peonies bouquet. Luxurious flowers for weddings and romantic occasions.',
            },
            it: {
                title: 'Bouquet di Peonie Rosa',
                description: 'Lussuoso bouquet di peonie rosa tenue con i loro caratteristici petali rigogliosi. Questi fiori romantici sono perfetti per matrimoni e celebrazioni speciali.',
                slug: 'bouquet-peonie-rosa',
                metaTitle: 'Bouquet di Peonie Rosa - Fiori di Lusso',
                metaDesc: 'Splendido bouquet di peonie rosa. Fiori lussuosi per matrimoni e occasioni romantiche.',
            },
            uk: {
                title: 'Букет рожевих півоній',
                description: 'Розкішний букет з ніжно-рожевих півоній з їх фірмовими пишними пелюстками. Ці романтичні квіти ідеально підходять для весіль та особливих свят.',
                slug: 'buket-rozhevykh-pivoniy',
                metaTitle: 'Букет рожевих півоній - Розкішні квіти',
                metaDesc: 'Приголомшливий букет рожевих півоній. Розкішні квіти для весіль та романтичних випадків.',
            },
        },
        imageCount: 3,
    },
    {
        sku: 'SUNFLOWER-00744',
        price: 18,
        stock: 22,
        translations: {
            en: {
                title: 'Sunny Sunflowers Bouquet',
                description: 'Cheerful bouquet of bright sunflowers that bring warmth and joy. Perfect for lifting spirits and celebrating life\'s happy moments.',
                slug: 'sunny-sunflowers-bouquet',
                metaTitle: 'Sunflowers Bouquet - Cheerful Flowers',
                metaDesc: 'Bright sunflowers bouquet to spread joy and happiness. Perfect gift for any celebration.',
            },
            it: {
                title: 'Bouquet di Girasoli Solari',
                description: 'Allegro bouquet di girasoli luminosi che portano calore e gioia. Perfetto per sollevare gli spiriti e celebrare i momenti felici della vita.',
                slug: 'bouquet-girasoli-solari',
                metaTitle: 'Bouquet di Girasoli - Fiori Allegri',
                metaDesc: 'Bouquet di girasoli luminosi per diffondere gioia e felicità. Regalo perfetto per ogni celebrazione.',
            },
            uk: {
                title: 'Букет сонячних соняшників',
                description: 'Веселий букет яскравих соняшників, що приносять тепло та радість. Ідеальний для піднесення настрою та святкування щасливих моментів життя.',
                slug: 'buket-sonyachnykh-sonyashnikiv',
                metaTitle: 'Букет соняшників - Веселі квіти',
                metaDesc: 'Яскравий букет соняшників для поширення радості та щастя. Ідеальний подарунок для будь-якого святкування.',
            },
        },
        imageCount: 2,
    },
    {
        sku: 'HYDRANGEA-BLUE-00855',
        price: 22,
        stock: 14,
        translations: {
            en: {
                title: 'Blue Hydrangea Arrangement',
                description: 'Stunning arrangement featuring lush blue hydrangeas. These voluminous flowers create a spectacular display perfect for special events and home decoration.',
                slug: 'blue-hydrangea-arrangement',
                metaTitle: 'Blue Hydrangea Arrangement - Premium Flowers',
                metaDesc: 'Beautiful blue hydrangea flower arrangement. Luxurious and voluminous flowers for any occasion.',
            },
            it: {
                title: 'Composizione di Ortensie Blu',
                description: 'Splendida composizione con ortensie blu rigogliose. Questi fiori voluminosi creano uno spettacolo spettacolare perfetto per eventi speciali e decorazioni domestiche.',
                slug: 'composizione-ortensie-blu',
                metaTitle: 'Composizione di Ortensie Blu - Fiori Premium',
                metaDesc: 'Bellissima composizione floreale di ortensie blu. Fiori lussuosi e voluminosi per ogni occasione.',
            },
            uk: {
                title: 'Композиція з блакитної гортензії',
                description: 'Приголомшлива композиція з пишних блакитних гортензій. Ці об\'ємні квіти створюють видовищну експозицію, ідеальну для особливих подій та домашнього декору.',
                slug: 'kompozytsiya-blakytnoi-hortenziyi',
                metaTitle: 'Композиція з блакитної гортензії - Преміум квіти',
                metaDesc: 'Прекрасна композиція з блакитної гортензії. Розкішні та об\'ємні квіти для будь-якого випадку.',
            },
        },
        imageCount: 4,
    },
    {
        sku: 'CARNATION-RED-00966',
        price: 33,
        stock: 35,
        translations: {
            en: {
                title: 'Red Carnations Bouquet',
                description: 'Classic bouquet of vibrant red carnations. Long-lasting flowers that symbolize deep love and admiration. Perfect for everyday gifting.',
                slug: 'red-carnations-bouquet',
                metaTitle: 'Red Carnations Bouquet - Classic Flowers',
                metaDesc: 'Fresh red carnations bouquet. Classic and long-lasting flowers for expressing love and admiration.',
            },
            it: {
                title: 'Bouquet di Garofani Rossi',
                description: 'Classico bouquet di garofani rossi vibranti. Fiori duraturi che simboleggiano amore profondo e ammirazione. Perfetto per regali quotidiani.',
                slug: 'bouquet-garofani-rossi',
                metaTitle: 'Bouquet di Garofani Rossi - Fiori Classici',
                metaDesc: 'Bouquet di garofani rossi freschi. Fiori classici e duraturi per esprimere amore e ammirazione.',
            },
            uk: {
                title: 'Букет червоних гвоздик',
                description: 'Класичний букет з яскравих червоних гвоздик. Довготривалі квіти, що символізують глибоке кохання та захоплення. Ідеальні для повсякденних подарунків.',
                slug: 'buket-chervonykh-hvozdyk',
                metaTitle: 'Букет червоних гвоздик - Класичні квіти',
                metaDesc: 'Свіжий букет червоних гвоздик. Класичні та довготривалі квіти для вираження кохання та захоплення.',
            },
        },
        imageCount: 1,
    },
    {
        sku: 'ROSE-BOUQUET-00177',
        price: 10,
        stock: 25,
        translations: {
            en: {
                title: 'Red Roses Bouquet',
                description: 'Elegant bouquet of fresh red roses, perfect for expressing love and passion. Each rose is carefully selected for its beauty and freshness.',
                slug: 'red-roses-bouquet',
                metaTitle: 'Red Roses Bouquet - Fresh Flowers Delivery',
                metaDesc: 'Order a stunning bouquet of red roses for delivery. Perfect gift for anniversaries, birthdays, and special occasions.',
            },
            it: {
                title: 'Bouquet di Rose Rosse',
                description: 'Elegante bouquet di rose rosse fresche, perfetto per esprimere amore e passione. Ogni rosa è accuratamente selezionata per la sua bellezza e freschezza.',
                slug: 'bouquet-rose-rosse',
                metaTitle: 'Bouquet di Rose Rosse - Consegna Fiori Freschi',
                metaDesc: 'Ordina uno splendido bouquet di rose rosse per la consegna. Regalo perfetto per anniversari, compleanni e occasioni speciali.',
            },
            uk: {
                title: 'Букет червоних троянд',
                description: 'Елегантний букет зі свіжих червоних троянд, ідеальний для вираження кохання та пристрасті. Кожна троянда ретельно відібрана за красою та свіжістю.',
                slug: 'buket-chervonykh-troyand',
                metaTitle: 'Букет червоних троянд - Доставка свіжих квітів',
                metaDesc: 'Замовте приголомшливий букет червоних троянд з доставкою. Ідеальний подарунок на річниці, дні народження та особливі події.',
            },
        },
        imageCount: 3,
    },
    {
        sku: 'TULIP-MIX-00288',
        price: 15,
        stock: 30,
        translations: {
            en: {
                title: 'Mixed Tulips Bouquet',
                description: 'Vibrant bouquet of colorful tulips bringing spring freshness to any occasion. Features a beautiful mix of colors including pink, yellow, and red.',
                slug: 'mixed-tulips-bouquet',
                metaTitle: 'Mixed Tulips Bouquet - Spring Flowers',
                metaDesc: 'Fresh mixed tulips bouquet with vibrant colors. Perfect for celebrations and brightening someone\'s day.',
            },
            it: {
                title: 'Bouquet di Tulipani Misti',
                description: 'Vivace bouquet di tulipani colorati che portano freschezza primaverile in ogni occasione. Presenta una bellissima miscela di colori tra cui rosa, giallo e rosso.',
                slug: 'bouquet-tulipani-misti',
                metaTitle: 'Bouquet di Tulipani Misti - Fiori Primaverili',
                metaDesc: 'Bouquet di tulipani misti freschi con colori vivaci. Perfetto per celebrazioni e per rallegrare la giornata di qualcuno.',
            },
            uk: {
                title: 'Букет мікс тюльпанів',
                description: 'Яскравий букет з різнокольорових тюльпанів, що приносить весняну свіжість до будь-якої події. Включає красивий мікс кольорів: рожевий, жовтий та червоний.',
                slug: 'buket-miks-tyulpaniv',
                metaTitle: 'Букет мікс тюльпанів - Весняні квіти',
                metaDesc: 'Свіжий букет з мікс тюльпанів з яскравими кольорами. Ідеальний для святкувань і для піднесення настрою.',
            },
        },
        imageCount: 4,
    },
    {
        sku: 'LILY-WHITE-00399',
        price: 10,
        stock: 15,
        translations: {
            en: {
                title: 'White Lilies Arrangement',
                description: 'Sophisticated arrangement of pristine white lilies symbolizing purity and elegance. Ideal for weddings, sympathy, or elegant home decor.',
                slug: 'white-lilies-arrangement',
                metaTitle: 'White Lilies Arrangement - Elegant Flowers',
                metaDesc: 'Elegant white lilies arrangement for special occasions. Symbol of purity and grace.',
            },
            it: {
                title: 'Composizione di Gigli Bianchi',
                description: 'Sofisticata composizione di gigli bianchi immacolati che simboleggiano purezza ed eleganza. Ideale per matrimoni, condoglianze o decorazioni domestiche eleganti.',
                slug: 'composizione-gigli-bianchi',
                metaTitle: 'Composizione di Gigli Bianchi - Fiori Eleganti',
                metaDesc: 'Elegante composizione di gigli bianchi per occasioni speciali. Simbolo di purezza e grazia.',
            },
            uk: {
                title: 'Композиція з білих лілій',
                description: 'Вишукана композиція з білосніжних лілій, що символізують чистоту та елегантність. Ідеально підходить для весіль, співчуття або елегантного домашнього декору.',
                slug: 'kompozytsiya-bilykh-liliy',
                metaTitle: 'Композиція з білих лілій - Елегантні квіти',
                metaDesc: 'Елегантна композиція з білих лілій для особливих випадків. Символ чистоти та граціозності.',
            },
        },
        imageCount: 2,
    },
    {
        sku: 'ORCHID-PURPLE-004111',
        price: 20,
        stock: 12,
        translations: {
            en: {
                title: 'Purple Orchid in Pot',
                description: 'Exotic purple orchid plant in decorative pot. Long-lasting beauty that adds sophistication to any space. Easy to care for and blooms for months.',
                slug: 'purple-orchid-pot',
                metaTitle: 'Purple Orchid Plant - Exotic Flowers',
                metaDesc: 'Beautiful purple orchid plant in pot. Long-lasting exotic flower perfect for home or office.',
            },
            it: {
                title: 'Orchidea Viola in Vaso',
                description: 'Pianta di orchidea viola esotica in vaso decorativo. Bellezza duratura che aggiunge raffinatezza a qualsiasi spazio. Facile da curare e fiorisce per mesi.',
                slug: 'orchidea-viola-vaso',
                metaTitle: 'Pianta di Orchidea Viola - Fiori Esotici',
                metaDesc: 'Bellissima pianta di orchidea viola in vaso. Fiore esotico duraturo perfetto per casa o ufficio.',
            },
            uk: {
                title: 'Фіолетова орхідея в горщику',
                description: 'Екзотична фіолетова орхідея в декоративному горщику. Довготривала краса, що додає витонченості будь-якому простору. Легка в догляді та цвіте місяцями.',
                slug: 'fioletova-orkhideya-gorshchyk',
                metaTitle: 'Фіолетова орхідея - Екзотичні квіти',
                metaDesc: 'Прекрасна фіолетова орхідея в горщику. Довготривала екзотична квітка ідеальна для дому чи офісу.',
            },
        },
        imageCount: 5,
    },
    {
        sku: 'PEONY-PINK-005222',
        price: 30,
        stock: 18,
        translations: {
            en: {
                title: 'Pink Peonies Bouquet',
                description: 'Luxurious bouquet of soft pink peonies with their signature lush petals. These romantic flowers are perfect for weddings and special celebrations.',
                slug: 'pink-peonies-bouquet',
                metaTitle: 'Pink Peonies Bouquet - Luxury Flowers',
                metaDesc: 'Stunning pink peonies bouquet. Luxurious flowers for weddings and romantic occasions.',
            },
            it: {
                title: 'Bouquet di Peonie Rosa',
                description: 'Lussuoso bouquet di peonie rosa tenue con i loro caratteristici petali rigogliosi. Questi fiori romantici sono perfetti per matrimoni e celebrazioni speciali.',
                slug: 'bouquet-peonie-rosa',
                metaTitle: 'Bouquet di Peonie Rosa - Fiori di Lusso',
                metaDesc: 'Splendido bouquet di peonie rosa. Fiori lussuosi per matrimoni e occasioni romantiche.',
            },
            uk: {
                title: 'Букет рожевих півоній',
                description: 'Розкішний букет з ніжно-рожевих півоній з їх фірмовими пишними пелюстками. Ці романтичні квіти ідеально підходять для весіль та особливих свят.',
                slug: 'buket-rozhevykh-pivoniy',
                metaTitle: 'Букет рожевих півоній - Розкішні квіти',
                metaDesc: 'Приголомшливий букет рожевих півоній. Розкішні квіти для весіль та романтичних випадків.',
            },
        },
        imageCount: 3,
    },
    {
        sku: 'SUNFLOWER-007333',
        price: 18,
        stock: 22,
        translations: {
            en: {
                title: 'Sunny Sunflowers Bouquet',
                description: 'Cheerful bouquet of bright sunflowers that bring warmth and joy. Perfect for lifting spirits and celebrating life\'s happy moments.',
                slug: 'sunny-sunflowers-bouquet',
                metaTitle: 'Sunflowers Bouquet - Cheerful Flowers',
                metaDesc: 'Bright sunflowers bouquet to spread joy and happiness. Perfect gift for any celebration.',
            },
            it: {
                title: 'Bouquet di Girasoli Solari',
                description: 'Allegro bouquet di girasoli luminosi che portano calore e gioia. Perfetto per sollevare gli spiriti e celebrare i momenti felici della vita.',
                slug: 'bouquet-girasoli-solari',
                metaTitle: 'Bouquet di Girasoli - Fiori Allegri',
                metaDesc: 'Bouquet di girasoli luminosi per diffondere gioia e felicità. Regalo perfetto per ogni celebrazione.',
            },
            uk: {
                title: 'Букет сонячних соняшників',
                description: 'Веселий букет яскравих соняшників, що приносять тепло та радість. Ідеальний для піднесення настрою та святкування щасливих моментів життя.',
                slug: 'buket-sonyachnykh-sonyashnikiv',
                metaTitle: 'Букет соняшників - Веселі квіти',
                metaDesc: 'Яскравий букет соняшників для поширення радості та щастя. Ідеальний подарунок для будь-якого святкування.',
            },
        },
        imageCount: 2,
    },
    {
        sku: 'HYDRANGEA-BLUE-0084444',
        price: 22,
        stock: 14,
        translations: {
            en: {
                title: 'Blue Hydrangea Arrangement',
                description: 'Stunning arrangement featuring lush blue hydrangeas. These voluminous flowers create a spectacular display perfect for special events and home decoration.',
                slug: 'blue-hydrangea-arrangement',
                metaTitle: 'Blue Hydrangea Arrangement - Premium Flowers',
                metaDesc: 'Beautiful blue hydrangea flower arrangement. Luxurious and voluminous flowers for any occasion.',
            },
            it: {
                title: 'Composizione di Ortensie Blu',
                description: 'Splendida composizione con ortensie blu rigogliose. Questi fiori voluminosi creano uno spettacolo spettacolare perfetto per eventi speciali e decorazioni domestiche.',
                slug: 'composizione-ortensie-blu',
                metaTitle: 'Composizione di Ortensie Blu - Fiori Premium',
                metaDesc: 'Bellissima composizione floreale di ortensie blu. Fiori lussuosi e voluminosi per ogni occasione.',
            },
            uk: {
                title: 'Композиція з блакитної гортензії',
                description: 'Приголомшлива композиція з пишних блакитних гортензій. Ці об\'ємні квіти створюють видовищну експозицію, ідеальну для особливих подій та домашнього декору.',
                slug: 'kompozytsiya-blakytnoi-hortenziyi',
                metaTitle: 'Композиція з блакитної гортензії - Преміум квіти',
                metaDesc: 'Прекрасна композиція з блакитної гортензії. Розкішні та об\'ємні квіти для будь-якого випадку.',
            },
        },
        imageCount: 4,
    },
    {
        sku: 'CARNATION-RED-0095555',
        price: 33,
        stock: 35,
        translations: {
            en: {
                title: 'Red Carnations Bouquet',
                description: 'Classic bouquet of vibrant red carnations. Long-lasting flowers that symbolize deep love and admiration. Perfect for everyday gifting.',
                slug: 'red-carnations-bouquet',
                metaTitle: 'Red Carnations Bouquet - Classic Flowers',
                metaDesc: 'Fresh red carnations bouquet. Classic and long-lasting flowers for expressing love and admiration.',
            },
            it: {
                title: 'Bouquet di Garofani Rossi',
                description: 'Classico bouquet di garofani rossi vibranti. Fiori duraturi che simboleggiano amore profondo e ammirazione. Perfetto per regali quotidiani.',
                slug: 'bouquet-garofani-rossi',
                metaTitle: 'Bouquet di Garofani Rossi - Fiori Classici',
                metaDesc: 'Bouquet di garofani rossi freschi. Fiori classici e duraturi per esprimere amore e ammirazione.',
            },
            uk: {
                title: 'Букет червоних гвоздик',
                description: 'Класичний букет з яскравих червоних гвоздик. Довготривалі квіти, що символізують глибоке кохання та захоплення. Ідеальні для повсякденних подарунків.',
                slug: 'buket-chervonykh-hvozdyk',
                metaTitle: 'Букет червоних гвоздик - Класичні квіти',
                metaDesc: 'Свіжий букет червоних гвоздик. Класичні та довготривалі квіти для вираження кохання та захоплення.',
            },
        },
        imageCount: 1,
    },
];

async function main() {
    console.log('🌱 Starting seed...');

    // Очистка базы данных
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productTranslation.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Database cleaned');

    // Создание пользователей
    const hashedPassword = 'password123';

    const adminUser = await prisma.user.create({
        data: {
            fullName: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: UserRole.ADMIN,
            verified: new Date(),
        },
    });

    const regularUser = await prisma.user.create({
        data: {
            fullName: 'John Doe',
            email: 'john@example.com',
            password: hashedPassword,
            role: UserRole.USER,
            verified: new Date(),
        },
    });

    console.log('✅ Users created');

    // Создание продуктов
    for (const productData of products) {
        const images = imageUrls.slice(0, productData.imageCount).map((url) => ({ imageUrl: url }));

        await prisma.product.create({
            data: {
                sku: productData.sku,
                price: productData.price,
                stock: productData.stock,
                isActive: true,
                translations: {
                    create: [
                        {
                            language: 'en',
                            title: productData.translations.en.title,
                            description: productData.translations.en.description,
                            slug: productData.translations.en.slug,
                            metaTitle: productData.translations.en.metaTitle,
                            metaDesc: productData.translations.en.metaDesc,
                        },
                        {
                            language: 'it',
                            title: productData.translations.it.title,
                            description: productData.translations.it.description,
                            slug: productData.translations.it.slug,
                            metaTitle: productData.translations.it.metaTitle,
                            metaDesc: productData.translations.it.metaDesc,
                        },
                        {
                            language: 'uk',
                            title: productData.translations.uk.title,
                            description: productData.translations.uk.description,
                            slug: productData.translations.uk.slug,
                            metaTitle: productData.translations.uk.metaTitle,
                            metaDesc: productData.translations.uk.metaDesc,
                        },
                    ],
                },
                images: {
                    create: images,
                },
            },
        });
    }

    console.log('✅ Products created with translations and images');

    // Создание корзины для обычного пользователя
    const cart = await prisma.cart.create({
        data: {
            userId: regularUser.id,
            token: `cart-token-${regularUser.id}`,
            totalAmount: 2400,
            items: {
                create: [
                    {
                        productId: 1,
                        quantity: 2,
                    },
                    {
                        productId: 2,
                        quantity: 1,
                    },
                ],
            },
        },
    });

    console.log('✅ Cart created');

    // Создание заказов
    await prisma.order.create({
        data: {
            userId: regularUser.id,
            token: `order-token-${Date.now()}`,
            totalAmount: 1700,
            status: OrderStatus.SUCCEEDED,
            paymentId: 'pay_123456789',
            items: JSON.stringify([
                { productId: 1, sku: 'ROSE-BOUQUET-001', title: 'Red Roses Bouquet', quantity: 2, price: 850 },
            ]),
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '+380501234567',
            comment: 'Please deliver in the morning',
            deliveryType: DeliveryType.NOVA_POSHTA,
            deliveryCity: 'Kyiv',
            deliveryWarehouse: 'Warehouse #15',
        },
    });

    await prisma.order.create({
        data: {
            userId: regularUser.id,
            token: `order-token-${Date.now() + 1}`,
            totalAmount: 920,
            status: OrderStatus.PENDING,
            items: JSON.stringify([
                { productId: 3, sku: 'LILY-WHITE-003', title: 'White Lilies Arrangement', quantity: 1, price: 920 },
            ]),
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '+380501234567',
            deliveryType: DeliveryType.PICKUP,
            deliveryStoreId: 1,
        },
    });

    console.log('✅ Orders created');

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });