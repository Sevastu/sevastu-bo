import React, { memo } from 'react';
import { SearchX, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WORKER_VERIFICATION_CONSTANTS } from '../utils/workerVerificationConstants';

interface WorkerVerificationEmptyStateProps {
  onClearFilters: () => void;
}

export const WorkerVerificationEmptyState = memo(function WorkerVerificationEmptyState({
  onClearFilters
}: WorkerVerificationEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-slate-200 border-dashed shadow-sm">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
        <SearchX className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        {WORKER_VERIFICATION_CONSTANTS.EMPTY_STATE_TITLE}
      </h3>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        {WORKER_VERIFICATION_CONSTANTS.EMPTY_STATE_DESC}
      </p>
      <Button 
        onClick={onClearFilters}
        variant="outline"
        className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm px-6"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );
});
