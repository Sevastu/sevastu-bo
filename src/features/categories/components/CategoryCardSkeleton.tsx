import React from 'react';

export function CategoryCardSkeleton() {
    return (
        <div className="h-[360px] bg-white rounded-2xl shadow-sm animate-pulse border border-slate-100 flex flex-col">
            <div className="aspect-[16/9] bg-slate-100 rounded-t-2xl shrink-0" />
            <div className="p-5 flex-1 flex flex-col">
                <div className="h-5 bg-slate-100 rounded-md w-2/3 mb-4" />
                <div className="h-3 bg-slate-100 rounded-md w-full mb-2" />
                <div className="h-3 bg-slate-100 rounded-md w-3/4 mb-auto" />
                
                <div className="grid grid-cols-2 gap-2 mt-5 mb-5">
                    <div className="h-12 bg-slate-100 rounded-lg" />
                    <div className="h-12 bg-slate-100 rounded-lg" />
                </div>
                
                <div className="h-8 bg-slate-100 rounded-lg w-full mt-auto" />
            </div>
        </div>
    );
}
