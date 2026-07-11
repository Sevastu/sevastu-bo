"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, Briefcase, Calendar, ShieldAlert } from 'lucide-react';
import { AutomationAnalytics } from '@/features/analytics/types/analytics.types';

interface LiveActivityProps {
  data?: AutomationAnalytics;
  isLoading: boolean;
}

export const LiveActivity: React.FC<LiveActivityProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="h-[400px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div>;
  }

  // Mocked activity stream
  const activities = [
    { id: 1, type: 'job', message: 'New job created in Mumbai', time: '2 mins ago', icon: <Briefcase className="w-4 h-4 text-blue-500" /> },
    { id: 2, type: 'schedule', message: 'Worker assigned to Job #1204', time: '5 mins ago', icon: <Calendar className="w-4 h-4 text-green-500" /> },
    { id: 3, type: 'alert', message: 'Automation rule "Auto-Assign" failed', time: '12 mins ago', icon: <ShieldAlert className="w-4 h-4 text-red-500" /> },
    { id: 4, type: 'job', message: 'Job #1200 completed successfully', time: '18 mins ago', icon: <Activity className="w-4 h-4 text-purple-500" /> },
    { id: 5, type: 'schedule', message: 'Worker cancelled shift', time: '25 mins ago', icon: <ShieldAlert className="w-4 h-4 text-orange-500" /> },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Live Activity Feed
        </CardTitle>
        <CardDescription>Real-time system events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
              <div className="mt-0.5">{activity.icon}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
