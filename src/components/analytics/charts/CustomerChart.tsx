"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CustomerAnalytics } from '@/features/analytics/types/analytics.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CustomerChartProps {
  data?: CustomerAnalytics;
  isLoading: boolean;
}

export const CustomerChart: React.FC<CustomerChartProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <div className="h-[300px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Acquisition</CardTitle>
        <CardDescription>New vs Returning Customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.acquisitionTrend}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={2} name="New Customers" dot={false} />
              <Line type="monotone" dataKey="returning" stroke="#f59e0b" strokeWidth={2} name="Returning" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
