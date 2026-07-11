import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface BlockedSlotsCardProps {
  workerData: any;
  isLoading: boolean;
  onRemoveBlock?: (id: string) => void;
}

export const BlockedSlotsCard: React.FC<BlockedSlotsCardProps> = ({ workerData, isLoading, onRemoveBlock }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blocked Slots</CardTitle>
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

  const blockedSlots = workerData?.blockedSlots || [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldAlert className="w-4 h-4 text-gray-500" />
          Blocked Slots
        </CardTitle>
      </CardHeader>
      <CardContent>
        {blockedSlots.length === 0 ? (
          <div className="text-sm text-gray-500 py-2 text-center">
            No active blocked slots.
          </div>
        ) : (
          <div className="space-y-3">
            {blockedSlots.map((slot: any, idx: number) => {
              const start = new Date(slot.start);
              const end = new Date(slot.end);
              const durationHours = ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(1);
              
              return (
                <div key={slot.id || idx} className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-50 border border-gray-100 p-3 rounded-lg gap-2">
                  <div>
                    <div className="flex items-center gap-2 font-medium text-gray-800 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      {format(start, 'MMM d')} • {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
                    </div>
                    {slot.reason && (
                      <div className="text-xs text-gray-500 mt-1 ml-6">{slot.reason}</div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3 ml-6 sm:ml-0 mt-2 sm:mt-0">
                    <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                      {durationHours} hrs
                    </span>
                    {onRemoveBlock && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onRemoveBlock(slot.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
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
