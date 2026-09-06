import React, { useState } from 'react';
import { Job, JobStatus } from '@/features/fulfillment/types/job.types';
import { Assignment } from '@/features/fulfillment/types/assignment.types';
import { Schedule } from '@/features/fulfillment/types/schedule.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, UserPlus, XCircle, RefreshCw, Archive, UserCog, CalendarClock, Sparkles } from 'lucide-react';
import { recommendationApi } from '@/features/fulfillment/repositories/recommendation.api';
import { jobsRepository } from '@/features/fulfillment/repositories/jobs.repository';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface QuickActionPanelProps {
  job: Job;
  assignment: Assignment | null;
  schedule: Schedule | null;
  onRefresh: () => void;
}

export default function QuickActionPanel({ job, assignment, schedule, onRefresh }: QuickActionPanelProps) {
  const [isMatching, setIsMatching] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const jobId = job._id || (job as any).id;

  const handleTriggerMatching = async () => {
    try {
      setIsMatching(true);
      await recommendationApi.generateRecommendations(jobId);
      onRefresh();
      scrollToRecommendations();
    } catch (error) {
      console.error('Failed to trigger matching:', error);
    } finally {
      setIsMatching(false);
    }
  };

  const scrollToRecommendations = () => {
    const el = document.getElementById('recommendations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleConfirmCancel = async () => {
    try {
      setIsCancelling(true);
      await jobsRepository.cancelJob(jobId);
      setIsCancelOpen(false);
      onRefresh();
    } catch (error) {
      console.error('Failed to cancel job:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <Card className="p-4 flex flex-wrap gap-3 items-center justify-between bg-muted/30 border-dashed">
        <div className="flex flex-wrap gap-2">
          {(job.status === JobStatus.CREATED || job.status === JobStatus.MATCHING || job.status === JobStatus.WAITING_FOR_WORKERS) && (
            <Button size="sm" onClick={handleTriggerMatching} disabled={isMatching}>
              <Sparkles className="w-4 h-4 mr-2" /> {isMatching ? 'Matching...' : 'Find Matching Workers'}
            </Button>
          )}
          
          {(job.status === JobStatus.WAITING_FOR_WORKERS || job.status === JobStatus.MATCHING || job.status === JobStatus.CREATED) && (
            <Button size="sm" variant="outline" onClick={scrollToRecommendations}>
              <UserPlus className="w-4 h-4 mr-2" /> Assign Worker Manually
            </Button>
          )}

          {(job.status === JobStatus.SCHEDULED || job.status === JobStatus.ASSIGNED) && (
            <Button size="sm" variant="outline" onClick={scrollToRecommendations}>
              <UserCog className="w-4 h-4 mr-2" /> Replace Worker
            </Button>
          )}

          {job.status !== JobStatus.CANCELLED && job.status !== JobStatus.COMPLETED && (
            <Button size="sm" variant="destructive" onClick={() => setIsCancelOpen(true)}>
              <XCircle className="w-4 h-4 mr-2" /> Cancel Job
            </Button>
          )}
        </div>

        <Button size="sm" variant="ghost" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </Card>

      <ConfirmDialog
        open={isCancelOpen}
        onOpenChange={setIsCancelOpen}
        title="Cancel Job"
        description="Are you sure you want to cancel this job? This will release any assigned worker and mark the job as cancelled."
        confirmLabel="Cancel Job"
        destructive={true}
        isProcessing={isCancelling}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
}
