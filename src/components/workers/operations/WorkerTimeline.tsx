import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Briefcase, CalendarOff, AlertTriangle, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';

interface WorkerTimelineProps {
  timelineData?: any[];
  isLoading: boolean;
}

export const WorkerTimeline: React.FC<WorkerTimelineProps> = ({ timelineData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="flex-1 h-12 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mock timeline events for demonstration if backend timeline not fully implemented
  const events = timelineData || [
    { type: 'SHIFT_START', time: new Date().setHours(9, 0, 0), title: 'Shift Started', details: 'Clocked in from app' },
    { type: 'JOB', time: new Date().setHours(10, 0, 0), title: 'Plumbing Repair', details: 'Job #1024 - 123 Main St', duration: '2h' },
    { type: 'BREAK', time: new Date().setHours(12, 0, 0), title: 'Lunch Break', details: 'Scheduled break', duration: '1h' },
    { type: 'BLOCKED', time: new Date().setHours(13, 30, 0), title: 'Blocked Slot', details: 'Training session', duration: '1h 30m' },
    { type: 'JOB_UPCOMING', time: new Date().setHours(15, 30, 0), title: 'Pipe Installation', details: 'Job #1028 - 456 Elm St', duration: '3h' },
    { type: 'SHIFT_END', time: new Date().setHours(18, 30, 0), title: 'Shift End', details: 'Scheduled clock out' },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'SHIFT_START':
      case 'SHIFT_END':
        return <PlayCircle className="w-4 h-4 text-green-500" />;
      case 'JOB':
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'JOB_UPCOMING':
        return <Clock className="w-4 h-4 text-indigo-500" />;
      case 'BREAK':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'BLOCKED':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'LEAVE':
        return <CalendarOff className="w-4 h-4 text-gray-500" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-300" />;
    }
  };

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'JOB': return 'border-blue-200 bg-blue-50';
      case 'JOB_UPCOMING': return 'border-indigo-200 bg-indigo-50 border-dashed';
      case 'BREAK': return 'border-yellow-200 bg-yellow-50';
      case 'BLOCKED': return 'border-red-200 bg-red-50';
      default: return 'border-gray-100 bg-white';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          Today's Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2">
        <div className="relative border-l-2 border-gray-100 ml-4 space-y-6 pb-4">
          {events.map((event, index) => (
            <div key={index} className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1 bg-white p-0.5 rounded-full border shadow-sm">
                {getEventIcon(event.type)}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
                <div className="sm:w-16 pt-0.5 shrink-0 text-xs font-bold text-gray-500">
                  {format(new Date(event.time), 'HH:mm')}
                </div>
                
                <div className={`flex-1 p-3 rounded-lg border ${getEventStyle(event.type)}`}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm text-gray-900">{event.title}</h4>
                    {event.duration && (
                      <span className="text-xs font-medium text-gray-500 bg-white/60 px-1.5 py-0.5 rounded">
                        {event.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{event.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
