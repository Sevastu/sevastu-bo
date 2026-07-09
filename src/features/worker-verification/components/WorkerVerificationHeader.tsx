import React, { memo } from 'react';
import { Download, CheckSquare, XSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WorkerVerificationHeader = memo(function WorkerVerificationHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Worker Verification</h1>
        <p className="text-muted-foreground mt-1">Review and verify worker documents and credentials</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export Reports
        </Button>
        <Button variant="outline" className="rounded-xl border-success/20 text-success bg-success/10 hover:bg-success/20 shadow-sm">
          <CheckSquare className="w-4 h-4 mr-2" />
          Bulk Approve
        </Button>
        <Button variant="outline" className="rounded-xl border-destructive/20 text-destructive bg-destructive/10 hover:bg-destructive/20 shadow-sm">
          <XSquare className="w-4 h-4 mr-2" />
          Bulk Reject
        </Button>
      </div>
    </div>
  );
});
