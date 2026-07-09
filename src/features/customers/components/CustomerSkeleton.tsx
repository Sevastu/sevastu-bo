import React from 'react';

export function CustomerSkeleton() {
    return (
        <div className="h-[280px] bg-card rounded-2xl shadow-sm animate-pulse border border-border flex flex-col p-6">
            <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-muted rounded-full shrink-0" />
                <div className="flex-1 mt-1">
                    <div className="h-4 bg-muted rounded w-2/3 mb-3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
                <div className="h-5 bg-muted rounded w-16" />
                <div className="h-3 bg-muted rounded w-20" />
            </div>
            
            <div className="mb-4">
                <div className="h-3 bg-muted rounded w-12 mb-3" />
                <div className="flex gap-2">
                    <div className="h-5 bg-muted rounded-full w-16" />
                    <div className="h-5 bg-muted rounded-full w-20" />
                </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-muted flex justify-between items-center">
                <div className="flex gap-1">
                    <div className="w-3.5 h-3.5 bg-muted rounded-sm" />
                    <div className="w-3.5 h-3.5 bg-muted rounded-sm" />
                </div>
                <div className="h-3 bg-muted rounded w-24" />
            </div>
        </div>
    );
}
