"use client";

import React from "react";
import {
  Check,
  FileText,
  Search,
  Clock3,
  UserCheck,
  Calendar,
  Wrench,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Job, JobStatus } from "@/features/fulfillment/types/job.types";

interface WorkflowProgressProps {
  job: Job;
}

const WORKFLOW_STEPS = [
  {
    id: JobStatus.CREATED,
    label: "Created",
    icon: FileText,
    color:
      "border-blue-500 bg-blue-500/10 text-blue-600 ring-blue-500/20",
    connector: "from-blue-500 to-blue-400",
  },
  {
    id: JobStatus.MATCHING,
    label: "Matching",
    icon: Search,
    color:
      "border-violet-500 bg-violet-500/10 text-violet-600 ring-violet-500/20",
    connector: "from-violet-500 to-violet-400",
  },
  {
    id: JobStatus.WAITING_FOR_WORKERS,
    label: "Waiting",
    icon: Clock3,
    color:
      "border-amber-500 bg-amber-500/10 text-amber-600 ring-amber-500/20",
    connector: "from-amber-500 to-amber-400",
  },
  {
    id: JobStatus.ASSIGNED,
    label: "Assigned",
    icon: UserCheck,
    color:
      "border-cyan-500 bg-cyan-500/10 text-cyan-600 ring-cyan-500/20",
    connector: "from-cyan-500 to-cyan-400",
  },
  {
    id: JobStatus.SCHEDULED,
    label: "Scheduled",
    icon: Calendar,
    color:
      "border-indigo-500 bg-indigo-500/10 text-indigo-600 ring-indigo-500/20",
    connector: "from-indigo-500 to-indigo-400",
  },
  {
    id: JobStatus.IN_PROGRESS,
    label: "In Progress",
    icon: Wrench,
    color:
      "border-orange-500 bg-orange-500/10 text-orange-600 ring-orange-500/20",
    connector: "from-orange-500 to-orange-400",
  },
  {
    id: JobStatus.COMPLETED,
    label: "Completed",
    icon: CheckCircle2,
    color:
      "border-emerald-500 bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
    connector: "from-emerald-500 to-emerald-400",
  },
];

export default function WorkflowProgress({
  job,
}: WorkflowProgressProps) {
  const currentIndex = WORKFLOW_STEPS.findIndex(
    (s) => s.id === job.status
  );

  if (job.status === JobStatus.CANCELLED) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6">
        <div className="flex items-center justify-center gap-2 text-red-600">
          <XCircle className="h-6 w-6" />
          <span className="font-semibold text-lg">
            Job Cancelled
          </span>
        </div>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          This workflow has been cancelled.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max rounded-2xl border bg-card px-8 py-8">
        <div className="flex items-start">
          {WORKFLOW_STEPS.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-full border-1 transition-all duration-300",

                      isCompleted &&
                        `${step.color} shadow-sm`,

                      isCurrent &&
                        `${step.color} scale-110 shadow-lg`,

                      !isCompleted &&
                        !isCurrent &&
                        "border-border bg-muted/40 text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  <span
                    className={cn(
                      "mt-3 whitespace-nowrap text-xs font-semibold",

                      isCurrent
                        ? "text-foreground"
                        : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>

                  {isCurrent && (
                    <span
                      className={cn(
                        "mt-2 rounded-full px-2 py-1 text-[10px] font-semibold uppercase",
                        step.color
                      )}
                    >
                      Current
                    </span>
                  )}
                </div>

                {index < WORKFLOW_STEPS.length - 1 && (
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "mx-4 h-1 w-20 rounded-full transition-all md:w-28",

                        isCompleted
                          ? `bg-gradient-to-r ${step.connector}`
                          : "bg-border"
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}