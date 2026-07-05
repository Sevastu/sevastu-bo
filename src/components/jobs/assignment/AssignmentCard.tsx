"use client";

import React, { useState } from "react";
import { Assignment, AssignmentStatus } from "@/features/fulfillment/types/assignment.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { User, Check, Play, Pause, X } from "lucide-react";

interface AssignmentCardProps {
  assignment: Assignment;
  onAccept: (assignmentId: string) => void;
  onStart: (assignmentId: string) => void;
  onComplete: (assignmentId: string) => void;
  onCancel: (assignmentId: string) => void;
  isActionLoading?: boolean;
}

// Status color mapping
const statusColors: Record<AssignmentStatus, string> = {
  [AssignmentStatus.ASSIGNED]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [AssignmentStatus.ACCEPTED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [AssignmentStatus.IN_PROGRESS]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  [AssignmentStatus.COMPLETED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [AssignmentStatus.CANCELLED]: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Get available actions based on status
const getAvailableActions = (status: AssignmentStatus): { accept: boolean; start: boolean; complete: boolean; cancel: boolean } => {
  switch (status) {
    case AssignmentStatus.ASSIGNED:
      return { accept: true, start: false, complete: false, cancel: true };
    case AssignmentStatus.ACCEPTED:
      return { accept: false, start: true, complete: false, cancel: true };
    case AssignmentStatus.IN_PROGRESS:
      return { accept: false, start: false, complete: true, cancel: true };
    case AssignmentStatus.COMPLETED:
    case AssignmentStatus.CANCELLED:
    default:
      return { accept: false, start: false, complete: false, cancel: false };
  }
};

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onAccept,
  onStart,
  onComplete,
  onCancel,
  isActionLoading = false,
}) => {
  const {
    id,
    workerName,
    assignedBy,
    status,
    createdAt,
    updatedAt,
  } = assignment;

  const [showConfirm, setShowConfirm] = useState<'complete' | 'cancel' | null>(null);
  const actions = getAvailableActions(status);

  const handleAction = (action: 'accept' | 'start' | 'complete' | 'cancel') => {
    if (action === 'complete' || action === 'cancel') {
      setShowConfirm(action);
    } else if (action === 'accept') {
      onAccept(id);
    } else if (action === 'start') {
      onStart(id);
    }
  };

  const confirmAction = () => {
    if (showConfirm === 'complete') {
      onComplete(id);
    } else if (showConfirm === 'cancel') {
      onCancel(id);
    }
    setShowConfirm(null);
  };

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {/* Header with Worker Name and Status */}
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {workerName || "Unknown Worker"}
                </h4>
              </div>
              <Badge className={cn(
                "px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[8px] border shadow-none",
                statusColors[status]
              )}>
                {status}
              </Badge>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground uppercase tracking-widest">Assignment ID</p>
                <p className="font-mono text-sm font-bold mt-1">{id.slice(-8)}</p>
              </div>
              {assignedBy && (
                <div>
                  <p className="text-muted-foreground uppercase tracking-widest">Assigned By</p>
                  <p className="text-sm font-medium mt-1">{assignedBy}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground uppercase tracking-widest">Assigned At</p>
                <p className="text-sm font-medium mt-1">
                  {formatDate(new Date(createdAt), "dd MMM, hh:mm a")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-widest">Last Updated</p>
                <p className="text-sm font-medium mt-1">
                  {formatDate(new Date(updatedAt), "dd MMM, hh:mm a")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {actions.accept && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction('accept')}
                  disabled={isActionLoading}
                  className="gap-1"
                >
                  <Check className="w-3 h-3" />
                  Accept
                </Button>
              )}
              {actions.start && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction('start')}
                  disabled={isActionLoading}
                  className="gap-1"
                >
                  <Play className="w-3 h-3" />
                  Start
                </Button>
              )}
              {actions.complete && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction('complete')}
                  disabled={isActionLoading}
                  className="gap-1"
                >
                  <Check className="w-3 h-3" />
                  Complete
                </Button>
              )}
              {actions.cancel && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction('cancel')}
                  disabled={isActionLoading}
                  className="gap-1"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">
              Confirm {showConfirm === 'complete' ? 'Complete' : 'Cancel'} Assignment
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to {showConfirm === 'complete' ? 'complete' : 'cancel'} this assignment?
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirm(null)}
                disabled={isActionLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmAction}
                disabled={isActionLoading}
              >
                {isActionLoading ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};