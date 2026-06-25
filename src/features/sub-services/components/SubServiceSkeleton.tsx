import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function SubServiceSkeleton() {
    return (
        <div className="w-full">
            {/* Header Skeleton */}
            <div className="flex justify-between items-end mb-8">
                <div className="space-y-3">
                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                    <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 w-96 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-3">
                    <div className="h-10 w-24 bg-slate-200 rounded-xl animate-pulse" />
                    <div className="h-10 w-32 bg-blue-200 rounded-xl animate-pulse" />
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[1, 2, 3, 4, 5].map(i => (
                    <Card key={i} className="border-slate-100 shadow-sm rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl animate-pulse" />
                            </div>
                            <div className="h-3 w-20 bg-slate-100 rounded mb-2 animate-pulse" />
                            <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="h-10 w-64 bg-slate-100 rounded-xl animate-pulse" />
                    <div className="h-10 w-32 bg-slate-100 rounded-xl animate-pulse" />
                    <div className="h-10 w-32 bg-slate-100 rounded-xl animate-pulse" />
                </div>
                <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                            <div className="flex gap-4 w-1/3">
                                <div className="space-y-2">
                                    <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                                    <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="h-6 w-24 bg-emerald-50 rounded-full animate-pulse" />
                            <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
                            <div className="h-8 w-8 bg-slate-100 rounded-lg animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
