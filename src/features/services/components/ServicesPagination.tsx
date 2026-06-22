import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function ServicesPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange
}: ServicesPaginationProps) {
    if (totalItems === 0 || totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Simple windowing logic to show max 5 pages
    let displayPages = pages;
    if (totalPages > 5) {
        if (currentPage <= 3) {
            displayPages = [...pages.slice(0, 4), -1, totalPages];
        } else if (currentPage >= totalPages - 2) {
            displayPages = [1, -1, ...pages.slice(totalPages - 4)];
        } else {
            displayPages = [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
            <div className="text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-900">{startItem}</span> to <span className="text-slate-900">{endItem}</span> of <span className="text-slate-900">{totalItems}</span> services
            </div>
            
            <div className="flex items-center gap-1.5">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-lg border-slate-200 bg-white"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {displayPages.map((p, i) => {
                    if (p === -1) {
                        return <span key={`ellipsis-${i}`} className="px-2 text-slate-400">...</span>;
                    }
                    return (
                        <Button
                            key={p}
                            variant={currentPage === p ? "default" : "outline"}
                            className={`w-8 h-8 rounded-lg text-sm font-medium ${
                                currentPage === p 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm' 
                                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </Button>
                    );
                })}

                <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-lg border-slate-200 bg-white"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
