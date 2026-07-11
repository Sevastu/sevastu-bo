import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

type ViewMode = 'day' | 'week' | 'agenda';

interface ScheduleCalendarProps {
  schedule: any;
  availability: any;
}

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ schedule, availability }) => {
  const [view, setView] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = (direction: 'prev' | 'next') => {
    const amount = view === 'week' ? 7 : 1;
    setCurrentDate(addDays(currentDate, direction === 'next' ? amount : -amount));
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  // Mock mapping of data to events for visualization
  const events: any[] = [];
  if (schedule?.scheduledStart && schedule?.scheduledEnd) {
    events.push({
      id: 'schedule-1',
      title: 'Current Job',
      start: new Date(schedule.scheduledStart),
      end: new Date(schedule.scheduledEnd),
      type: 'primary'
    });
  }
  
  if (availability?.blockedSlots) {
    availability.blockedSlots.forEach((slot: any, idx: number) => {
      events.push({
        id: `blocked-${idx}`,
        title: 'Blocked',
        start: new Date(slot.start),
        end: new Date(slot.end),
        type: 'blocked'
      });
    });
  }

  const renderWeekView = () => {
    const days = getWeekDays();
    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border">
        {days.map(day => (
          <div key={day.toISOString()} className="bg-white min-h-[400px]">
            <div className="p-2 border-b text-center">
              <div className="text-sm font-medium text-gray-500">{format(day, 'EEE')}</div>
              <div className={`text-lg ${isSameDay(day, new Date()) ? 'text-blue-600 font-bold' : ''}`}>
                {format(day, 'd')}
              </div>
            </div>
            <div className="p-1 space-y-1">
              {events
                .filter(e => isSameDay(e.start, day))
                .map(event => (
                  <div 
                    key={event.id}
                    className={`text-xs p-1.5 rounded truncate ${
                      event.type === 'primary' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      event.type === 'blocked' ? 'bg-red-50 text-red-700 border border-red-100' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="font-semibold">{format(event.start, 'HH:mm')}</div>
                    <div>{event.title}</div>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    return (
      <div className="bg-white rounded-lg border min-h-[400px] p-4">
        <h3 className="text-lg font-bold mb-4">{format(currentDate, 'EEEE, MMMM d, yyyy')}</h3>
        <div className="space-y-2">
          {events
            .filter(e => isSameDay(e.start, currentDate))
            .map(event => (
              <div key={event.id} className="flex p-3 rounded-lg border bg-slate-50">
                <div className="w-24 flex-shrink-0 font-medium text-gray-600">
                  {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                </div>
                <div className="font-semibold">{event.title}</div>
              </div>
          ))}
          {events.filter(e => isSameDay(e.start, currentDate)).length === 0 && (
            <div className="text-gray-500 text-center py-10">No events scheduled for this day.</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <CardTitle>Calendar</CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-md border bg-muted p-1">
            <Button variant={view === 'day' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('day')}>Day</Button>
            <Button variant={view === 'week' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('week')}>Week</Button>
            <Button variant={view === 'agenda' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('agenda')}>Agenda</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-32 text-center">
              {view === 'week' ? `${format(getWeekDays()[0], 'MMM d')} - ${format(getWeekDays()[6], 'MMM d')}` : format(currentDate, 'MMMM d')}
            </span>
            <Button variant="outline" size="icon" onClick={() => navigate('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 bg-slate-50/50">
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
        {view === 'agenda' && renderDayView()} {/* Fallback to day view for now */}
      </CardContent>
    </Card>
  );
};
