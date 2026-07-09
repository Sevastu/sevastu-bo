import React from "react";
import { Briefcase, Target, Trophy } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";

interface WorkerProfessionalSummaryProps {
  profile: WorkerProfileData["profile"];
}

export function WorkerProfessionalSummary({ profile }: WorkerProfessionalSummaryProps) {
  const defaultBio = `Professional service provider with ${profile.experience} years of experience. Specialized in ${profile.category || 'multiple services'} with a proven track record of ${profile.totalJobs} completed jobs and a ${profile.rating} star rating. Dedicated to providing high-quality service and maintaining customer satisfaction.`;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          Professional Summary
        </h2>
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
          {profile.category || "General Provider"}
        </span>
      </div>

      <div className="prose prose-sm max-w-none text-foreground mb-8 leading-relaxed">
        <p>{profile.bio || defaultBio}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="bg-muted p-4 rounded-xl border border-border flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Focus Area</div>
            <div className="text-sm font-medium text-foreground">{profile.category || "Multiple Services"}</div>
          </div>
        </div>
        <div className="bg-muted p-4 rounded-xl border border-border flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
            <Trophy className="w-4 h-4 text-warning" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Achievement</div>
            <div className="text-sm font-medium text-foreground">Top Rated Provider</div>
          </div>
        </div>
      </div>
    </div>
  );
}
