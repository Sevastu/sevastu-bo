import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarPlus, CheckCircle, CalendarClock, UserMinus, XCircle } from 'lucide-react';

interface ScheduleActionsProps {
  schedule: any;
  assignment: any;
  isLoading: boolean;
  onOpenReschedule: () => void;
  onOpenReplace: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirming: boolean;
  isCancelling: boolean;
}

export const ScheduleActions: React.FC<ScheduleActionsProps> = ({ 
  schedule, 
  assignment, 
  isLoading,
  onOpenReschedule,
  onOpenReplace,
  onConfirm,
  onCancel,
  isConfirming,
  isCancelling
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasSchedule = !!schedule?.id;
  const isConfirmed = schedule?.confirmationStatus === 'CONFIRMED';
  const isCancelled = schedule?.status === 'CANCELLED';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {!hasSchedule && (
            <Button className="w-full justify-start" onClick={onOpenReschedule}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create Schedule
            </Button>
          )}

          {hasSchedule && !isConfirmed && !isCancelled && (
            <Button 
              className="w-full justify-start bg-green-600 hover:bg-green-700" 
              onClick={onConfirm}
              disabled={isConfirming}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {isConfirming ? 'Confirming...' : 'Confirm Schedule'}
            </Button>
          )}

          {hasSchedule && !isCancelled && (
            <Button 
              variant="outline" 
              className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50" 
              onClick={onOpenReschedule}
            >
              <CalendarClock className="mr-2 h-4 w-4" />
              Reschedule
            </Button>
          )}

          {hasSchedule && assignment?.worker && !isCancelled && (
            <Button 
              variant="outline" 
              className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50" 
              onClick={onOpenReplace}
            >
              <UserMinus className="mr-2 h-4 w-4" />
              Replace Worker
            </Button>
          )}

          {hasSchedule && !isCancelled && (
            <Button 
              variant="outline" 
              className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800" 
              onClick={onCancel}
              disabled={isCancelling}
            >
              <XCircle className="mr-2 h-4 w-4" />
              {isCancelling ? 'Cancelling...' : 'Cancel Schedule'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
