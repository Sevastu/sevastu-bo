import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarRange } from 'lucide-react';
import { EmptyState } from '@/components/common/StateViews';

interface AvailabilityCardProps {
  availability: any;
  workerId?: string | { _id: string };
}

export default function AvailabilityCard({ availability, workerId }: AvailabilityCardProps) {
  const workerIdStr = typeof workerId === 'string' ? workerId : workerId?._id;
  
  if (!workerIdStr) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <CalendarRange className="w-4 h-4" /> Worker Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState 
            title="N/A" 
            description="Assign a worker to view availability." 
            className="min-h-[100px] p-2"
          />
        </CardContent>
      </Card>
    );
  }

  // Assuming availability contains workingHours, blockedSlots, etc.
  const hasData = availability && (availability.workingHours || availability.blockedSlots);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <CalendarRange className="w-4 h-4" /> Worker Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <p className="text-sm text-muted-foreground text-center py-4">No specific availability data found for this worker.</p>
        ) : (
          <div className="space-y-3 pt-2 text-sm">
            {availability.workingHours && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Working Hours</span>
                <span className="font-medium text-right">{availability.workingHours}</span>
              </div>
            )}
            {availability.leaveStatus && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Leave Status</span>
                <span className="font-medium text-right">{availability.leaveStatus}</span>
              </div>
            )}
            {availability.blockedSlots && availability.blockedSlots.length > 0 && (
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground whitespace-nowrap">Blocked Slots</span>
                <span className="font-medium text-right ml-4 text-xs">
                  {availability.blockedSlots.map((slot: string, i: number) => (
                    <div key={i}>{slot}</div>
                  ))}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
