
import { create } from 'zustand';



interface ProductModalStore {
    isOpen: boolean;
    product: any | null;
    openModal: (product: any) => void;
    closeModal: () => void;
}

export const useProductModal = create<ProductModalStore>((set) => ({
    isOpen: false,
    product: null,
    openModal: (product) => set({ isOpen: true, product }),
    closeModal: () => set({ isOpen: false, product: null }),
}));