import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShieldCheck, Briefcase, Activity, CheckCircle, Clock } from 'lucide-react';

interface WorkerSummaryCardProps {
  workerData: any;
  isLoading: boolean;
}

export const WorkerSummaryCard: React.FC<WorkerSummaryCardProps> = ({ workerData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6 animate-pulse">
            <div className="w-24 h-24 rounded-full bg-gray-200 shrink-0"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="grid grid-cols-4 gap-4 pt-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-gray-200 rounded"></div>)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback defaults mapping for demo if API payload is partial
  const {
    name = 'Unknown Worker',
    photoUrl = 'https://i.pravatar.cc/150?u=' + (workerData?.id || 'demo'),
    isVerified = true,
    rating = 4.8,
    experience = '5 Years',
    category = 'Plumbing',
    skills = ['Pipe Repair', 'Installation', 'Maintenance'],
    workload = {
      activeJobs: 1,
      jobsToday: 3,
      upcomingJobs: 5,
      utilizationPercent: 85
    }
  } = workerData || {};

  return (
    <Card className="overflow-hidden border-t-4 border-t-indigo-600">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Profile Section */}
          <div className="flex flex-col items-center md:items-start shrink-0 space-y-3 md:w-64 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
            <div className="relative">
              <img src={photoUrl} alt={name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                </div>
              )}
            </div>
            
            <div className="text-center md:text-left w-full">
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <p className="text-sm font-medium text-indigo-600">{category}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-1 mt-2 text-sm font-medium text-slate-700">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{rating} Rating</span>
                <span className="text-gray-300 mx-1">•</span>
                <span>{experience}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 pt-2 justify-center md:justify-start">
              {skills.map((skill: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 py-0">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Metrics Section */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Current Job</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{workload.activeJobs > 0 ? 'In Progress' : 'Idle'}</div>
              {workload.activeJobs > 0 && <div className="text-xs text-blue-600 mt-1 font-medium">{workload.activeJobs} Active</div>}
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Today's Jobs</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{workload.jobsToday}</div>
              <div className="text-xs text-slate-500 mt-1">Total Scheduled</div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Upcoming</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{workload.upcomingJobs}</div>
              <div className="text-xs text-slate-500 mt-1">Next 7 Days</div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Utilization</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-indigo-900">{workload.utilizationPercent}%</div>
              </div>
              <div className="w-full bg-indigo-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${workload.utilizationPercent}%` }}></div>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};
