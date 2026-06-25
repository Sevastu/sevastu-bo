import React from "react";
import { User, Phone, Mail, MapPin, Navigation } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";

interface WorkerProfileCardProps {
  profile: WorkerProfileData["profile"];
}

export function WorkerProfileCard({ profile }: WorkerProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" />
        Personal Information
      </h2>

      <div className="space-y-6">
        {/* Contact Info */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contact Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-slate-500" />
              </div>
              <span className="font-medium text-slate-700 truncate">{profile.email || "Not Provided"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-slate-500" />
              </div>
              <span className="font-medium text-slate-700">{profile.phone || "Not Provided"}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-100" />

        {/* Demographics */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Demographics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-3">
              <div className="text-xs font-medium text-slate-500 mb-1">Gender</div>
              <div className="text-sm font-semibold text-slate-900 capitalize">{profile.gender}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <div className="text-xs font-medium text-slate-500 mb-1">Age</div>
              <div className="text-sm font-semibold text-slate-900">{profile.age} Yrs</div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-100" />

        {/* Location Info */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Location</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-slate-900 leading-tight mb-1">{profile.address || "No Street Address"}</div>
                <div className="text-slate-500">{profile.city}, {profile.state} {profile.pincode}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
