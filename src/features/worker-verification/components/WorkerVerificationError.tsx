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
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-destructive/10 rounded-2xl border border-destructive/20">
      <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mb-6 border border-destructive/20 shadow-sm">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">Failed to load data</h3>
      <p className="text-destructive/80 mb-8 max-w-sm mx-auto font-medium">{message}</p>
      <Button 
        onClick={onRetry}
        className="rounded-xl bg-destructive hover:bg-destructive/90 text-primary-foreground shadow-sm px-6"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
});
