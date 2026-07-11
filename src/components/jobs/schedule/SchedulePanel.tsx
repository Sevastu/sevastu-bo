"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ScheduleRepository } from "@/features/fulfillment/repositories/schedule.repository";
import { Schedule, ScheduleStatus } from "@/features/fulfillment/types/schedule.types";
import { Job } from "@/features/fulfillment/types/job.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle, RefreshCw, Plus, XCircle } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { scheduleStatusColors } from "@/lib/status-colors";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const scheduleRepository = new ScheduleRepository();

interface SchedulePanelProps {
  job: Job;
}

export const SchedulePanel: React.FC<SchedulePanelProps> = ({ job }) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'confirm' | 'cancel' | 'reschedule' | null;
  }>({ open: false, action: null });

  const loadSchedule = useCallback(async () => {
    if (!job._id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await scheduleRepository.getScheduleByJob(job._id);
      setSchedule(response.data);
    } catch (err) {
      // No schedule found is not an error
      setSchedule(null);
    } finally {
      setLoading(false);
    }
  }, [job._id]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  const handleAction = async (action: 'confirm' | 'cancel' | 'reschedule') => {
    if (!schedule) return;
    
    setProcessing(true);
    try {
      switch (action) {
        case 'confirm':
          await scheduleRepository.confirmSchedule(schedule.id);
          break;
        case 'cancel':
          await scheduleRepository.cancelSchedule(schedule.id);
          break;
        case 'reschedule':
          // For reschedule, we'd need a dialog to get new times
          // For now, we'll just show a placeholder
          break;
      }
      await loadSchedule();
    } catch (err) {
      setError(`Failed to ${action} schedule. Please try again.`);
    } finally {
      setProcessing(false);
      setConfirmDialog({ open: false, action: null });
    }
  };

  if (loading && !schedule) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 rounded-xl bg-muted/60 animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-4" onClick={loadSchedule}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!schedule) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-xl text-center">
            <p className="text-muted-foreground font-medium">No Schedule Created</p>
            <p className="text-xs text-muted-foreground mt-1">This job has not been scheduled yet.</p>
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
            <Calendar className="w-4 h-4" /> Schedule
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadSchedule}
            disabled={loading}
            className="h-8 w-8 p-0"
            aria-label="Refresh schedule"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Worker #{schedule.workerId?.slice(-4) || '-'}</span>
                <Badge className={cn("px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[8px] border shadow-none", scheduleStatusColors[schedule.status])}>
                  {schedule.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(new Date(schedule.scheduledStart), "dd MMM, hh:mm a")}
                </span>
                <span>→</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(new Date(schedule.scheduledEnd), "dd MMM, hh:mm a")}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2 border-t border-border">
            {schedule.status === ScheduleStatus.PENDING && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setConfirmDialog({ open: true, action: 'confirm' })}
                disabled={processing}
              >
                Confirm
              </Button>
            )}
            {schedule.status !== ScheduleStatus.CANCELLED && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setConfirmDialog({ open: true, action: 'cancel' })}
                disabled={processing}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={
          confirmDialog.action === 'confirm' ? "Confirm Schedule" :
          confirmDialog.action === 'cancel' ? "Cancel Schedule" :
          "Reschedule"
        }
        description={
          confirmDialog.action === 'confirm'
            ? "This will confirm the schedule. Are you sure you want to proceed?"
            : confirmDialog.action === 'cancel'
            ? "This will cancel the schedule. Are you sure you want to proceed?"
            : "This will reschedule the job. Are you sure you want to proceed?"
        }
        onConfirm={() => {
          if (confirmDialog.action) {
            handleAction(confirmDialog.action);
          }
        }}
        isProcessing={processing}
      />
    </Card>
  );
};