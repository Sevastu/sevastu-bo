import React, { memo } from 'react';
import { Download, CheckSquare, XSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WorkerVerificationHeader = memo(function WorkerVerificationHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Worker Verification</h1>
        <p className="text-slate-500 mt-1">Review and verify worker documents and credentials</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export Reports
        </Button>
        <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 shadow-sm">
          <CheckSquare className="w-4 h-4 mr-2" />
          Bulk Approve
        </Button>
        <Button variant="outline" className="rounded-xl border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 shadow-sm">
          <XSquare className="w-4 h-4 mr-2" />
          Bulk Reject
        </Button>
      </div>
    </div>
  );
});
