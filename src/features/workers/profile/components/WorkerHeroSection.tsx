import React from "react";
import { MapPin, Calendar } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";
import { WorkerStatusBadge } from "./WorkerStatusBadge";
import { WorkerRating } from "./WorkerRating";
import { WorkerAvailabilityBadge } from "./WorkerAvailabilityBadge";
import { getInitials, formatDate } from "../utils/workerProfileHelpers";

interface WorkerHeroSectionProps {
  profile: WorkerProfileData["profile"];
}

export function WorkerHeroSection({ profile }: WorkerHeroSectionProps) {
  // Assuming completion % logic (can be expanded later)
  const completionPercentage = profile.photoUrl && profile.bio ? 100 : 85;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        {/* Profile Image */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-blue-600 font-bold text-4xl">
                {getInitials(profile.name)}
              </span>
            )}
          </div>
          <div className="absolute -bottom-3 -right-3">
             <WorkerAvailabilityBadge isAvailable={profile.isAvailable} />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{profile.name}</h1>
                <WorkerStatusBadge status={profile.profileStatus} />
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {profile.city}, {profile.state}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Member since {formatDate(profile.createdAt)}
                </div>
              </div>
            </div>

            {/* Quick Actions / Rating */}
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-sm font-semibold text-slate-500 mb-1">Overall Rating</div>
              <WorkerRating rating={profile.rating} />
            </div>
          </div>

          {/* Progress Bar for Completion */}
          <div className="max-w-md pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Profile Completion</span>
              <span className="text-blue-600">{completionPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
