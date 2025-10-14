
import { ProductDTO } from '@/entities/product/types/product';
import { create } from 'zustand';



interface ProductModalStore {
    isOpen: boolean;
    product: ProductDTO | null;
    openModal: (product: ProductDTO) => void;
    closeModal: () => void;
}

export const useProductModal = create<ProductModalStore>((set) => ({
    isOpen: false,
    product: null,
    openModal: (product) => set({ isOpen: true, product }),
    closeModal: () => set({ isOpen: false, product: null }),
}));