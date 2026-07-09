import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterSelect } from '@/features/services/components/FilterSelect';

interface CategoryFiltersProps {
    searchQuery: string;
    onSearchChange: (val: string) => void;
    statusFilter: string;
    onStatusChange: (val: string) => void;
    sortFilter: string;
    onSortChange: (val: string) => void;
    viewMode: 'grid' | 'table';
    onViewModeChange: (mode: 'grid' | 'table') => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

export function CategoryFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    sortFilter,
    onSortChange,
    viewMode,
    onViewModeChange,
    onClearFilters,
    hasActiveFilters
}: CategoryFiltersProps) {
    const statusOptions = [
        { label: 'All Status', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ];

    const sortOptions = [
        { label: 'Newest First', value: 'Newest First' },
        { label: 'Oldest First', value: 'Oldest First' },
        { label: 'Name A-Z', value: 'Name A-Z' },
        { label: 'Name Z-A', value: 'Name Z-A' },
        { label: 'Most Services', value: 'Most Services' }
    ];

    return (
        <div className="backdrop-blur-md mt-4 mb-4 bg-card rounded-lg shadow-sm border border-border/20 p-4">
            <div className="">
                <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search categories by name or description..."
                            className="pl-9 w-full bg-muted border-border rounded-xl h-10 focus-visible:ring-primary/10"
                            value={searchQuery}
                            onChange={e => onSearchChange(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
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

                        {hasActiveFilters && (
                            <Button 
                                variant="ghost" 
                                onClick={onClearFilters}
                                className="text-muted-foreground hover:text-foreground h-10 px-3 hidden md:flex"
                            >
                                Clear
                            </Button>
                        )}

                        <div className="h-6 w-px bg-border hidden sm:block mx-1"></div>

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
                    </div>
                </div>
            </div>
        </div>
    );
}
