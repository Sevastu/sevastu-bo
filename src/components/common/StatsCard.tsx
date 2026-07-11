import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconClassName?: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  subtitle,
  trend,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            {loading ? (
              <div className="h-8 w-20 rounded bg-muted animate-pulse" />
            ) : (
              <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
            )}
          </div>

          {Icon && (
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
                iconClassName
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>

        {(subtitle || trend) && (
            <div className="mt-4 flex items-center justify-between">
              {trend ? (
                <span
                  className={cn(
                    "text-sm font-semibold",
                    trend.isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
              ) : (
                <span />
              )}

              {subtitle && (
                <span className="text-xs text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>
          )}
      </CardContent>
    </Card>
  );
}