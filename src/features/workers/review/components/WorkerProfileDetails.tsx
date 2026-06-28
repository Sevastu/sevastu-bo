import React, { memo } from 'react';
import { User, MapPin, Briefcase, Wrench } from 'lucide-react';
import { ReviewWorkerDetails } from '../types/workerReview.types';
import { formatWorkerValue } from '../utils/workerReviewHelpers';

export const WorkerProfileDetails = memo(function WorkerProfileDetails({ profile }: { profile: ReviewWorkerDetails | null }) {
    if (!profile) return null;

    return (
        <div className="bg-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Profile Information</h3>
            </div>
            
            <div className="p-6 space-y-6 flex-1">
                {/* Basic Demographics */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Age</p>
                        <p className="text-sm font-semibold text-slate-900">{formatWorkerValue(profile.age, 'N/A')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Gender</p>
                        <p className="text-sm font-semibold text-slate-900 capitalize">{formatWorkerValue(profile.gender, 'N/A')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-sm font-semibold text-slate-900 capitalize">{formatWorkerValue(profile.experience, 'N/A')}</p>
                    </div>
                    {/* Assuming Role is stored in experience or a separate field, fallback to generic if not available */}
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Role</p>
                        <p className="text-sm font-semibold text-slate-900">Worker</p>
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Location */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <p className="text-sm font-bold text-slate-700">Location Details</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="col-span-1 sm:col-span-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                            <p className="text-sm font-medium text-slate-900">{profile.address || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">City</p>
                            <p className="text-sm font-medium text-slate-900">{profile.city || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">State</p>
                            <p className="text-sm font-medium text-slate-900">{profile.state || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Skills */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-4 h-4 text-slate-400" />
                        <p className="text-sm font-bold text-slate-700">Skills</p>
                    </div>
                    {profile.skills && profile.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 italic">No skills listed</p>
                    )}
                </div>
            </div>
        </div>
    );
});
