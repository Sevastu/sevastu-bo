import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarOff, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface LeaveCardProps {
  workerData: any;
  isLoading: boolean;
}

export const LeaveCard: React.FC<LeaveCardProps> = ({ workerData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leave Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const leaves = workerData?.leave || [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarOff className="w-4 h-4 text-gray-500" />
          Leave Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaves.length === 0 ? (
          <div className="text-sm text-gray-500 py-2 text-center">
            No upcoming or current leave scheduled.
          </div>
        ) : (
          <div className="space-y-3">
            {leaves.map((leave: any, idx: number) => {
              const start = new Date(leave.start);
              const end = new Date(leave.end);
              const isCurrent = start <= new Date() && end >= new Date();
              
              return (
                <div 
                  key={leave.id || idx} 
                  className={`flex flex-col sm:flex-row justify-between sm:items-start p-3 rounded-lg border gap-3 ${
                    isCurrent ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-semibold text-sm ${isCurrent ? 'text-red-900' : 'text-gray-900'}`}>
                        {format(start, 'MMM d, yyyy')} - {format(end, 'MMM d, yyyy')}
                      </span>
                      {isCurrent && (
                        <Badge className="bg-red-500 hover:bg-red-600 px-1.5 py-0 text-[10px]">Current</Badge>
                      )}
                    </div>
                    {leave.reason && (
                      <p className={`text-sm ${isCurrent ? 'text-red-700' : 'text-gray-600'}`}>
                        {leave.reason}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Approved
                    </div>
                    {/* Additional status or action buttons could go here */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
