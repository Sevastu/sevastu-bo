import React from 'react';

export function ServiceCardSkeleton() {
    return (
        <div className="h-[400px] bg-white rounded-2xl shadow-sm animate-pulse border border-slate-100 flex flex-col">
            <div className="h-40 bg-slate-100 rounded-t-2xl shrink-0" />
            <div className="p-6 flex-1 flex flex-col">
                <div className="h-6 bg-slate-100 rounded-md w-2/3 mb-3" />
                <div className="h-4 bg-slate-100 rounded-md w-1/3 mb-6" />
                <div className="h-4 bg-slate-100 rounded-md w-full mb-2" />
                <div className="h-4 bg-slate-100 rounded-md w-5/6 mb-auto" />
                <div className="flex gap-3 mt-6">
                    <div className="h-16 bg-slate-100 rounded-xl flex-1" />
                    <div className="h-16 bg-slate-100 rounded-xl flex-1" />
                </div>
                <div className="h-8 bg-slate-100 rounded-lg w-full mt-6" />
            </div>
        </div>
    );
}
