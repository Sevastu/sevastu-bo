import React, { memo } from 'react';
import { Mail, Phone, MapPin, Clock, Star, Activity, Heart, User } from 'lucide-react';
import { ReviewWorkerDetails } from '../types/workerReview.types';
import { formatAddress, formatBoolean, formatWorkerValue } from '../utils/workerReviewHelpers';

export const WorkerProfileDetails = memo(function WorkerProfileDetails({ profile }: { profile: ReviewWorkerDetails | null }) {
    if (!profile) return null;

    const details = [
        { label: 'Email', value: formatWorkerValue(profile.email), icon: Mail },
        { label: 'Phone', value: formatWorkerValue(profile.phone), icon: Phone },
        { label: 'Age / Gender', value: `${formatWorkerValue(profile.age)} / ${formatWorkerValue(profile.gender)}`, icon: User },
        { label: 'Location', value: formatAddress(profile.city, profile.state, profile.address), icon: MapPin },
        { label: 'Travel Distance', value: profile.travelDistance ? `${profile.travelDistance} km` : '—', icon: Activity },
        { label: 'Availability', value: formatBoolean(profile.availability), icon: Clock },
        { label: 'Rating', value: profile.rating ? `${profile.rating} Stars` : '—', icon: Star },
        { label: 'Completed Jobs', value: formatWorkerValue(profile.completedJobs, '0'), icon: Heart },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Personal Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {details.map((detail, index) => {
                    const Icon = detail.icon as any;
                    return (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
                                <Icon className="w-5 h-5 text-slate-500" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{detail.label}</p>
                                <p className="text-sm font-semibold text-slate-900 truncate" title={detail.value}>{detail.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
