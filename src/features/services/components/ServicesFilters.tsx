import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Category } from '@/features/services/types';
import { FilterSelect } from './FilterSelect';

interface ServicesFiltersProps {
    searchQuery: string;
    onSearchChange: (val: string) => void;
    categories: Category[];
    selectedCategoryId: string;
    onCategoryChange: (val: string) => void;
    statusFilter: string;
    onStatusChange: (val: string) => void;
    sortFilter: string;
    onSortChange: (val: string) => void;
    isCategoryMode: boolean;
    viewMode: 'grid' | 'table';
    onViewModeChange: (mode: 'grid' | 'table') => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

export function ServicesFilters({
    searchQuery,
    onSearchChange,
    categories,
    selectedCategoryId,
    onCategoryChange,
    statusFilter,
    onStatusChange,
    sortFilter,
    onSortChange,
    isCategoryMode,
    viewMode,
    onViewModeChange,
    onClearFilters,
    hasActiveFilters
}: ServicesFiltersProps) {
    const categoryOptions = [
        { label: 'All Categories', value: 'all' },
        ...categories.map(cat => ({ label: cat.name, value: cat._id }))
    ];

    const statusOptions = [
        { label: 'All Status', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ];

    const sortOptions = [
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
        { label: 'Name A-Z', value: 'name_asc' },
        { label: 'Name Z-A', value: 'name_desc' },
        { label: 'Most Sub-services', value: 'sub_services' }
    ];

    return (
        <div className="sticky top-0 z-30 backdrop-blur-md">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
                    {/* Search Input */}
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search services by name or description..."
                            className="pl-9 w-full bg-slate-50 border-slate-200 rounded-xl h-10 focus-visible:ring-blue-500"
                            value={searchQuery}
                            onChange={e => onSearchChange(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                        {/* Filters */}
                        {!isCategoryMode && (
                            <div className="w-full sm:w-48">
                                <FilterSelect
                                    value={selectedCategoryId}
                                    onChange={e => onCategoryChange(e.target.value)}
                                    options={categoryOptions}
                                />
                            </div>
                        )}

                        <div className="w-full sm:w-40">
                            <FilterSelect
                                value={statusFilter}
                                onChange={e => onStatusChange(e.target.value)}
                                options={statusOptions}
                            />
                        </div>

                        <div className="w-full sm:w-48">
                            <FilterSelect
                                value={sortFilter}
                                onChange={e => onSortChange(e.target.value)}
                                options={sortOptions}
                            />
                        </div>

                        {/* Actions */}
                        {hasActiveFilters && (
                            <Button 
                                variant="ghost" 
                                onClick={onClearFilters}
                                className="text-slate-500 hover:text-slate-700 h-10 px-3 hidden md:flex"
                            >
                                Clear
                            </Button>
                        )}

                        <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>

                        {/* View Toggle */}
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
            </div>
        </div>
    );
}
