import { useAddToCart } from "./use-add-to-cart";
import { useGetCart } from "./use-get-cart";
import { useRemoveItemCart } from "./use-remove-item-cart";
import { useUpdateItemQuantity } from "./use-update-item-quentity";


export function useCart() {
    const { data, isLoading, refetch } = useGetCart();

    const addToCart = useAddToCart();
    const updateItemQuantity = useUpdateItemQuantity();
    const removeItemFromCart = useRemoveItemCart();

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        if (newQuantity < 1) return;

        updateItemQuantity.mutate({ cartItemId: id, quantity: newQuantity });
    };

    const onClickRemoveItemCart = (id: number) => {
        removeItemFromCart.mutate(id);
    };

    return {
        data,
        isLoading,
        refetch,
        addToCart,
        onClickCountButton,
        onClickRemoveItemCart,
    };
}
