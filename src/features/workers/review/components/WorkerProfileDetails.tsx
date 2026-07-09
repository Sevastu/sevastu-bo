import React, { memo } from 'react';
import { User, MapPin, Briefcase, Wrench } from 'lucide-react';
import { ReviewWorkerDetails } from '../types/workerReview.types';
import { formatWorkerValue } from '../utils/workerReviewHelpers';

export const WorkerProfileDetails = memo(function WorkerProfileDetails({ profile }: { profile: ReviewWorkerDetails | null }) {
    if (!profile) return null;

    return (
        <div className="bg-card rounded-lg border border-border/20 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-border bg-muted/50 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Profile Information</h3>
            </div>
            
            <div className="p-6 space-y-6 flex-1">
                {/* Basic Demographics */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Age</p>
                        <p className="text-sm font-semibold text-foreground">{formatWorkerValue(profile.age, 'N/A')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Gender</p>
                        <p className="text-sm font-semibold text-foreground capitalize">{formatWorkerValue(profile.gender, 'N/A')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-sm font-semibold text-foreground capitalize">{formatWorkerValue(profile.experience, 'N/A')}</p>
                    </div>
                    {/* Assuming Role is stored in experience or a separate field, fallback to generic if not available */}
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Role</p>
                        <p className="text-sm font-semibold text-foreground">Worker</p>
                    </div>
                </div>

                <hr className="border-border" />

                {/* Location */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-bold text-foreground">Location Details</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted p-4 rounded-xl border border-border">
                        <div className="col-span-1 sm:col-span-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Address</p>
                            <p className="text-sm font-medium text-foreground">{profile.address || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">City</p>
                            <p className="text-sm font-medium text-foreground">{profile.city || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">State</p>
                            <p className="text-sm font-medium text-foreground">{profile.state || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <hr className="border-border" />

                {/* Skills */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-bold text-foreground">Skills</p>
                    </div>
                    {profile.skills && profile.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No skills listed</p>
                    )}
                </div>
            </div>
        </div>
    );
});
