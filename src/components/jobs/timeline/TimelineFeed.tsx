import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Calendar, 
  User, 
  AlertCircle, 
  Bell, 
  ArrowRight,
  History
} from 'lucide-react';
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

interface TimelineFeedProps {
  events: any[];
  isLoading: boolean;
}

export const TimelineFeed: React.FC<TimelineFeedProps> = ({ events, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-16 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 flex flex-col items-center justify-center text-gray-500">
          <History className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-lg font-medium">No Timeline Events</p>
          <p className="text-sm">Events will appear here as the workflow progresses.</p>
        </CardContent>
      </Card>
    );
  }

  // Grouping Logic
  const groupedEvents = events.reduce((acc: any, event: any) => {
    const date = new Date(event.createdAt || event.time);
    let group = 'Earlier';
    if (isToday(date)) group = 'Today';
    else if (isYesterday(date)) group = 'Yesterday';
    else if (differenceInDays(new Date(), date) <= 7) group = 'Last Week';

    if (!acc[group]) acc[group] = [];
    acc[group].push(event);
    return acc;
  }, {});

  const groupOrder = ['Today', 'Yesterday', 'Last Week', 'Earlier'];

  const getEventIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case 'JOB': return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'ASSIGNMENT': return <User className="w-4 h-4 text-indigo-600" />;
      case 'SCHEDULE': return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'NOTIFICATION': return <Bell className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type?.toUpperCase()) {
      case 'JOB': return 'bg-blue-50 border-blue-100';
      case 'ASSIGNMENT': return 'bg-indigo-50 border-indigo-100';
      case 'SCHEDULE': return 'bg-purple-50 border-purple-100';
      case 'NOTIFICATION': return 'bg-yellow-50 border-yellow-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {groupOrder.map(group => {
        const groupEvents = groupedEvents[group];
        if (!groupEvents || groupEvents.length === 0) return null;

        // Sort newest first
        groupEvents.sort((a: any, b: any) => new Date(b.createdAt || b.time).getTime() - new Date(a.createdAt || a.time).getTime());

        return (
          <div key={group} className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider sticky top-0 bg-slate-50 py-2 z-10 border-b border-gray-200">
              {group}
            </h3>
            
            <div className="space-y-4 pl-2">
              {groupEvents.map((event: any, idx: number) => {
                const date = new Date(event.createdAt || event.time);
                return (
                  <div key={event.id || idx} className="flex gap-4 group/event">
                    
                    {/* Left Timeline Line & Icon */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm ${getEventBg(event.type)} z-10 bg-white`}>
                        {getEventIcon(event.type)}
                      </div>
                      {/* Only draw line if not the last item in this group */}
                      {idx !== groupEvents.length - 1 && (
                        <div className="w-px h-full bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{event.action}</span>
                          {event.status && (
                            <Badge variant="outline" className="text-[10px] h-5">{event.status}</Badge>
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                          {format(date, 'HH:mm')}
                        </span>
                      </div>
                      
                      <div className="bg-white border rounded-lg p-3 shadow-sm mt-2 hover:shadow transition-shadow">
                        <p className="text-sm text-gray-700">{event.description || event.message}</p>
                        
                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 font-medium">
                          {event.user && <span>By: {event.user}</span>}
                          {event.entityId && <span>ID: {event.entityId.substring(0,8)}</span>}
                        </div>

                        {/* Premium Feature 6: Event Diff View */}
                        {event.diff && event.diff.length > 0 && (
                          <div className="mt-3 bg-slate-50 rounded border p-2 space-y-1.5">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Changes</div>
                            {event.diff.map((diffItem: any, dIdx: number) => (
                              <div key={dIdx} className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-gray-500 w-16">{diffItem.field}:</span>
                                <span className="text-red-500 bg-red-50 px-1 rounded line-through">{diffItem.before}</span>
                                <ArrowRight className="w-3 h-3 text-gray-400" />
                                <span className="text-green-600 bg-green-50 px-1 rounded">{diffItem.after}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
