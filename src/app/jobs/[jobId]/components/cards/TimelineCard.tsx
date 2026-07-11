import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { EmptyState } from '@/components/common/StateViews';
import { TimelineEvent } from '@/features/fulfillment/types/timeline.types';
import { formatDate } from '@/lib/date-utils';
import { Activity, Clock } from 'lucide-react';

interface TimelineCardProps {
  timeline: TimelineEvent[] | null;
}

export default function TimelineCard({ timeline }: TimelineCardProps) {
  if (!timeline || timeline.length === 0) {
    return (
      <SectionCard title="Job Timeline">
        <EmptyState 
          title="No Events" 
          description="Timeline events will be recorded as the job progresses." 
          icon={<Activity />}
          className="min-h-[150px] py-4"
        />
      </SectionCard>
    );
  }

  // Sort by createdAt descending
  const sortedTimeline = [...timeline].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <SectionCard title="Job Timeline">
      <div className="space-y-6 mt-4 pl-2">
        {sortedTimeline.map((event, index) => (
          <div key={`${event.id || 'evt'}-${index}`} className="relative flex gap-6">
            {/* Connecting Line */}
            {index !== sortedTimeline.length - 1 && (
              <div className="absolute left-3.5 top-10 bottom-[-24px] w-0.5 bg-border" />
            )}
            
            {/* Timeline Icon */}
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0 ring-4 ring-background">
              <Clock className="w-4 h-4" />
            </div>
            
            {/* Event Details */}
            <div className="flex flex-col flex-1 pb-1">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-medium">{event.event}</h5>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {formatDate(new Date(event.createdAt), "dd MMM, hh:mm a")}
                </span>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
              )}
              {event.actorId && (
                <p className="text-xs text-muted-foreground mt-2 opacity-70">
                  By: {event.actorType || 'System'} ({event.actorId})
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
