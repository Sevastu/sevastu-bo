import React from "react";
import StatsCard from "@/components/common/StatsCard";
import {
  Briefcase,
  FolderOpen,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export interface JobStatsDto {
  total: number;
  open: number;
  assigned: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}

interface JobStatsProps {
  analytics?: JobStatsDto;
  isLoading: boolean;
}

export default function JobStats({
  analytics,
  isLoading,
}: JobStatsProps) {
  const total = analytics?.total ?? 0;

  const stats = [
    {
      title: "Total Jobs",
      value: total,
      icon: Briefcase,
      iconClassName:
        "text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    },
    {
      title: "Open Jobs",
      value: analytics?.open ?? 0,
      icon: FolderOpen,
      iconClassName:
        "text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
      subtitle:
        total > 0
          ? `${Math.round(((analytics?.open ?? 0) / total) * 100)}% of total`
          : undefined,
    },
    {
      title: "Assigned",
      value: analytics?.assigned ?? 0,
      icon: UserCheck,
      iconClassName:
        "text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",
      subtitle:
        total > 0
          ? `${Math.round(((analytics?.assigned ?? 0) / total) * 100)}% of total`
          : undefined,
    },
    {
      title: "In Progress",
      value: analytics?.inProgress ?? 0,
      icon: Clock,
      iconClassName:
        "text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
      subtitle:
        total > 0
          ? `${Math.round(((analytics?.inProgress ?? 0) / total) * 100)}% of total`
          : undefined,
    },
    {
      title: "Completed",
      value: analytics?.completed ?? 0,
      icon: CheckCircle,
      iconClassName:
        "text-green-600 dark:bg-green-500/15 dark:text-green-400",
      subtitle:
        total > 0
          ? `${Math.round(((analytics?.completed ?? 0) / total) * 100)}% of total`
          : undefined,
    },
    {
      title: "Cancelled",
      value: analytics?.cancelled ?? 0,
      icon: XCircle,
      iconClassName:
        "text-red-600 dark:bg-red-500/15 dark:text-red-400",
      subtitle:
        total > 0
          ? `${Math.round(((analytics?.cancelled ?? 0) / total) * 100)}% of total`
          : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconClassName={stat.iconClassName}
          subtitle={stat.subtitle}
          loading={isLoading}
        />
      ))}
    </div>
  );
}