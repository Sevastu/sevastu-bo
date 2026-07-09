import React from "react";
import { Briefcase, Star, Clock, DollarSign, Award } from "lucide-react";
import { WorkerStatCard } from "./WorkerStatCard";
import { WorkerProfileData } from "../hooks/useWorkerProfile";
import { formatCurrency } from "../utils/workerProfileHelpers";

interface WorkerStatsGridProps {
  profile: WorkerProfileData["profile"];
}

export function WorkerStatsGrid({ profile }: WorkerStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <WorkerStatCard
        title="Total Jobs"
        value={profile.totalJobs}
        icon={<Briefcase className="w-5 h-5 text-primary" />}
        iconBgClass="bg-primary/10 text-primary"
      />
      <WorkerStatCard
        title="Active Hours"
        value={profile.experience}
        icon={<Clock className="w-5 h-5 text-success" />}
        iconBgClass="bg-success/10 text-success"
      />
      <WorkerStatCard
        title="Total Earnings"
        value={`${formatCurrency(profile.basePrice)}/hr`}
        icon={<DollarSign className="w-5 h-5 text-warning" />}
        iconBgClass="bg-warning/10 text-warning"
      />
      <WorkerStatCard
        title="Avg Rating"
        value={profile.skills.length}
        icon={<Award className="w-5 h-5 text-primary" />}
        iconBgClass="bg-primary/10 text-primary"
      />
    </div>
  );
}
