"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AssignmentApi } from "@/features/fulfillment/api/assignment.api";
import { Assignment, AssignmentStatus } from "@/features/fulfillment/types/assignment.types";
import { Job } from "@/features/fulfillment/types/job.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, Plus } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { assignmentStatusColors } from "@/lib/status-colors";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const assignmentApi = new AssignmentApi();

interface AssignmentPanelProps {
  job: Job;
}

export const AssignmentPanel: React.FC<AssignmentPanelProps> = ({ job }) => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'accept' | 'start' | 'complete' | 'cancel' | null;
  }>({ open: false, action: null });

  const loadAssignment = useCallback(async () => {
    if (!job.currentAssignmentId) {
      setAssignment(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      // Since there's no getAssignment endpoint, we'll use the job's assignment data
      // In a real implementation, this would call the API
      setAssignment({
        id: job.currentAssignmentId,
        jobId: job.id,
        workerId: job.currentAssignmentId,
        workerName: job.assignedWorkerName,
        status: (job.assignmentStatus as AssignmentStatus) || AssignmentStatus.ASSIGNED,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      });
    } catch (err) {
      setError("Failed to load assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [job]);

  useEffect(() => {
    loadAssignment();
  }, [loadAssignment]);

  const handleAction = async (action: 'accept' | 'start' | 'complete' | 'cancel') => {
    if (!assignment) return;
    
    setProcessing(true);
    try {
      switch (action) {
        case 'accept':
          await assignmentApi.acceptAssignment(assignment.id);
          break;
        case 'start':
          await assignmentApi.startAssignment(assignment.id);
          break;
        case 'complete':
          await assignmentApi.completeAssignment(assignment.id);
          break;
        case 'cancel':
          await assignmentApi.cancelAssignment(assignment.id);
          break;
      }
      await loadAssignment();
    } catch (err) {
      setError(`Failed to ${action} assignment. Please try again.`);
    } finally {
      setProcessing(false);
      setConfirmDialog({ open: false, action: null });
    }
  };

  if (loading && !assignment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-4 h-4" /> Assignment
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
            <User className="w-4 h-4" /> Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-4" onClick={loadAssignment}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!assignment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-4 h-4" /> Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-xl text-center">
            <p className="text-muted-foreground font-medium">No Assignment Found</p>
            <p className="text-xs text-muted-foreground mt-1">This job has not been assigned to a worker yet.</p>
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
            <User className="w-4 h-4" /> Assignment
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadAssignment}
            disabled={loading}
            className="h-8 w-8 p-0"
            aria-label="Refresh assignment"
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
                <span className="font-medium text-sm">Worker #{assignment.workerId?.slice(-4) || '-'}</span>
                <Badge className={cn("px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[8px] border shadow-none", assignmentStatusColors[assignment.status])}>
                  {assignment.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(new Date(assignment.createdAt), "dd MMM, hh:mm a")}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2 border-t border-border">
            {assignment.status === AssignmentStatus.ASSIGNED && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setConfirmDialog({ open: true, action: 'accept' })}
                disabled={processing}
              >
                Accept
              </Button>
            )}
            {assignment.status === AssignmentStatus.ACCEPTED && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setConfirmDialog({ open: true, action: 'start' })}
                disabled={processing}
              >
                Start
              </Button>
            )}
            {assignment.status === AssignmentStatus.IN_PROGRESS && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setConfirmDialog({ open: true, action: 'complete' })}
                disabled={processing}
              >
                Complete
              </Button>
            )}
            {assignment.status !== AssignmentStatus.CANCELLED && assignment.status !== AssignmentStatus.COMPLETED && (
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
          confirmDialog.action === 'accept' ? "Accept Assignment" :
          confirmDialog.action === 'start' ? "Start Assignment" :
          confirmDialog.action === 'complete' ? "Complete Assignment" :
          "Cancel Assignment"
        }
        description={
          confirmDialog.action === 'accept'
            ? "This will accept the worker assignment. Are you sure you want to proceed?"
            : confirmDialog.action === 'start'
            ? "This will mark the assignment as in progress. Are you sure you want to proceed?"
            : confirmDialog.action === 'complete'
            ? "This will mark the assignment as completed. Are you sure you want to proceed?"
            : "This will cancel the assignment. Are you sure you want to proceed?"
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