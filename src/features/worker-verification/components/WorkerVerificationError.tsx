import React, { memo } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkerVerificationErrorProps {
  message: string;
  onRetry: () => void;
}

export const WorkerVerificationError = memo(function WorkerVerificationError({
  message,
  onRetry
}: WorkerVerificationErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-rose-50/50 rounded-2xl border border-rose-100">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 border border-rose-100 shadow-sm">
        <AlertTriangle className="w-8 h-8 text-rose-500" />
      </div>
      <h3 className="text-lg font-bold text-rose-900 mb-2">Failed to load data</h3>
      <p className="text-rose-600/80 mb-8 max-w-sm mx-auto font-medium">{message}</p>
      <Button 
        onClick={onRetry}
        className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm px-6"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
});
