'use client';
import { ProductCard } from "@/shared/components/common";
import React, { useState } from "react";
import { useProducts } from "../../hooks/use-products";


import { ProductDTO } from "../../types/product";
import { PaginationBar } from "@/shared/components/common/pagination/pagination-bar";


export const ProductList = () => {

    const [page, setPage] = useState(1);
    const limit = 8;
    const { data, isLoading, error, refetch } = useProducts(page, limit);

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки продуктов</div>;
    const products = data?.products || [];
    const pagination = data?.pagination;
    const totalPages = pagination?.pages || 1;


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        refetch();
    };
    return (
        <div>

            <ul className="grid grid-cols-2 gap-1 md:gap-4 md:grid-cols-4">
                {products.map((product: ProductDTO) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <PaginationBar
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};
