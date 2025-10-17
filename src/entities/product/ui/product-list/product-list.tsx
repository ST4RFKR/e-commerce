'use client';
import { ProductCard } from "@/shared/components/common";
import React, { useState } from "react";
import { useProducts } from "../../hooks/use-products";


import { ProductDTO } from "../../types/product";
import { PaginationBar } from "@/shared/components/common/pagination/pagination-bar";
import { Skeleton } from "@/shared/components/ui";


export const ProductList = () => {

    const [page, setPage] = useState(1);
    const limit = 8;
    const { data, isLoading, error } = useProducts(page, limit);

    if (isLoading) return <div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="md:h-[390px] h-[200px] w-[190px] md:w-full bg-gray-200 rounded-xl" />
        ))}
    </div>;
    if (error) return <div>Ошибка загрузки продуктов</div>;

    const products = data?.products || [];
    const pagination = data?.pagination;
    const totalPages = pagination?.pages || 1;


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    return (
        <div className="pb-4">

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
