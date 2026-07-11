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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

interface RescheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: any;
  onReschedule: (payload: { scheduleId: string; scheduledStart: Date; scheduledEnd: Date }) => void;
  isRescheduling: boolean;
}

export const RescheduleDialog: React.FC<RescheduleDialogProps> = ({ 
  isOpen, 
  onClose, 
  schedule, 
  onReschedule,
  isRescheduling 
}) => {
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [reason, setReason] = useState('');

  // Initialize form with current schedule
  useEffect(() => {
    if (isOpen && schedule) {
      if (schedule.scheduledStart) {
        // Format to YYYY-MM-DDThh:mm for datetime-local input
        const d = new Date(schedule.scheduledStart);
        setStartDateTime(format(d, "yyyy-MM-dd'T'HH:mm"));
      }
      if (schedule.scheduledEnd) {
        const d = new Date(schedule.scheduledEnd);
        setEndDateTime(format(d, "yyyy-MM-dd'T'HH:mm"));
      }
      setReason('');
    }
  }, [isOpen, schedule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedule?.id || !startDateTime || !endDateTime) return;
    
    onReschedule({
      scheduleId: schedule.id,
      scheduledStart: new Date(startDateTime),
      scheduledEnd: new Date(endDateTime),
      // reason could be passed here if backend supports it
    });
    
    // onClose usually handled by onSuccess in mutation, but we can call it here if preferred. 
    // Typically better to leave it to the parent to close on success.
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Change the scheduled time for this job. This will trigger a notification to the assigned worker.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="start-time">Start Time</Label>
            <Input 
              id="start-time" 
              type="datetime-local" 
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end-time">End Time</Label>
            <Input 
              id="end-time" 
              type="datetime-local" 
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Rescheduling (Optional)</Label>
            <Textarea 
              id="reason" 
              placeholder="e.g. Customer requested a later time" 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isRescheduling}>
              Cancel
            </Button>
            <Button type="submit" disabled={isRescheduling || !startDateTime || !endDateTime}>
              {isRescheduling ? 'Saving...' : 'Confirm Reschedule'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
