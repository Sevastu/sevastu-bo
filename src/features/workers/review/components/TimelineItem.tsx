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
            case 'completed': return <CheckCircle className="w-5 h-5 text-emerald-500 bg-white" />;
            case 'current': return <Clock className="w-5 h-5 text-blue-500 bg-white" />;
            case 'failed': return <AlertCircle className="w-5 h-5 text-rose-500 bg-white" />;
            case 'pending': return <Circle className="w-5 h-5 text-slate-300 bg-white" />;
        }
    };

    return (
        <div className="relative flex gap-4">
            {!isLast && (
                <div className="absolute left-2.5 top-6 bottom-[-1rem] w-px bg-slate-200" />
            )}
            <div className="relative z-10 shrink-0 mt-1">
                {renderIcon()}
            </div>
            <div className="pb-6">
                <h4 className={`text-sm font-bold ${event.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>
                    {event.title}
                </h4>
                <p className={`text-sm mt-0.5 ${event.status === 'pending' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {event.description}
                </p>
                <div className="text-xs font-mono text-slate-400 mt-1">
                    {event.date}
                </div>
            </div>
        </div>
    );
});
