import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, User, Users, RefreshCw } from 'lucide-react';

interface QuickActionsProps {
  jobId: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ jobId }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-3">
          
          <Button variant="outline" className="w-full justify-start text-indigo-700 hover:bg-indigo-50" asChild>
            <a href={`/jobs/${jobId}/assignment`}>
              <User className="w-4 h-4 mr-2" />
              Open Assignment
            </a>
          </Button>

          <Button variant="outline" className="w-full justify-start text-purple-700 hover:bg-purple-50" asChild>
            <a href={`/jobs/${jobId}/schedule`}>
              <Calendar className="w-4 h-4 mr-2" />
              Open Schedule
            </a>
          </Button>

          <Button variant="outline" className="w-full justify-start text-emerald-700 hover:bg-emerald-50">
            <Users className="w-4 h-4 mr-2" />
            View Worker Profile
          </Button>

          <Button variant="outline" className="w-full justify-start text-slate-700 hover:bg-slate-50" asChild>
            <a href={`/jobs/${jobId}`}>
              <Briefcase className="w-4 h-4 mr-2" />
              Job Details
            </a>
          </Button>

          <div className="my-2 border-t border-gray-100"></div>

          <Button variant="secondary" className="w-full justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Workflow Node
          </Button>

        </div>
      </CardContent>
    </Card>
  );
};
