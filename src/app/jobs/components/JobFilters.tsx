import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobsDashboardFilters } from '../hooks/useJobsDashboard';
import { JobStatus } from '@/features/fulfillment/types/job.types';
import { Label } from '@/components/ui/label';

interface JobFiltersProps {
  filters: JobsDashboardFilters;
  onFilterChange: (key: keyof JobsDashboardFilters, value: string | undefined) => void;
}

export default function JobFilters({ filters, onFilterChange }: JobFiltersProps) {
  return (
    <div className="p-4 bg-card border rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Status</Label>
        <Select 
          value={filters.status || 'all'} 
          onValueChange={(val) => onFilterChange('status', val === 'all' ? undefined : val)}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.values(JobStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Category</Label>
        <Select 
          value={filters.category || 'all'} 
          onValueChange={(val) => onFilterChange('category', val === 'all' ? undefined : val)}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="electrical">Electrical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Placeholder for Date Range filters - in a real app you'd use a DatePicker component */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Start Date</Label>
        <input 
          type="date" 
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={filters.startDate || ''}
          onChange={(e) => onFilterChange('startDate', e.target.value || undefined)}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">End Date</Label>
        <input 
          type="date" 
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={filters.endDate || ''}
          onChange={(e) => onFilterChange('endDate', e.target.value || undefined)}
        />
      </div>
    </div>
  );
}
