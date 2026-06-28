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
    <div className="bg-card rounded-2xl p-4 border border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workers by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-100 transition-all text-sm font-medium text-slate-900"
            />
            {searchTerm && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-100 text-sm font-medium text-slate-700 appearance-none"
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
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors text-sm font-bold shadow-sm">
          <Filter size={16} />
          More Filters
        </button>
      </div>
    </div>
  );
});
