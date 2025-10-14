'use client';
import { ProductCard } from "@/shared/components/common";
import React from "react";
import { useProducts } from "../../hooks/use-products";


import { ProductDTO } from "../../types/product";





export const ProductList = () => {

    const { data, isLoading, error } = useProducts();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки продуктов</div>;

    return (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data?.map((product: ProductDTO) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ul>
    );
};