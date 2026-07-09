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
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-2xl border border-border border-dashed shadow-sm">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 border border-border shadow-sm">
        <SearchX className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">
        {WORKER_VERIFICATION_CONSTANTS.EMPTY_STATE_TITLE}
      </h3>
      <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
        {WORKER_VERIFICATION_CONSTANTS.EMPTY_STATE_DESC}
      </p>
      <Button 
        onClick={onClearFilters}
        variant="outline"
        className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm px-6"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );
});
