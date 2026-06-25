import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

export function WorkerProfileSkeleton() {
  return (
    <AppLayout>
      <div className="bg-slate-50 min-h-screen px-4 md:px-8 py-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Hero Skeleton */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-slate-200 animate-pulse shrink-0" />
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-3 w-1/2">
                  <div className="h-8 bg-slate-200 rounded-lg animate-pulse w-3/4" />
                  <div className="h-4 bg-slate-200 rounded-lg animate-pulse w-1/2" />
                </div>
                <div className="w-24 h-16 bg-slate-200 rounded-xl animate-pulse" />
              </div>
              <div className="h-2 bg-slate-100 rounded-full w-full max-w-md overflow-hidden mt-4">
                <div className="h-full w-1/3 bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>

          {/* KPI Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-28 flex justify-between items-center">
                <div className="space-y-3 w-1/2">
                  <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
                  <div className="h-8 bg-slate-200 rounded w-3/4 animate-pulse" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Main Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-100 h-64 animate-pulse" />
              <div className="bg-white rounded-2xl p-6 border border-slate-100 h-48 animate-pulse" />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-100 h-72 animate-pulse" />
              <div className="bg-white rounded-2xl p-6 border border-slate-100 h-56 animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
