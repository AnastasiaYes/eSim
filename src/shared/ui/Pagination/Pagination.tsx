import { type FC } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
                                                                currentPage,
                                                                totalPages,
                                                                onPageChange
                                                            }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 py-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg disabled:opacity-50 bg-[var(--bg-blue-100)]"
            >
                Назад
            </button>

            <span className="px-4 py-2 text-[var(--color-gray-500)]">
                Страница {currentPage} из {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg disabled:opacity-50 bg-[var(--bg-blue-100)]"
            >
                Вперед
            </button>
        </div>
    );
};
