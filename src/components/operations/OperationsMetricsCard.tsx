"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OperationsMetricsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const OperationsMetricsCard: React.FC<OperationsMetricsCardProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
          <div className={cn("p-3 rounded-full", color)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};