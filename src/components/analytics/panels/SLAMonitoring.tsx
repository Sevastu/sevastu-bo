"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, CheckCircle, AlertOctagon } from 'lucide-react';
import { SLAStat } from '@/features/analytics/types/analytics.types';

interface SLAMonitoringProps {
  data?: SLAStat;
  isLoading: boolean;
}

export const SLAMonitoring: React.FC<SLAMonitoringProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <div className="h-[300px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div>;
  }

  const metrics = [
    { label: 'Avg. Assignment Time', value: `${data.avgAssignmentTime} min`, target: '< 15 min', status: data.avgAssignmentTime <= 15 ? 'good' : 'warning' },
    { label: 'Avg. Scheduling Time', value: `${data.avgSchedulingTime} min`, target: '< 60 min', status: data.avgSchedulingTime <= 60 ? 'good' : 'warning' },
    { label: 'Avg. Resolution Time', value: `${data.avgResolutionTime} min`, target: '< 240 min', status: data.avgResolutionTime <= 240 ? 'good' : 'warning' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          SLA Monitoring
        </CardTitle>
        <CardDescription>Service Level Agreement compliance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
            <div>
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-400">Total SLA Breaches</h4>
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">Requiring immediate attention</p>
            </div>
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-8 h-8 text-red-500" />
              <span className="text-3xl font-bold text-red-600">{data.slaBreaches}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Average Times</h4>
            {metrics.map((metric, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">{metric.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{metric.value}</span>
                    {metric.status === 'good' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertOctagon className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
