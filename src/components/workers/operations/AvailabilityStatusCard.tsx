import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface AvailabilityStatusCardProps {
  workerData: any;
  isLoading: boolean;
}

export const AvailabilityStatusCard: React.FC<AvailabilityStatusCardProps> = ({ workerData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback defaults
  const status = workerData?.status || 'AVAILABLE';
  const statusDetail = workerData?.statusDetail || '';
  const nextAvailableSlot = workerData?.nextAvailableSlot || { label: 'Today', time: '5:00 PM' };

  let statusConfig = {
    color: 'bg-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    label: 'Available',
    pulse: true
  };

  switch (status) {
    case 'BUSY':
      statusConfig = {
        color: 'bg-orange-500',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        label: 'Busy',
        pulse: true
      };
      break;
    case 'ON_LEAVE':
      statusConfig = {
        color: 'bg-red-500',
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        label: 'On Leave',
        pulse: false
      };
      break;
    case 'BLOCKED':
      statusConfig = {
        color: 'bg-gray-800',
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        text: 'text-gray-900',
        label: 'Blocked',
        pulse: false
      };
      break;
  }

  return (
    <Card className={`border ${statusConfig.border} overflow-hidden`}>
      <div className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${statusConfig.bg}`}>
        <div className="flex items-center gap-4">
          <div className="relative flex h-4 w-4 shrink-0">
            {statusConfig.pulse && (
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.color}`}></span>
            )}
            <span className={`relative inline-flex rounded-full h-4 w-4 ${statusConfig.color}`}></span>
          </div>
          <div>
            <h3 className={`text-lg font-bold ${statusConfig.text}`}>
              {statusConfig.label}
            </h3>
            {statusDetail && (
              <p className={`text-sm mt-0.5 ${statusConfig.text} opacity-80 font-medium`}>
                {statusDetail}
              </p>
            )}
          </div>
        </div>

        {/* Next Available Slot Info */}
        {(status === 'BUSY' || status === 'BLOCKED') && (
          <div className="bg-white/60 px-4 py-2 rounded-lg border border-white/50 backdrop-blur-sm flex items-center gap-3 shrink-0">
            <div className={`p-1.5 rounded-full ${statusConfig.bg}`}>
              <Clock className={`w-4 h-4 ${statusConfig.text}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Next Available</p>
              <p className="text-sm font-bold text-gray-900">
                {nextAvailableSlot.label} <span className="text-gray-500 font-normal ml-1">at {nextAvailableSlot.time}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
