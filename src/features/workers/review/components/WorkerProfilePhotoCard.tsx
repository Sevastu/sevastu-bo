import React, { memo } from 'react';
import { User } from 'lucide-react';
import { ReviewWorkerDetails } from '../types/workerReview.types';

export const WorkerProfilePhotoCard = memo(function WorkerProfilePhotoCard({ profile }: { profile: ReviewWorkerDetails | null }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center shadow-sm">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-4 border-slate-50 shadow-inner mb-4 relative">
                {profile?.photoUrl ? (
                    <img 
                        src={profile.photoUrl} 
                        alt={profile.name || 'Worker Profile'} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User className="w-12 h-12 text-slate-300" />
                )}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{profile?.name || 'Unknown Name'}</h3>
            <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">{profile?.experience || 'Experience Not Listed'}</p>
            <div className="mt-4 flex gap-2">
                {profile?.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
});
