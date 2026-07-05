"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          {icon && (
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground max-w-sm">{description}</p>
            )}
          </div>
          {actionLabel && onAction && (
            <Button
              size="sm"
              variant="outline"
              onClick={onAction}
              className="mt-2"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Pre-defined empty state variants
export const NoJobsEmptyState: React.FC<{ onRefresh?: () => void }> = ({ onRefresh }) => (
  <EmptyState
    icon={<Search className="w-6 h-6 text-muted-foreground" />}
    title="No Jobs Found"
    description="There are no jobs matching your current filters. Try adjusting your search criteria or check back later."
    actionLabel={onRefresh ? "Refresh" : undefined}
    onAction={onRefresh}
  />
);

export const NoTimelineEmptyState: React.FC<{ onRefresh?: () => void }> = ({ onRefresh }) => (
  <EmptyState
    icon={<Search className="w-6 h-6 text-muted-foreground" />}
    title="No Timeline Events"
    description="No events have been recorded for this job yet. Timeline will update as the job progresses."
    actionLabel={onRefresh ? "Refresh" : undefined}
    onAction={onRefresh}
  />
);

export const NoRecommendationsEmptyState: React.FC<{ onRefresh?: () => void }> = ({ onRefresh }) => (
  <EmptyState
    icon={<Search className="w-6 h-6 text-muted-foreground" />}
    title="No Recommendations Available"
    description="The system is still matching workers to this job. Check back in a few moments."
    actionLabel={onRefresh ? "Refresh" : undefined}
    onAction={onRefresh}
  />
);

export const NoAssignmentEmptyState: React.FC<{ onCreate?: () => void }> = ({ onCreate }) => (
  <EmptyState
    icon={<Plus className="w-6 h-6 text-muted-foreground" />}
    title="No Assignment Found"
    description="This job has not been assigned to a worker yet. Create an assignment to get started."
    actionLabel={onCreate ? "Create Assignment" : undefined}
    onAction={onCreate}
  />
);

export const NoScheduleEmptyState: React.FC<{ onCreate?: () => void }> = ({ onCreate }) => (
  <EmptyState
    icon={<Plus className="w-6 h-6 text-muted-foreground" />}
    title="No Schedule Created"
    description="This job has not been scheduled yet. Create a schedule to set the appointment time."
    actionLabel={onCreate ? "Create Schedule" : undefined}
    onAction={onCreate}
  />
);

export const NoDataEmptyState: React.FC<{ onRefresh?: () => void }> = ({ onRefresh }) => (
  <EmptyState
    icon={<Search className="w-6 h-6 text-muted-foreground" />}
    title="No Data Available"
    description="No operational data is available at the moment. This could be because there are no active jobs."
    actionLabel={onRefresh ? "Refresh Dashboard" : undefined}
    onAction={onRefresh}
  />
);