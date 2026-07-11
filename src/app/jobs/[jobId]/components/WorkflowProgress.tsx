import React from 'react';
import { Job, JobStatus } from '@/features/fulfillment/types/job.types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface WorkflowProgressProps {
  job: Job;
}

const WORKFLOW_STEPS = [
  { id: JobStatus.CREATED, label: 'Created' },
  { id: JobStatus.MATCHING, label: 'Matching' },
  { id: JobStatus.WAITING_FOR_WORKERS, label: 'Waiting' },
  { id: JobStatus.ASSIGNED, label: 'Assigned' },
  { id: JobStatus.SCHEDULED, label: 'Scheduled' },
  { id: JobStatus.IN_PROGRESS, label: 'In Progress' },
  { id: JobStatus.COMPLETED, label: 'Completed' },
];

export default function WorkflowProgress({ job }: WorkflowProgressProps) {
  const currentStatusIndex = WORKFLOW_STEPS.findIndex(s => s.id === job.status);
  
  // If cancelled, just show cancelled state
  if (job.status === JobStatus.CANCELLED) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
        <p className="text-destructive font-semibold">Job Cancelled</p>
      </div>
    );
  }

  return (
    <div className="py-6 px-2 w-full overflow-x-auto">
      <div className="flex items-center min-w-max">
        {WORKFLOW_STEPS.map((step, index) => {
          const isCompleted = index < currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const isPending = index > currentStatusIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors z-10",
                    isCompleted ? "bg-primary border-primary text-primary-foreground" :
                    isCurrent ? "bg-background border-primary text-primary" :
                    "bg-background border-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-medium">{index + 1}</span>}
                </div>
                <span 
                  className={cn(
                    "absolute top-10 text-[10px] font-medium uppercase tracking-wider whitespace-nowrap",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 w-16 md:w-24 mx-2 transition-colors",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
