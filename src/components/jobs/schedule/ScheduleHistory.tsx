import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, CalendarClock, User, XCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduleHistoryProps {
  schedule: any;
  isLoading: boolean;
}

export const ScheduleHistory: React.FC<ScheduleHistoryProps> = ({ schedule, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Schedule History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const history = schedule?.history || [];

  const getHistoryIcon = (action: string) => {
    switch (action?.toUpperCase()) {
      case 'CREATED': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'RESCHEDULED': return <CalendarClock className="h-4 w-4 text-orange-500" />;
      case 'REPLACEMENT': return <User className="h-4 w-4 text-purple-500" />;
      case 'CANCELLED': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'CONFIRMED': return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      default: return <History className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-gray-500" />
          Schedule History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-sm text-gray-500 py-4 text-center">
            No history available for this schedule.
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 p-3 bg-slate-50 border rounded-lg text-sm">
                <div className="mt-0.5">
                  {getHistoryIcon(item.action)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900 capitalize">
                      {item.action?.toLowerCase().replace(/_/g, ' ')}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {item.timestamp ? format(new Date(item.timestamp), 'MMM d, HH:mm') : ''}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    {item.details || 'No details provided.'}
                  </div>
                  {item.actor && (
                    <div className="text-xs text-gray-400 mt-1">
                      By: {item.actor}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
