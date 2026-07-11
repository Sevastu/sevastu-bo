import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, AlertCircle } from 'lucide-react';

interface WorkingHoursCardProps {
  workerData: any;
  isLoading: boolean;
}

export const WorkingHoursCard: React.FC<WorkingHoursCardProps> = ({ workerData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Working Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback defaults or parse from workerData (which comes from availability api)
  const workingHours = workerData?.workingHours || [
    { day: 'Mon', start: '09:00 AM', end: '05:00 PM', isWorking: true },
    { day: 'Tue', start: '09:00 AM', end: '05:00 PM', isWorking: true },
    { day: 'Wed', start: '09:00 AM', end: '05:00 PM', isWorking: true },
    { day: 'Thu', start: '09:00 AM', end: '05:00 PM', isWorking: true },
    { day: 'Fri', start: '09:00 AM', end: '05:00 PM', isWorking: true },
    { day: 'Sat', start: '-', end: '-', isWorking: false },
    { day: 'Sun', start: '-', end: '-', isWorking: false },
  ];

  const exceptions = workerData?.workingHourExceptions || [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Briefcase className="w-4 h-4 text-gray-500" />
          Weekly Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
          {workingHours.map((wh: any, idx: number) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center ${
                wh.isWorking ? 'bg-slate-50 border-slate-200' : 'bg-gray-50 border-gray-100 opacity-50'
              }`}
            >
              <span className="text-xs font-bold text-slate-700 mb-1">{wh.day}</span>
              {wh.isWorking ? (
                <>
                  <span className="text-[10px] text-slate-500">{wh.start}</span>
                  <span className="text-[10px] text-slate-500">{wh.end}</span>
                </>
              ) : (
                <span className="text-[10px] text-gray-400">Off</span>
              )}
            </div>
          ))}
        </div>

        {/* Exceptions */}
        {exceptions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <AlertCircle className="w-3 h-3" /> Exceptions
            </h4>
            <div className="space-y-2 text-sm">
              {exceptions.map((ex: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center bg-orange-50 p-2 rounded border border-orange-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-orange-500" />
                    <span className="text-orange-900 font-medium">{ex.date}</span>
                  </div>
                  <span className="text-orange-700 text-xs">{ex.start} - {ex.end}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
