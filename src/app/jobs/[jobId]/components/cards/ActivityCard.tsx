import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimelineEvent } from '@/features/fulfillment/types/timeline.types';
import { formatDate } from '@/lib/date-utils';
import { Activity } from 'lucide-react';

interface ActivityCardProps {
  timeline: TimelineEvent[] | null;
}

export default function ActivityCard({ timeline }: ActivityCardProps) {
  if (!timeline || timeline.length === 0) {
    return null; // Hidden if no activity
  }

  // Take the most recent 3 events
  const recentEvents = [...timeline]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Activity className="w-4 h-4" /> Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 pt-2">
          {recentEvents.map((event, index) => (
            <div key={`${event.id || 'evt'}-${index}`} className="text-sm">
              <p className="font-medium text-foreground/90">{event.event}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground line-clamp-1">{event.description || 'Status changed'}</span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                  {formatDate(new Date(event.createdAt), "dd MMM, hh:mm a")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
