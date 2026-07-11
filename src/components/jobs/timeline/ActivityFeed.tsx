import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  events: any[];
  isLoading: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ events, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort newest first, take top 10
  const recentEvents = [...(events || [])]
    .sort((a, b) => new Date(b.createdAt || b.time).getTime() - new Date(a.createdAt || a.time).getTime())
    .slice(0, 10);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="w-4 h-4 text-indigo-500" />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        {recentEvents.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No recent activity.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentEvents.map((event, idx) => {
              const time = new Date(event.createdAt || event.time);
              return (
                <div key={event.id || idx} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-gray-900">{event.action}</span>
                    <span className="text-xs text-gray-400 flex items-center whitespace-nowrap ml-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(time, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description || event.message}</p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
