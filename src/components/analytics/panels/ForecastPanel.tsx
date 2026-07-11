"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ForecastDataPoint } from '@/features/analytics/types/analytics.types';
import { Sparkles } from 'lucide-react';

interface ForecastPanelProps {
  data?: ForecastDataPoint[];
  isLoading: boolean;
}

export const ForecastPanel: React.FC<ForecastPanelProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <div className="h-[300px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div>;
  }

  return (
    <Card className="h-full bg-gradient-to-br from-background to-indigo-50/30 dark:to-indigo-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          Predictive Forecast
        </CardTitle>
        <CardDescription>AI-driven revenue and demand projection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} yAxisId="left" />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Line yAxisId="left" type="monotone" dataKey="expectedRevenue" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" name="Exp. Revenue" />
              <Line yAxisId="right" type="monotone" dataKey="expectedDemand" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Exp. Demand" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
