import React, { memo } from 'react';

export const CustomerProfileSkeleton = memo(function CustomerProfileSkeleton() {
    return (
        <div className="p-6 space-y-8 animate-pulse">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 shrink-0"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-100 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                    <div className="flex space-x-2 pt-1">
                        <div className="h-5 w-16 bg-slate-100 rounded"></div>
                        <div className="h-5 w-20 bg-slate-100 rounded"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
                <div className="h-24 bg-slate-50 rounded-xl border border-slate-100"></div>
            </div>

            <div className="space-y-4">
                <div className="h-3 w-32 bg-slate-100 rounded"></div>
                <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-100">
                    <div className="flex items-center space-x-3"><div className="w-8 h-8 rounded-lg bg-white"></div><div className="h-4 w-32 bg-slate-100 rounded"></div></div>
                    <div className="flex items-center space-x-3"><div className="w-8 h-8 rounded-lg bg-white"></div><div className="h-4 w-40 bg-slate-100 rounded"></div></div>
                    <div className="flex items-center space-x-3"><div className="w-8 h-8 rounded-lg bg-white"></div><div className="h-4 w-24 bg-slate-100 rounded"></div></div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="h-3 w-32 bg-slate-100 rounded"></div>
                <div className="space-y-3">
                    <div className="h-16 bg-slate-50 rounded-xl border border-slate-100"></div>
                    <div className="h-16 bg-slate-50 rounded-xl border border-slate-100"></div>
                </div>
            </div>
        </div>
    );
});
