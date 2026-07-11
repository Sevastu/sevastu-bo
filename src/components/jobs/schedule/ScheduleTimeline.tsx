import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, ArrowRight, UserPlus, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduleTimelineProps {
  timeline: any;
  isLoading: boolean;
}

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({ timeline, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Schedule Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback to empty if no timeline data
  const events = timeline?.events || [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'CREATED': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'CONFIRMED': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'UPDATED': return <ArrowRight className="h-4 w-4 text-orange-500" />;
      case 'WORKER_ASSIGNED': return <UserPlus className="h-4 w-4 text-purple-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          Schedule Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No timeline events recorded yet.
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:ml-6 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {events.map((event: any, index: number) => (
              <div key={event.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-0 md:ml-0 z-10">
                  {getIcon(event.type)}
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded border border-slate-200 bg-white shadow-sm ml-4 md:ml-0 md:group-even:text-right">
                  <div className="flex items-center justify-between md:group-even:flex-row-reverse mb-1 text-sm font-bold text-slate-800">
                    <span>{event.title}</span>
                    <time className="font-caveat font-medium text-blue-500">
                      {event.timestamp ? format(new Date(event.timestamp), 'MMM d, HH:mm') : ''}
                    </time>
                  </div>
                  <div className="text-slate-500 text-sm">
                    {event.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
