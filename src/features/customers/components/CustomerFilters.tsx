import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterSelect } from '@/features/services/components/FilterSelect';
import { StatusFilter } from '../hooks/useCustomers';
import { CustomerDateFilter } from './CustomerDateFilter';

interface CustomerFiltersProps {
    searchQuery: string;
    onSearchChange: (val: string) => void;
    statusFilter: StatusFilter;
    onStatusChange: (val: StatusFilter) => void;
    dateRange: { from?: string; to?: string } | undefined;
    onDateRangeChange: (range: { from?: string; to?: string } | undefined) => void;
    viewMode: 'grid' | 'table';
    onViewModeChange: (mode: 'grid' | 'table') => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

export function CustomerFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    dateRange,
    onDateRangeChange,
    viewMode,
    onViewModeChange,
    onClearFilters,
    hasActiveFilters
}: CustomerFiltersProps) {
    const statusOptions = [
        { label: 'All Customers', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ];

    return (
        <div className="sticky top-0 z-30 backdrop-blur-md mb-4 mt-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search by name, email, or phone..."
                                className="pl-9 w-full bg-slate-50 border-slate-200 rounded-xl h-10 focus-visible:ring-blue-500"
                                value={searchQuery}
                                onChange={e => onSearchChange(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                            <div className="w-full sm:w-40">
                                <FilterSelect
                                    value={statusFilter}
                                    onChange={e => onStatusChange(e.target.value as StatusFilter)}
                                    options={statusOptions}
                                />
                            </div>

                            <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>

                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button
                                    onClick={() => onViewModeChange('grid')}
                                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                                    aria-label="Grid View"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onViewModeChange('table')}
                                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                                    aria-label="Table View"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CustomerDateFilter dateRange={dateRange} onChange={onDateRangeChange} />
                        
                        {hasActiveFilters && (
                            <Button 
                                variant="ghost" 
                                onClick={onClearFilters}
                                className="text-slate-500 hover:text-slate-700 h-10 px-3 hidden md:flex"
                            >
                                Clear All Filters
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
