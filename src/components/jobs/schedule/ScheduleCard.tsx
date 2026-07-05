"use client";

import React, { useState } from "react";
import { Schedule, ScheduleStatus } from "@/features/fulfillment/types/schedule.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { Calendar, Check, X, RefreshCw } from "lucide-react";

interface ScheduleCardProps {
  schedule: Schedule;
  onConfirm: (scheduleId: string) => void;
  onReschedule: (scheduleId: string, payload: { scheduledStart: string; scheduledEnd: string }) => void;
  onCancel: (scheduleId: string) => void;
  isActionLoading?: boolean;
}

// Status color mapping
const statusColors: Record<ScheduleStatus, string> = {
  [ScheduleStatus.PENDING]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [ScheduleStatus.CONFIRMED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [ScheduleStatus.RESCHEDULED]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  [ScheduleStatus.CANCELLED]: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Get available actions based on status
const getAvailableActions = (status: ScheduleStatus): { confirm: boolean; reschedule: boolean; cancel: boolean } => {
  switch (status) {
    case ScheduleStatus.PENDING:
      return { confirm: true, reschedule: true, cancel: true };
    case ScheduleStatus.CONFIRMED:
      return { confirm: false, reschedule: true, cancel: true };
    case ScheduleStatus.RESCHEDULED:
      return { confirm: false, reschedule: true, cancel: true };
    case ScheduleStatus.CANCELLED:
    default:
      return { confirm: false, reschedule: false, cancel: false };
  }
};

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  onConfirm,
  onReschedule,
  onCancel,
  isActionLoading = false,
}) => {
  const {
    id,
    scheduledStart,
    scheduledEnd,
    status,
    confirmedAt,
    cancelledAt,
    createdAt,
    updatedAt,
  } = schedule;

  const [showConfirm, setShowConfirm] = useState<'reschedule' | 'cancel' | null>(null);
  const actions = getAvailableActions(status);

  const handleAction = (action: 'confirm' | 'reschedule' | 'cancel') => {
    if (action === 'confirm') {
      onConfirm(id);
    } else if (action === 'reschedule') {
      setShowConfirm('reschedule');
    } else if (action === 'cancel') {
      setShowConfirm('cancel');
    }
  };

  const confirmAction = () => {
    if (showConfirm === 'reschedule') {
      // For now, use the existing dates as placeholder
      onReschedule(id, { scheduledStart, scheduledEnd });
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
            {/* Header with Status */}
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule
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
                <p className="text-muted-foreground uppercase tracking-widest">Scheduled Start</p>
                <p className="text-sm font-medium mt-1">
                  {formatDate(new Date(scheduledStart), "dd MMM, hh:mm a")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-widest">Scheduled End</p>
                <p className="text-sm font-medium mt-1">
                  {formatDate(new Date(scheduledEnd), "dd MMM, hh:mm a")}
                </p>
              </div>
              {confirmedAt && (
                <div>
                  <p className="text-muted-foreground uppercase tracking-widest">Confirmed At</p>
                  <p className="text-sm font-medium mt-1">
                    {formatDate(new Date(confirmedAt), "dd MMM, hh:mm a")}
                  </p>
                </div>
              )}
              {cancelledAt && (
                <div>
                  <p className="text-muted-foreground uppercase tracking-widest">Cancelled At</p>
                  <p className="text-sm font-medium mt-1">
                    {formatDate(new Date(cancelledAt), "dd MMM, hh:mm a")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground uppercase tracking-widest">Created At</p>
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
              {actions.confirm && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction('confirm')}
                  disabled={isActionLoading}
                  className="gap-1"
                >
                  <Check className="w-3 h-3" />
                  Confirm
                </Button>
              )}
              {actions.reschedule && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction('reschedule')}
                  disabled={isActionLoading}
                  className="gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reschedule
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
              Confirm {showConfirm === 'reschedule' ? 'Reschedule' : 'Cancel'} Schedule
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to {showConfirm === 'reschedule' ? 'reschedule' : 'cancel'} this schedule?
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