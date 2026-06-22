import React from 'react';
import { WorkerUI } from '../types/worker-ui.types';
import { WorkerAvatar } from './WorkerAvatar';
import { WorkerSkills } from './WorkerSkills';
import { WorkerStatusBadge } from './WorkerStatusBadge';
import { WorkerRating } from './WorkerRating';
import { WorkerActionsDropdown } from './WorkerActionsDropdown';
import { timeAgo } from '../utils/workerHelpers';
import { MapPin, Circle } from 'lucide-react';

interface WorkerCardProps {
    worker: WorkerUI;
    onClick: (worker: WorkerUI) => void;
    onViewProfile: (worker: WorkerUI) => void;
    onReview?: (worker: WorkerUI) => void;
}

export function WorkerCard({ worker, onClick, onViewProfile, onReview }: WorkerCardProps) {
    return (
        <div 
            className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(41,52,61,0.04)] border border-slate-100 overflow-hidden hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg transition-all duration-300 ease-out flex flex-col h-full cursor-pointer"
            onClick={() => onClick(worker)}
        >
            <div className="p-6 pb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <WorkerAvatar photoUrl={worker.photoUrl} name={worker.name} className="w-14 h-14" />
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {worker.name || '—'}
                        </h3>
                        <div className="flex items-center text-slate-500 text-xs mt-1">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            {worker.city && worker.state ? `${worker.city}, ${worker.state}` : 'Unknown Location'}
                        </div>
                    </div>
                </div>
                <WorkerActionsDropdown worker={worker} onViewProfile={onViewProfile} onReview={onReview} />
            </div>

            <div className="px-6 py-2 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                    <WorkerStatusBadge status={worker.profileStatus as string} />
                    <div className="flex items-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        <Circle className={`w-2 h-2 mr-1.5 fill-current ${worker.isAvailable ? 'text-green-500' : 'text-slate-300'}`} />
                        {worker.isAvailable ? 'Available' : 'Unavailable'}
                    </div>
                </div>
                
                <div>
                    <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Skills</div>
                    <WorkerSkills skills={worker.skills} />
                </div>
            </div>

            <div className="p-6 pt-4 mt-auto border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                <WorkerRating rating={worker.rating || worker.averageRating || 0} />
                <div className="text-[11px] font-medium text-slate-400">
                    Joined {worker.createdAt || worker.joinedAt ? timeAgo(worker.createdAt || worker.joinedAt) : '—'}
                </div>
            </div>
        </div>
    );
}
