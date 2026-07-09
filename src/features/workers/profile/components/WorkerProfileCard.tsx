import React from "react";
import { User, Phone, Mail, MapPin, Navigation } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";

interface WorkerProfileCardProps {
  profile: WorkerProfileData["profile"];
}

export function WorkerProfileCard({ profile }: WorkerProfileCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full">
      <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        Personal Information
      </h2>

      <div className="space-y-6">
        {/* Contact Info */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Contact Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground truncate">{profile.email || "Not Provided"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">{profile.phone || "Not Provided"}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-border" />

        {/* Demographics */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Demographics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-xl p-3">
              <div className="text-xs font-medium text-muted-foreground mb-1">Gender</div>
              <div className="text-sm font-semibold text-foreground capitalize">{profile.gender}</div>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <div className="text-xs font-medium text-muted-foreground mb-1">Age</div>
              <div className="text-sm font-semibold text-foreground">{profile.age} Yrs</div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-border" />

        {/* Location Info */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Location</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground leading-tight mb-1">{profile.address || "No Street Address"}</div>
                <div className="text-muted-foreground">{profile.city}, {profile.state} {profile.pincode}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
