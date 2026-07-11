"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Clock, Users, XCircle } from 'lucide-react';

interface AlertsPanelProps {
  isLoading?: boolean;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="h-[400px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div>;
  }

  const alerts = [
    { id: 1, type: 'delay', title: 'Critical Delays', count: 12, description: 'Jobs delayed over 30 mins', icon: <Clock className="w-5 h-5 text-orange-500" /> },
    { id: 2, type: 'shortage', title: 'Worker Shortage', count: 3, description: 'Regions with insufficient workers', icon: <Users className="w-5 h-5 text-red-500" /> },
    { id: 3, type: 'policy', title: 'Policy Failures', count: 8, description: 'Automation rules failed to execute', icon: <XCircle className="w-5 h-5 text-purple-500" /> },
    { id: 4, type: 'conflict', title: 'Schedule Conflicts', count: 4, description: 'Overlapping worker schedules', icon: <AlertTriangle className="w-5 h-5 text-yellow-500" /> },
  ];

  return (
    <Card className="h-full border-red-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-5 h-5" />
          System Alerts
        </CardTitle>
        <CardDescription>Critical operational issues requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-white dark:bg-black rounded-lg shadow-sm">
                  {alert.icon}
                </div>
                <span className="text-2xl font-bold text-red-700 dark:text-red-400">{alert.count}</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{alert.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{alert.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
