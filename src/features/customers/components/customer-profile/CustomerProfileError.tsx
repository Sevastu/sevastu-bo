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
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4 border border-destructive/20">
                <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-6 max-w-xs">{message}</p>
            {onRetry && (
                <Button 
                    onClick={onRetry}
                    variant="outline"
                    className="rounded-xl border-border text-foreground bg-card shadow-sm hover:bg-muted"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Try Again
                </Button>
            )}
        </div>
    );
});
