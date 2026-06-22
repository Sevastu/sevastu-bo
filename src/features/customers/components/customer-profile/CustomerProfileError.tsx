import React, { memo } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerProfileErrorProps {
    message?: string;
    onRetry?: () => void;
}

export const CustomerProfileError = memo(function CustomerProfileError({
    message = "Failed to load customer details",
    onRetry
}: CustomerProfileErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-6 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h3>
            <p className="text-slate-500 mb-6 max-w-xs">{message}</p>
            {onRetry && (
                <Button 
                    onClick={onRetry}
                    variant="outline"
                    className="rounded-xl border-slate-200 text-slate-700 bg-white shadow-sm hover:bg-slate-50"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Try Again
                </Button>
            )}
        </div>
    );
});
