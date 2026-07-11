import React from 'react';
import PageToolbar from '@/components/common/PageToolbar';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import ViewToggle, { ViewMode } from '@/components/common/ViewToggle';

interface JobToolbarProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onSearch: (searchTerm: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  onToggleFilters: () => void;
  searchValue: string;
}

export default function JobToolbar({
  view,
  onViewChange,
  onSearch,
  onRefresh,
  isRefreshing,
  onToggleFilters,
  searchValue,
}: JobToolbarProps) {
  return (
    <PageToolbar
      searchValue={searchValue}
      onSearchChange={onSearch}
      searchPlaceholder="Search jobs by ID, customer..."
      filters={
        <Button variant="outline" size="sm" onClick={onToggleFilters} className="h-9">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      }
      viewToggle={
        <ViewToggle
          mode={view}
          onChange={onViewChange}
        />
      }
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
    />
  );
}