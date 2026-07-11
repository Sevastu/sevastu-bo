import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { workerAvailabilityRepository } from '@/features/fulfillment/repositories/worker-availability.repository';
import { WorkerAvailabilityProfile } from '@/features/fulfillment/types/worker-availability.types';
import { Badge } from '@/components/ui/badge';
import { User, Star, Clock } from 'lucide-react';

interface ReplacementWorkerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: any;
  currentAssignment: any;
  onReplace: (payload: { scheduleId: string; replacementWorkerId: string; reason?: string }) => void;
  isReplacing: boolean;
  jobId: string;
}

export const ReplacementWorkerDialog: React.FC<ReplacementWorkerDialogProps> = ({ 
  isOpen, 
  onClose, 
  schedule, 
  currentAssignment,
  onReplace,
  isReplacing,
  jobId
}) => {
  const [replacementWorkerId, setReplacementWorkerId] = useState('');
  const [reason, setReason] = useState('');
  const [availableWorkers, setAvailableWorkers] = useState<WorkerAvailabilityProfile[]>([]);
  const [isLoadingWorkers, setIsLoadingWorkers] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setReplacementWorkerId('');
      setReason('');
      fetchWorkers();
    }
  }, [isOpen, jobId]);

  const fetchWorkers = async () => {
    setIsLoadingWorkers(true);
    try {
      const res = await workerAvailabilityRepository.getAvailableWorkersForJob(jobId);
      if (res.success && res.data) {
        setAvailableWorkers(res.data);
      }
    } catch (e) {
      console.error('Failed to fetch replacement workers', e);
    } finally {
      setIsLoadingWorkers(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedule?.id || !replacementWorkerId) return;
    
    onReplace({
      scheduleId: schedule.id,
      replacementWorkerId,
      reason
    });
  };

  const selectedWorker = availableWorkers.find(w => w.id === replacementWorkerId);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Replace Worker</DialogTitle>
          <DialogDescription>
            Assign a different worker to this schedule. The current worker will be unassigned.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="bg-slate-50 p-3 rounded-lg border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <User className="h-4 w-4 text-indigo-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Current Worker</p>
                <p className="text-sm font-semibold text-gray-900">
                  {currentAssignment?.worker?.name || 'No worker currently assigned'}
                </p>
              </div>
            </div>
            {currentAssignment?.worker && (
              <Badge variant="outline" className="text-xs text-red-600 bg-red-50 border-red-200">
                Will be unassigned
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label>Select Replacement Worker</Label>
            <Select 
              value={replacementWorkerId} 
              onValueChange={setReplacementWorkerId}
            >
              <SelectTrigger disabled={isLoadingWorkers}>
                <SelectValue placeholder={isLoadingWorkers ? "Loading workers..." : "Select a worker"} />
              </SelectTrigger>
              <SelectContent>
                {availableWorkers.map((worker) => (
                  <SelectItem 
                    key={worker.id} 
                    value={worker.id} 
                    data-disabled={worker.status !== 'AVAILABLE' ? true : undefined}
                    onClick={(e) => {
                      if (worker.status !== 'AVAILABLE') {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{worker.name}</span>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-xs text-yellow-600 flex items-center"><Star className="h-3 w-3 mr-1 fill-current"/>{worker.rating}</span>
                        {worker.status === 'AVAILABLE' ? (
                           <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px] h-5">Available</Badge>
                        ) : (
                           <Badge variant="outline" className="text-[10px] h-5">{worker.status}</Badge>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedWorker && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm space-y-2">
              <div className="flex justify-between items-center text-blue-900">
                <span className="font-semibold">Match Score: {selectedWorker.recommendationScore}%</span>
                <span className="flex items-center gap-1 text-blue-700"><Clock className="h-4 w-4"/> {selectedWorker.distance} away</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Replacement (Optional)</Label>
            <Textarea 
              id="reason" 
              placeholder="e.g. Current worker is running late" 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isReplacing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isReplacing || !replacementWorkerId}>
              {isReplacing ? 'Replacing...' : 'Confirm Replacement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
