
import Image from 'next/image';
import { Button } from '../../../shared/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';



interface CartItemProps {
    symbol: string;
    product: {
        id: number;
        title: string;
        imageUrl: string;
        price: number;
        productId: number;
        quantity: number;
    };
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    onRemove: (id: number) => void;
    loading?: boolean;
}

export function CartDrawerItem({
    product: { id, title, imageUrl, price, quantity },
    symbol,
    onClickCountButton,
    onRemove,
}: CartItemProps) {

    return (
        <div className="flex gap-3 bg-white p-2 rounded-lg border">
            {/* Зображення товару */}
            <div className="relative w-16 h-16 flex-shrink-0">
                <Image src={imageUrl} alt={title} fill className="rounded-md object-cover" />
            </div>

            {/* Інформація про товар */}
            <div className="flex-1 flex flex-col gap-1 min-w-0">
                {/* Назва та ціна */}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-medium truncate">{title}</h3>
                    <span className="text-sm font-bold whitespace-nowrap">{price * quantity} {symbol}</span>
                </div>

                {/* Кількість та кнопки */}
                <div className="flex justify-between items-center">
                    {/* Кнопки кількості */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            className="h-8 w-8"
                            disabled={quantity === 1}
                            onClick={() => onClickCountButton(id, quantity, 'minus')}>
                            <Minus size={12} />
                        </Button>
                        <span className="text-sm w-6 text-center">{quantity}</span>
                        <Button
                            variant="outline"
                            type="button"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onClickCountButton(id, quantity, 'plus')}>
                            <Plus size={12} />
                        </Button>
                    </div>

                    {/* Кнопка видалення */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            onRemove(id);
                        }}
                        aria-label="Видалити товар">
                        <X size={16} className="text-neutral-300 hover:text-red-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}