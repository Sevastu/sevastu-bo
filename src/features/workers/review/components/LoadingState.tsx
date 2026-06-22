import React, { memo } from 'react';

export const LoadingState = memo(function LoadingState() {
    return (
        <div className="p-6 space-y-6 animate-pulse max-w-7xl mx-auto">
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                    <div className="space-y-2">
                        <div className="w-48 h-6 bg-slate-200 rounded-md" />
                        <div className="w-24 h-4 bg-slate-200 rounded-md" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-32 h-10 bg-slate-200 rounded-xl" />
                </div>
            </div>

            {/* Profile Summary Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 h-64 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-slate-200 rounded-full mb-4" />
                    <div className="w-32 h-5 bg-slate-200 rounded-md" />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 h-64">
                    <div className="w-48 h-5 bg-slate-200 rounded-md mb-8" />
                    <div className="grid grid-cols-2 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-xl shrink-0" />
                                <div className="space-y-2 w-full">
                                    <div className="w-20 h-3 bg-slate-200 rounded-md" />
                                    <div className="w-full h-4 bg-slate-200 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-white border border-slate-200 rounded-2xl p-5">
                        <div className="w-20 h-4 bg-slate-200 rounded-md mb-4" />
                        <div className="w-16 h-8 bg-slate-200 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
});
