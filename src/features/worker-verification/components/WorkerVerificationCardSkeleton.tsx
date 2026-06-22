import React, { memo } from 'react';

export const WorkerVerificationCardSkeleton = memo(function WorkerVerificationCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 shrink-0 border border-slate-200" />
          <div className="space-y-2">
            <div className="h-5 bg-slate-100 rounded-md w-32" />
            <div className="h-4 bg-slate-100 rounded-md w-24" />
            <div className="h-5 bg-slate-100 rounded-md w-20" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-6 bg-slate-100 rounded-md w-16 ml-auto" />
          <div className="h-4 bg-slate-100 rounded-md w-20 ml-auto" />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-1">
        <div className="space-y-3">
          <div className="h-4 bg-slate-100 rounded-md w-full" />
          <div className="h-4 bg-slate-100 rounded-md w-3/4" />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-100 rounded-md w-5/6" />
          <div className="h-4 bg-slate-100 rounded-md w-4/5" />
        </div>
      </div>

      {/* Services */}
      <div className="mb-6">
        <div className="h-4 bg-slate-100 rounded-md w-16 mb-3" />
        <div className="flex gap-2">
          <div className="h-6 bg-slate-100 rounded-md w-20" />
          <div className="h-6 bg-slate-100 rounded-md w-24" />
          <div className="h-6 bg-slate-100 rounded-md w-16" />
        </div>
      </div>

      {/* Documents */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-100 rounded-md w-20" />
          <div className="h-5 bg-slate-100 rounded-md w-20" />
        </div>
        <div className="h-16 bg-slate-50 rounded-xl border border-slate-100" />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <div className="h-10 bg-slate-100 rounded-xl flex-1" />
        <div className="h-10 bg-slate-100 rounded-xl flex-1" />
        <div className="h-10 bg-slate-100 rounded-xl flex-1" />
      </div>
    </div>
  );
});
