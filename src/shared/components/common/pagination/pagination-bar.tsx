'use client';

import React from "react";
import { PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext, Pagination, PaginationContent } from "../../ui";


interface PaginationBarProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const renderPaginationItems = () => {
        const items = [];

        // Previous
        items.push(
            <PaginationItem key="prev">
                <PaginationPrevious
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
            </PaginationItem>
        );

        // First page
        if (currentPage > 2) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => onPageChange(1)}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Ellipsis before
        if (currentPage > 3) {
            items.push(
                <PaginationItem key="ellipsis-before">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Pages around current
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => onPageChange(i)}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Ellipsis after
        if (currentPage < totalPages - 2) {
            items.push(
                <PaginationItem key="ellipsis-after">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Last page
        if (currentPage < totalPages - 1) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Next
        items.push(
            <PaginationItem key="next">
                <PaginationNext
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
            </PaginationItem>
        );

        return items;
    };

    return (
        <Pagination>
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
        </Pagination>
    );
};
