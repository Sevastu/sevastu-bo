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
        icon={<Briefcase className="w-5 h-5 text-blue-600" />}
        iconBgClass="bg-blue-50 text-blue-600"
      />
      <WorkerStatCard
        title="Experience"
        value={`${profile.experience} Yrs`}
        icon={<Clock className="w-5 h-5 text-emerald-600" />}
        iconBgClass="bg-emerald-50 text-emerald-600"
      />
      <WorkerStatCard
        title="Base Price"
        value={`${formatCurrency(profile.basePrice)}/hr`}
        icon={<DollarSign className="w-5 h-5 text-amber-600" />}
        iconBgClass="bg-amber-50 text-amber-600"
      />
      <WorkerStatCard
        title="Skills Verified"
        value={profile.skills.length}
        icon={<Award className="w-5 h-5 text-purple-600" />}
        iconBgClass="bg-purple-50 text-purple-600"
      />
    </div>
  );
}
