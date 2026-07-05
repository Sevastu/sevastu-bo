"use client";

import React, { useState, useEffect, useCallback } from "react";
import { WorkflowApi } from "@/features/fulfillment/api/workflow.api";
import { Job } from "@/features/fulfillment/types/job.types";
import { JobStatus } from "@/features/fulfillment/types/job.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, RefreshCw, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { jobStatusColors } from "@/lib/status-colors";

const workflowApi = new WorkflowApi();

interface WorkflowProgressProps {
  job: Job;
}

// Workflow steps based on job status
const workflowSteps = [
  { key: 'created', label: 'Created', status: JobStatus.CREATED },
  { key: 'matching', label: 'Matching', status: JobStatus.MATCHING },
  { key: 'waiting', label: 'Waiting for Workers', status: JobStatus.WAITING_FOR_WORKERS },
  { key: 'assigned', label: 'Assigned', status: JobStatus.ASSIGNED },
  { key: 'scheduled', label: 'Scheduled', status: JobStatus.SCHEDULED },
  { key: 'inProgress', label: 'In Progress', status: JobStatus.IN_PROGRESS },
  { key: 'completed', label: 'Completed', status: JobStatus.COMPLETED },
];

export const WorkflowProgress: React.FC<WorkflowProgressProps> = ({ job }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWorkflow = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real implementation, this would call the workflow API
      // For now, we just use the job status
    } catch (err) {
      setError("Failed to load workflow. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [job.id]);

  useEffect(() => {
    loadWorkflow();
  }, [loadWorkflow]);

  // Determine current step index
  const currentStepIndex = workflowSteps.findIndex(step => step.status === job.status);
  const isCompleted = job.status === JobStatus.COMPLETED;
  const isCancelled = job.status === JobStatus.CANCELLED;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" /> Workflow Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 rounded-xl bg-muted/60 animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" /> Workflow Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-4" onClick={loadWorkflow}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" /> Workflow Progress
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadWorkflow}
            disabled={loading}
            className="h-8 w-8 p-0"
            aria-label="Refresh workflow"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workflowSteps.map((step, index) => {
            const isCurrent = index === currentStepIndex;
            const isPast = index < currentStepIndex;
            const isFuture = index > currentStepIndex;

            return (
              <div key={step.key} className="flex items-center gap-4">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    isCompleted && "bg-green-500 text-white",
                    isCancelled && index === currentStepIndex && "bg-red-500 text-white",
                    isCurrent && !isCompleted && !isCancelled && "bg-primary text-primary-foreground",
                    isPast && !isCompleted && "bg-green-500 text-white",
                    isFuture && "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted || isPast ? "✓" : isCurrent ? "●" : "○"}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className={cn(
                      "w-0.5 h-8 mt-2",
                      isPast || isCompleted ? "bg-green-500" : "bg-border"
                    )} />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1">
                  <p className={cn(
                    "text-sm font-medium",
                    isCurrent && "text-primary",
                    isPast && "text-green-500",
                    isFuture && "text-muted-foreground"
                  )}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Current status: {job.status.replace('_', ' ')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};