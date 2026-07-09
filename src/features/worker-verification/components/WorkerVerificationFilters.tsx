import React, { memo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { WorkerProfileStatus } from '@/lib/enums';

interface WorkerVerificationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (status: WorkerProfileStatus | 'all') => void;
}

export const WorkerVerificationFilters = memo(function WorkerVerificationFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange
}: WorkerVerificationFiltersProps) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border/20 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search workers by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-muted transition-all text-sm font-medium text-foreground"
            />
            {searchTerm && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="lg:w-48">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as WorkerProfileStatus | 'all')}
            className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-muted text-sm font-medium text-foreground appearance-none"
          >
            <option value="all">All Status</option>
            <option value={WorkerProfileStatus.UNDER_REVIEW}>Under Review</option>
            <option value={WorkerProfileStatus.VERIFIED}>Verified</option>
            <option value={WorkerProfileStatus.REJECTED}>Rejected</option>
            <option value={WorkerProfileStatus.KYC_PENDING}>KYC Pending</option>
            <option value={WorkerProfileStatus.DRAFT}>Draft</option>
          </select>
        </div>

        {/* More Filters Button */}
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-muted text-foreground rounded-xl hover:bg-muted-foreground/10 transition-colors text-sm font-bold shadow-sm">
          <Filter size={16} />
          More Filters
        </button>
      </div>
    </div>
  );
});
