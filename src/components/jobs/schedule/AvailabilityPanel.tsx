import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CalendarOff, Briefcase, UserCheck, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AvailabilityPanelProps {
  availability: any;
  isLoading: boolean;
}

export const AvailabilityPanel: React.FC<AvailabilityPanelProps> = ({ availability, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Worker Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!availability) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-gray-500" />
            Worker Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            No worker assigned or availability data not found.
          </div>
        </CardContent>
      </Card>
    );
  }

  const { status, workingHours, blockedSlots, leave, nextAvailableSlot } = availability;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
      case 'BUSY': return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Busy</Badge>;
      case 'ON_LEAVE': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">On Leave</Badge>;
      case 'BLOCKED': return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Blocked</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-gray-500" />
          Worker Availability
        </CardTitle>
        {getStatusBadge(status)}
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        
        {/* Next Available Slot */}
        {nextAvailableSlot && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-blue-900">Next Available Slot:</span>
            </div>
            <div className="text-blue-800 font-bold">
              {nextAvailableSlot.label} at {nextAvailableSlot.time}
            </div>
          </div>
        )}

        {/* Working Hours */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Working Hours
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {workingHours?.map((wh: any, idx: number) => (
              <div key={idx} className="bg-slate-50 border rounded p-2 text-center text-sm">
                <div className="font-medium text-gray-700">{wh.day}</div>
                <div className="text-gray-500">{wh.start} - {wh.end}</div>
              </div>
            )) || <div className="text-sm text-gray-500 col-span-full">Standard working hours apply.</div>}
          </div>
        </div>

        {/* Exceptions (Leave & Blocked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
              <CalendarOff className="h-4 w-4" /> Upcoming Leave
            </h4>
            {leave?.length > 0 ? (
              <div className="space-y-2">
                {leave.map((l: any, idx: number) => (
                  <div key={idx} className="flex justify-between bg-red-50 border border-red-100 rounded p-2 text-sm text-red-800">
                    <span>{format(new Date(l.start), 'MMM d')} - {format(new Date(l.end), 'MMM d')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No leave scheduled.</div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Blocked Slots
            </h4>
            {blockedSlots?.length > 0 ? (
              <div className="space-y-2">
                {blockedSlots.map((bs: any, idx: number) => (
                  <div key={idx} className="flex justify-between bg-gray-50 border rounded p-2 text-sm text-gray-700">
                    <span>{format(new Date(bs.start), 'MMM d, HH:mm')}</span>
                    <span>to</span>
                    <span>{format(new Date(bs.end), 'HH:mm')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No blocked slots.</div>
            )}
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};
