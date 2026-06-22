import React, { memo } from 'react';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkerReviewHeaderProps {
    onBack: () => void;
    onRefresh: () => void;
    workerId: string;
    isRefreshing?: boolean;
}

export const WorkerReviewHeader = memo(function WorkerReviewHeader({
    onBack,
    onRefresh,
    workerId,
    isRefreshing
}: WorkerReviewHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row rounded-xl sm:items-center justify-between gap-4 p-6 bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onBack}
                    className="h-10 w-10 rounded-xl shadow-md hover:bg-slate-100 text-primary bg-primary/10"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">Review Worker Profile</h2>
                    <p className="text-sm font-mono text-slate-500">ID: {workerId}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button 
                    variant="outline" 
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 shadow-sm text-slate-700 font-medium"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
                    Refresh Data
                </Button>
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 text-sm font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Strict Verification Required</span>
                </div>
            </div>
        </div>
    );
});
