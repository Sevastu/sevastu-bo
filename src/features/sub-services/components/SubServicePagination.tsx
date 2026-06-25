import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUB_SERVICES_PAGE_LIMITS } from '../utils/subServiceConstants';

interface SubServicePaginationProps {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export function SubServicePagination({
    currentPage,
    totalPages,
    limit,
    totalItems,
    onPageChange,
    onLimitChange
}: SubServicePaginationProps) {
    if (totalItems === 0) return null;

    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalItems);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 mb-8 px-2">
            <div className="text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-900 font-bold">{startItem}</span> to{' '}
                <span className="text-slate-900 font-bold">{endItem}</span> of{' '}
                <span className="text-slate-900 font-bold">{totalItems}</span> Sub-Services
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Rows per page</span>
                    <Select
                        value={limit.toString()}
                        onValueChange={(val) => onLimitChange(Number(val))}
                    >
                        <SelectTrigger className="w-[70px] h-9 bg-white border-slate-200 rounded-lg">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {SUB_SERVICES_PAGE_LIMITS.map(l => (
                                <SelectItem key={l} value={l.toString()}>{l}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-1.5">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="h-9 w-9 p-0 rounded-lg border-slate-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="text-sm font-medium px-2 text-slate-700">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="h-9 w-9 p-0 rounded-lg border-slate-200"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
