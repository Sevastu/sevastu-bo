"use client";

import React from 'react';
import { RegionalAnalytics } from '@/features/analytics/types/analytics.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface GeoHeatmapProps {
  data?: RegionalAnalytics;
  isLoading: boolean;
}

export const GeoHeatmap: React.FC<GeoHeatmapProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <div className="h-[300px] flex items-center justify-center animate-pulse bg-muted rounded-xl">Loading...</div>;
  }

  // Temporary mock visualization of a heatmap using CSS grid
  // In a real application, this would use a library like react-leaflet or mapbox-gl
  const regions = [
    { name: 'Mumbai', value: 85, color: 'bg-red-500' },
    { name: 'Delhi', value: 72, color: 'bg-orange-500' },
    { name: 'Bangalore', value: 94, color: 'bg-red-600' },
    { name: 'Chennai', value: 45, color: 'bg-yellow-400' },
    { name: 'Hyderabad', value: 65, color: 'bg-orange-400' },
    { name: 'Pune', value: 55, color: 'bg-yellow-500' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Demand Heatmap</CardTitle>
        <CardDescription>Jobs concentration by city</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
            {regions.map((region) => (
              <div 
                key={region.name} 
                className={`${region.color} rounded-lg flex flex-col items-center justify-center text-white shadow-sm transition-transform hover:scale-105`}
                style={{ opacity: 0.7 + (region.value / 100) * 0.3 }}
              >
                <span className="font-bold text-lg">{region.name}</span>
                <span className="text-sm opacity-90">{region.value} index</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
