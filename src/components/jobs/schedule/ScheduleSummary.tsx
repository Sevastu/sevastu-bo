import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Clock, Activity, CheckCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduleSummaryProps {
  schedule: any;
  assignment: any;
  isLoading: boolean;
}

export const ScheduleSummary: React.FC<ScheduleSummaryProps> = ({ schedule, assignment, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 w-16 bg-gray-200 rounded mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const scheduledStart = schedule?.scheduledStart ? new Date(schedule.scheduledStart) : null;
  const scheduledEnd = schedule?.scheduledEnd ? new Date(schedule.scheduledEnd) : null;

  const durationHours = scheduledStart && scheduledEnd 
    ? ((scheduledEnd.getTime() - scheduledStart.getTime()) / (1000 * 60 * 60)).toFixed(1)
    : '-';

  const scheduleText = scheduledStart ? format(scheduledStart, 'MMM dd, hh:mm a') : 'Not Scheduled';
  const workerName = assignment?.worker?.name || 'Unassigned';
  const status = schedule?.status || 'PENDING';
  const confirmation = schedule?.confirmationStatus || 'UNCONFIRMED';

  // Determine next action based on status
  let nextAction = 'Create Schedule';
  if (schedule?.id) {
    if (confirmation === 'UNCONFIRMED') nextAction = 'Confirm Schedule';
    else if (status === 'SCHEDULED') nextAction = 'Monitor Timeline';
    else if (status === 'IN_PROGRESS') nextAction = 'Track Progress';
    else nextAction = 'None';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Current Schedule</CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{scheduleText}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Worker</CardTitle>
          <User className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold truncate" title={workerName}>{workerName}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Duration</CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{durationHours !== '-' ? `${durationHours} hrs` : '-'}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Status</CardTitle>
          <Activity className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold capitalize">{status.replace(/_/g, ' ').toLowerCase()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Confirmation</CardTitle>
          <CheckCircle className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold capitalize">{confirmation.toLowerCase()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Next Action</CardTitle>
          <ArrowRight className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-blue-600">{nextAction}</div>
        </CardContent>
      </Card>
    </div>
  );
};
