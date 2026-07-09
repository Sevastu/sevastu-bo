import React from 'react';

export function CustomerTableLoading() {
    return (
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="h-4 w-32 bg-muted rounded"></div>
            </div>
        </div>
    );
}
