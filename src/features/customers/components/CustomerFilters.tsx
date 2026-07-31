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
        <div className="backdrop-blur-md mb-4">
            <div className="bg-card rounded-lg shadow-sm border border-border/20 p-4">
                <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">

                    {/* Search */}
                    <div className="relative flex-1 min-w-[320px] max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search customers..."
                            className="pl-9 h-10"
                        />
                    </div>

                    {/* Status */}
                    <div className="w-[180px] shrink-0">
                        <FilterSelect
                            value={statusFilter}
                            onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
                            options={statusOptions}
                        />
                    </div>

                    {/* Date */}
                    <div className="shrink-0">
                        <CustomerDateFilter
                            dateRange={dateRange}
                            onChange={onDateRangeChange}
                        />
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* View Toggle */}
                    <div className="flex bg-muted p-1 rounded-xl">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            aria-label="Grid View"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('table')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            aria-label="Table View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Clear */}
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            className="shrink-0"
                            onClick={onClearFilters}
                        >
                            Clear Filters
                        </Button>
                    )}

                </div>
            </div>
        </div>
    );
}
