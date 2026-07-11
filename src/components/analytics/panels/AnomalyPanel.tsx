"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Radar, TrendingDown, Users, AlertCircle } from 'lucide-react';
import { Anomaly } from '@/features/analytics/types/analytics.types';

interface AnomalyPanelProps {
  data?: Anomaly[];
  isLoading: boolean;
}

export const AnomalyPanel: React.FC<AnomalyPanelProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <div className="h-[300px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div>;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'revenue_drop': return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'worker_shortage': return <Users className="w-5 h-5 text-orange-500" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Card className="h-full bg-gradient-to-br from-background to-red-50/30 dark:to-red-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-primary animate-pulse" />
          AI Anomaly Detection
        </CardTitle>
        <CardDescription>Unusual patterns detected by backend</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <Radar className="w-10 h-10 mb-2 opacity-20" />
            <p>No anomalies detected</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((anomaly) => (
              <div key={anomaly.id} className="flex gap-4 p-4 bg-background border border-border rounded-xl shadow-sm">
                <div className="mt-1 p-2 bg-muted rounded-full">
                  {getIcon(anomaly.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{anomaly.description}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      anomaly.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      anomaly.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {anomaly.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-muted/50 rounded flex flex-col">
                      <span className="text-muted-foreground text-xs">Expected</span>
                      <span className="font-medium">{anomaly.expectedValue}</span>
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded flex flex-col">
                      <span className="text-muted-foreground text-xs">Actual</span>
                      <span className="font-medium text-red-600 dark:text-red-400">{anomaly.actualValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
