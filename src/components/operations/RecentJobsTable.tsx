"use client";

import React from "react";
import { Job } from "@/features/fulfillment/types/job.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";
import { jobStatusColors } from "@/lib/status-colors";

interface RecentJobsTableProps {
  jobs: Job[];
  onViewJob: (jobId: string) => void;
}

export const RecentJobsTable: React.FC<RecentJobsTableProps> = ({ jobs, onViewJob }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-xl text-center">
            <p className="text-muted-foreground font-medium">No operational data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3">Job ID</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3">Customer</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3">Status</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3">Assigned Worker</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3">Created Time</th>
                <th className="text-right text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr key={job._id || idx} className="border-b border-border/50 last:border-0">
                  <td className="py-3">
                    <span className="font-mono text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase">
                      {(job._id || '').slice(-8) || 'N/A'}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="font-medium text-sm">{job.customerId?.name || '-'}</span>
                  </td>
                  <td className="py-3">
                    <Badge className={cn("px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[8px] border shadow-none", jobStatusColors[job.status])}>
                       {job.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <span className="font-medium text-sm">{job.currentAssignmentId?.workerId?.name || '-'}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                      <Calendar className="w-3 h-3" />
                      {formatDate(new Date(job.createdAt), "dd MMM, hh:mm a")}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-primary/5 hover:text-primary transition-all active:scale-90"
                      onClick={() => onViewJob(job._id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};