import React, { memo } from 'react';
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';
import { TimelineEvent } from '../utils/timelineHelpers';

interface TimelineItemProps {
    event: TimelineEvent;
    isLast: boolean;
}

export const TimelineItem = memo(function TimelineItem({ event, isLast }: TimelineItemProps) {
    
    const renderIcon = () => {
        switch (event.status) {
            case 'completed': return <CheckCircle className="w-5 h-5 text-success bg-card" />;
            case 'current': return <Clock className="w-5 h-5 text-primary bg-card" />;
            case 'failed': return <AlertCircle className="w-5 h-5 text-destructive bg-card" />;
            case 'pending': return <Circle className="w-5 h-5 text-muted-foreground bg-card" />;
        }
    };

    return (
        <div className="relative flex gap-4">
            {!isLast && (
                <div className="absolute left-2.5 top-6 bottom-[-1rem] w-px bg-border" />
            )}
            <div className="relative z-10 shrink-0 mt-1">
                {renderIcon()}
            </div>
            <div className="pb-6">
                <h4 className={`text-sm font-bold ${event.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {event.title}
                </h4>
                <p className={`text-sm mt-0.5 ${event.status === 'pending' ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                    {event.description}
                </p>
                <div className="text-xs font-mono text-muted-foreground mt-1">
                    {event.date}
                </div>
            </div>
        </div>
    );
});
