import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CalendarClock, ArrowUpRight } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';
import { Button } from '@/components/ui/button';

interface SchedulesCardProps {
  jobsData: any[]; // Using jobs data as proxy for schedules since it contains scheduledStart
  isLoading: boolean;
}

export const SchedulesCard: React.FC<SchedulesCardProps> = ({ jobsData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-200 rounded"></div>)}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter jobs that have a schedule and sort them
  const schedules = (jobsData || [])
    .filter(job => job.scheduledStart)
    .sort((a, b) => new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime())
    .slice(0, 5);

  const getDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'EEE, MMM d');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarClock className="w-4 h-4 text-gray-500" />
          Upcoming Schedule
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
          Full Calendar <ArrowUpRight className="w-3 h-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        {schedules.length === 0 ? (
          <div className="text-sm text-gray-500 py-6 text-center bg-slate-50 rounded border border-dashed">
            No upcoming schedules found.
          </div>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule: any, idx: number) => {
              const start = new Date(schedule.scheduledStart);
              const end = schedule.scheduledEnd ? new Date(schedule.scheduledEnd) : null;
              
              return (
                <div 
                  key={schedule.id || idx} 
                  className="flex items-center p-3 rounded-lg border bg-white hover:border-indigo-200 transition-colors gap-4 group"
                >
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-indigo-50 rounded-lg border border-indigo-100 shrink-0">
                    <span className="text-xs font-bold text-indigo-600 uppercase">
                      {format(start, 'MMM')}
                    </span>
                    <span className="text-lg font-black text-indigo-900 leading-none">
                      {format(start, 'd')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">
                        {getDateLabel(schedule.scheduledStart)}
                      </span>
                      <span className="text-xs text-gray-500 font-medium flex items-center">
                        <Calendar className="w-3 h-3 mr-1 inline" />
                        {format(start, 'HH:mm')} {end ? `- ${format(end, 'HH:mm')}` : ''}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {schedule.title || `Job #${schedule.id.substring(0, 8)}`}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
