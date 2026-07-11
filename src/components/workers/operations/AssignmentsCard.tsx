import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, ArrowUpRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface AssignmentsCardProps {
  jobsData: any[];
  isLoading: boolean;
}

export const AssignmentsCard: React.FC<AssignmentsCardProps> = ({ jobsData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-200 rounded"></div>)}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Derive assignments from jobs array where this worker is assigned
  // Since jobsData is mocked or provided by jobsRepository.getJobs({ workerId }), we use it directly
  const assignments = jobsData || [];

  const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'IN_PROGRESS': return { icon: <Clock className="w-4 h-4 text-blue-500" />, badge: <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge> };
      case 'COMPLETED': return { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, badge: <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge> };
      case 'PENDING': return { icon: <Clock className="w-4 h-4 text-yellow-500" />, badge: <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge> };
      case 'CANCELLED': return { icon: <XCircle className="w-4 h-4 text-red-500" />, badge: <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge> };
      default: return { icon: <Briefcase className="w-4 h-4 text-gray-500" />, badge: <Badge variant="outline">{status}</Badge> };
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Briefcase className="w-4 h-4 text-gray-500" />
          Recent Assignments
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
          View All <ArrowUpRight className="w-3 h-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        {assignments.length === 0 ? (
          <div className="text-sm text-gray-500 py-6 text-center bg-slate-50 rounded border border-dashed">
            No recent assignments found.
          </div>
        ) : (
          <div className="space-y-3">
            {assignments.slice(0, 5).map((job: any, idx: number) => {
              const { icon, badge } = getStatusConfig(job.status);
              return (
                <a 
                  key={job.id || job._id || idx} 
                  href={`/jobs/${job.id || job._id || ''}`}
                  className="flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-lg border bg-white hover:bg-slate-50 transition-colors gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-slate-100 p-2 rounded-full group-hover:bg-white border transition-colors">
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {job.title || `Job #${(job.id || job._id || '').substring(0, 8) || 'N/A'}`}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {job.scheduledStart ? format(new Date(job.scheduledStart), 'MMM d, HH:mm') : 'Unscheduled'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3 ml-11 sm:ml-0">
                    <div className="text-sm font-medium text-gray-700">
                      ${job.price || '0.00'}
                    </div>
                    {badge}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
