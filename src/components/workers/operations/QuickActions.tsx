import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ShieldAlert, CalendarCheck, CalendarDays, Briefcase } from 'lucide-react';

interface QuickActionsProps {
  isLoading: boolean;
  // Handlers for opening dialogs or executing actions
  onEditWorkingHours: () => void;
  onBlockSlot: () => void;
  onApproveLeave: () => void;
  onAssignJob: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  isLoading,
  onEditWorkingHours,
  onBlockSlot,
  onApproveLeave,
  onAssignJob
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 animate-pulse">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-gray-200 rounded"></div>)}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          
          <Button variant="outline" className="w-full justify-start text-indigo-700 border-indigo-200 hover:bg-indigo-50" onClick={onAssignJob}>
            <Briefcase className="w-4 h-4 mr-2" />
            Assign Job
          </Button>

          <Button variant="outline" className="w-full justify-start text-slate-700 hover:bg-slate-50" onClick={onEditWorkingHours}>
            <Clock className="w-4 h-4 mr-2" />
            Edit Working Hours
          </Button>

          <Button variant="outline" className="w-full justify-start text-red-700 border-red-200 hover:bg-red-50 hover:text-red-800" onClick={onBlockSlot}>
            <ShieldAlert className="w-4 h-4 mr-2" />
            Block Slot
          </Button>

          <Button variant="outline" className="w-full justify-start text-green-700 border-green-200 hover:bg-green-50" onClick={onApproveLeave}>
            <CalendarCheck className="w-4 h-4 mr-2" />
            Approve Leave
          </Button>

          <Button variant="secondary" className="w-full justify-start mt-2">
            <CalendarDays className="w-4 h-4 mr-2" />
            Open Full Timeline
          </Button>

        </div>
      </CardContent>
    </Card>
  );
};
