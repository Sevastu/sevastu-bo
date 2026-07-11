import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface RelatedPanelsProps {
  assignment: any;
  schedule: any;
  job: any;
  isLoading: boolean;
}

export const RelatedPanels: React.FC<RelatedPanelsProps> = ({ assignment, schedule, job, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2].map(i => (
          <Card key={i}>
            <CardContent className="p-4 h-24 bg-gray-100 rounded"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Worker Summary Panel */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Worker
            </h4>
            {assignment?.worker ? (
              <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">Assigned</Badge>
            ) : (
              <Badge variant="outline" className="text-[10px] bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
            )}
          </div>

          {assignment?.worker ? (
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                {assignment.worker.name?.charAt(0) || 'W'}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-semibold text-gray-900 truncate">{assignment.worker.name}</div>
                <div className="text-xs text-gray-500 truncate">{assignment.worker.phone || 'Contact pending'}</div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic">No worker assigned to this job yet.</div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Summary Panel */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Schedule
            </h4>
            {schedule?.scheduledStart ? (
              <Badge variant="outline" className="text-[10px] bg-purple-50 text-purple-700 border-purple-200">Scheduled</Badge>
            ) : (
              <Badge variant="outline" className="text-[10px] bg-gray-50 text-gray-700 border-gray-200">Unscheduled</Badge>
            )}
          </div>

          {schedule?.scheduledStart ? (
            <div className="bg-slate-50 p-3 rounded-lg border space-y-1.5">
              <div className="text-sm font-semibold text-gray-900">
                {format(new Date(schedule.scheduledStart), 'EEEE, MMM d, yyyy')}
              </div>
              <div className="flex items-center text-xs text-gray-600 font-medium">
                <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                {format(new Date(schedule.scheduledStart), 'HH:mm')}
                {schedule.scheduledEnd ? ` - ${format(new Date(schedule.scheduledEnd), 'HH:mm')}` : ''}
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic">Job has not been scheduled yet.</div>
          )}
        </CardContent>
      </Card>

      {/* Customer Summary Panel */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> Customer
          </h4>
          <div className="bg-slate-50 p-3 rounded-lg border">
            <div className="text-sm font-semibold text-gray-900">{job?.customer?.name || 'Customer Name'}</div>
            {job?.location && (
              <div className="flex items-start gap-1 mt-1.5 text-xs text-gray-600">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
                <span className="line-clamp-2">{job.location.address || 'Address pending'}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

// Internal icon import since it wasn't at the top
import { Clock } from 'lucide-react';
