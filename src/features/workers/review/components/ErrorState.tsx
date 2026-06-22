import React, { memo } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
    message: string;
    onBack: () => void;
}

export const ErrorState = memo(function ErrorState({ message, onBack }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] p-4 text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100 shadow-sm">
                <AlertTriangle className="w-10 h-10 text-rose-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to Load Profile</h2>
            <p className="text-slate-500 mb-8 max-w-md">{message}</p>
            <Button onClick={onBack} className="rounded-xl shadow-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
            </Button>
        </div>
    );
});
