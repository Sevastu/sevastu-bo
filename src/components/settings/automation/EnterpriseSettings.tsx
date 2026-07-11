import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Users, History } from 'lucide-react';

export const BusinessHoursCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          Business Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">Define operating hours for automated scheduling and SLA calculations.</p>
        <div className="bg-slate-50 p-4 rounded border text-sm font-mono text-gray-700">
          <div>Mon-Fri: 09:00 - 18:00</div>
          <div>Sat: 10:00 - 15:00</div>
          <div>Sun: Closed</div>
        </div>
        <Button variant="outline" className="w-full mt-4">Edit Hours</Button>
      </CardContent>
    </Card>
  );
};

export const HolidayCalendarCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-500" />
          Holiday Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">Manage national and custom holidays affecting availability.</p>
        <div className="bg-green-50 border border-green-100 p-3 rounded text-sm text-green-800">
          <strong>Next Holiday:</strong> Independence Day (Aug 15)
        </div>
        <Button variant="outline" className="w-full mt-4">Manage Holidays</Button>
      </CardContent>
    </Card>
  );
};

export const ApprovalMatrixCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          Approval Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">Role-based overrides for manual interventions.</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm border-b pb-2">
            <span className="font-semibold text-gray-700">Tier 1 Esc.</span>
            <span className="text-gray-500">Supervisor</span>
          </div>
          <div className="flex justify-between text-sm pt-1">
            <span className="font-semibold text-gray-700">SLA Breach</span>
            <span className="text-gray-500">Ops Manager</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AuditHistoryCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <History className="w-5 h-5 text-orange-500" />
          Audit History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">Track every policy change, who made it, and when.</p>
        <Button variant="outline" className="w-full">View Audit Logs</Button>
      </CardContent>
    </Card>
  );
};
