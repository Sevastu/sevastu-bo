import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle, Star, Clock } from 'lucide-react';

interface PerformanceCardProps {
  workerData: any;
  isLoading: boolean;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ workerData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 animate-pulse">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-gray-200 rounded"></div>)}
          </div>
        </CardContent>
      </Card>
    );
  }

  const workload = workerData?.workload || {
    jobsToday: 0,
    jobsThisWeek: 0,
    acceptanceRate: 0,
    completionRate: 0,
    averageResponseTime: '-',
  };
  const rating = workerData?.rating || '-';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-slate-50 p-3 rounded-lg border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Acceptance</span>
              <CheckCircle className="w-3 h-3 text-green-500" />
            </div>
            <div className="text-xl font-bold text-gray-900">{workload.acceptanceRate}%</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Completion</span>
              <CheckCircle className="w-3 h-3 text-blue-500" />
            </div>
            <div className="text-xl font-bold text-gray-900">{workload.completionRate}%</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Rating</span>
              <Star className="w-3 h-3 text-yellow-500" />
            </div>
            <div className="text-xl font-bold text-gray-900">{rating}</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Response</span>
              <Clock className="w-3 h-3 text-orange-500" />
            </div>
            <div className="text-xl font-bold text-gray-900">{workload.averageResponseTime}</div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};
