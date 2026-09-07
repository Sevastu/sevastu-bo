import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { EmptyState } from '@/components/common/StateViews';
import { TimelineEvent } from '@/features/fulfillment/types/timeline.types';
import { formatDate } from '@/lib/date-utils';
import { Activity, Clock, User, Bot } from 'lucide-react';

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

  const getActorIcon = (actorType?: string) => {
    switch (actorType?.toLowerCase()) {
      case 'system':
      case 'bot':
        return Bot;
      case 'user':
      case 'admin':
      case 'worker':
      case 'customer':
        return User;
      default:
        return Activity;
    }
  };

  return (
    <SectionCard title="Job Timeline">
      <div className="space-y-5 mt-4 pl-2">
        {sortedTimeline.map((event, index) => {
          const ActorIcon = getActorIcon(event.actorType);
          const isLast = index === sortedTimeline.length - 1;
          
          return (
            <div key={`${event.id || 'evt'}-${index}`} className="relative flex gap-4 group">
              {/* Connecting Line */}
              {!isLast && (
                <div className="absolute left-3.5 top-10 bottom-[-20px] w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
              
              {/* Timeline Icon */}
              <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary shrink-0 ring-4 ring-background border border-primary/20 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              
              {/* Event Details */}
              <div className="flex flex-col flex-1 pb-1 group-hover:bg-muted/30 rounded-lg p-2 -ml-2 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <h5 className="text-sm font-semibold text-foreground">{event.event}</h5>
                  <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                    {formatDate(new Date(event.createdAt), "dd MMM, hh:mm a")}
                  </span>
                </div>
                {event.description && (
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{event.description}</p>
                )}
                {event.actorId && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <ActorIcon className="w-3 h-3" />
                    <span className="font-medium">
                      {event.actorType || 'System'}
                    </span>
                    <span className="opacity-50">•</span>
                    <span className="font-mono opacity-70">{event.actorId.slice(-6)}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
