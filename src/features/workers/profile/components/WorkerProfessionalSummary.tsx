import React from "react";
import { Briefcase, Target, Trophy } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";

interface WorkerProfessionalSummaryProps {
  profile: WorkerProfileData["profile"];
}

export function WorkerProfessionalSummary({ profile }: WorkerProfessionalSummaryProps) {
  const defaultBio = `Professional service provider with ${profile.experience} years of experience. Specialized in ${profile.category || 'multiple services'} with a proven track record of ${profile.totalJobs} completed jobs and a ${profile.rating} star rating. Dedicated to providing high-quality service and maintaining customer satisfaction.`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          Professional Summary
        </h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
          {profile.category || "General Provider"}
        </span>
      </div>

      <div className="prose prose-sm max-w-none text-slate-600 mb-8 leading-relaxed">
        <p>{profile.bio || defaultBio}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Focus Area</div>
            <div className="text-sm font-medium text-slate-900">{profile.category || "Multiple Services"}</div>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Achievement</div>
            <div className="text-sm font-medium text-slate-900">Top Rated Provider</div>
          </div>
        </div>
      </div>
    </div>
  );
}
