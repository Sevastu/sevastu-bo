import React from 'react';
import { WorkerUI } from '../types/worker-ui.types';
import { WorkerAvatar } from './WorkerAvatar';
import { WorkerSkills } from './WorkerSkills';
import { WorkerStatusBadge } from './WorkerStatusBadge';
import { WorkerRating } from './WorkerRating';
import { WorkerActionsDropdown } from './WorkerActionsDropdown';
import { resolveWorkerUserId, timeAgo } from '../utils/workerHelpers';
import { MapPin, Circle } from 'lucide-react';

interface WorkerTableProps {
    workers: WorkerUI[];
    onRowClick: (worker: WorkerUI) => void;
    onViewProfile: (worker: WorkerUI) => void;
    onReview?: (worker: WorkerUI) => void;
}

export function WorkerTable({ workers, onRowClick, onViewProfile, onReview }: WorkerTableProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-2xl">Worker</th>
                            <th className="px-6 py-4">Skills</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status & Availability</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {workers.map(worker => (
                            <tr 
                                key={resolveWorkerUserId(worker)} 
                                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                                onClick={() => onRowClick(worker)}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <WorkerAvatar photoUrl={worker.photoUrl} name={worker.name} className="w-10 h-10" />
                                        <div>
                                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {worker.name || '—'}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">
                                                {worker.email || '—'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 max-w-[200px]">
                                    <WorkerSkills skills={worker.skills} />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-slate-700 text-sm">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                                        {worker.city && worker.state ? `${worker.city}, ${worker.state}` : '—'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col items-start gap-1.5">
                                        <WorkerStatusBadge status={worker.profileStatus as string} />
                                        <div className="flex items-center text-[11px] font-medium text-slate-500">
                                            <Circle className={`w-2 h-2 mr-1.5 fill-current ${worker.isAvailable ? 'text-green-500' : 'text-slate-300'}`} />
                                            {worker.isAvailable ? 'Available' : 'Unavailable'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <WorkerRating rating={worker.rating || worker.averageRating || 0} />
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                    {worker.createdAt || worker.joinedAt ? timeAgo(worker.createdAt || worker.joinedAt) : '—'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <WorkerActionsDropdown worker={worker} onViewProfile={onViewProfile} onReview={onReview} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
