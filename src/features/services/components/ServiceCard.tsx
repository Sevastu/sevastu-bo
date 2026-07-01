import React from 'react';
import { useRouter } from 'next/navigation';
import { Service } from '@/features/services/types';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Copy, Archive, Trash2, Layers } from 'lucide-react';
import { FALLBACK_IMAGE, renderIcon, timeAgo } from '../utils';

interface ServiceCardProps {
    service: Service;
    categoryName: string;
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
}

export function ServiceCard({ service, categoryName, onEdit, onDelete }: ServiceCardProps) {
    const router = useRouter();

    const subServiceCount = service.subServiceCount || 0;
    const workerCount = service.activeWorkerCount || 0;

    // Health indicators logic
    let healthColor = 'bg-slate-100 text-slate-600 border-slate-200';
    let healthLabel = 'No Data';

    if (subServiceCount > 0 && workerCount > 0) {
        healthColor = 'bg-green-50 text-green-700 border-green-200';
        healthLabel = 'Healthy';
    } else if (workerCount === 0 && subServiceCount > 0) {
        healthColor = 'bg-amber-50 text-amber-700 border-amber-200';
        healthLabel = 'Needs Workers';
    } else if (subServiceCount === 0) {
        healthColor = 'bg-red-50 text-red-700 border-red-200';
        healthLabel = 'No Sub-services';
    }

    const SERVICE_ACTIONS = [
        { label: "Edit Service", icon: Edit, action: () => onEdit(service), className: "text-slate-700 hover:bg-slate-50" },
        { label: "View Sub-services", icon: Layers, action: () => router.push(`/sub-services?serviceId=${service._id}`), className: "text-slate-700 hover:bg-slate-50" },
        { label: "Duplicate Service", icon: Copy, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Archive Service", icon: Archive, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Delete Service", icon: Trash2, action: () => onDelete(service), className: "text-red-600 hover:bg-red-50" }
    ];

    return (
        <div className="group bg-card rounded-md mt-2 shadow-[0_4px_20px_rgba(41,52,61,0.04)] border border-slate-100 overflow-hidden hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg transition-all duration-300 ease-out flex flex-col h-full">
            {/* Image Header */}
            <div className="relative h-44 bg-slate-100 overflow-hidden shrink-0">
                <img
                    src={service.imageUrl || FALLBACK_IMAGE}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-80" />

                {/* Floating Icon */}
                <div className="absolute bottom-30 left-6 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border border-slate-50 group-hover:shadow-blue-100 group-hover:shadow-lg transition-shadow duration-300 z-10">
                    {renderIcon(service.icon)}
                </div>

                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <Badge variant="secondary" className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md backdrop-blur-md ${service.isActive ? 'bg-green-500/90 text-white border-none' : 'bg-slate-800/80 text-white border-none'}`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                </div>
                
                {/* Health indicator floating bottom right */}
                <div className="absolute bottom-3 right-4">
                    <Badge variant="outline" className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${healthColor}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${healthColor.split(' ')[1].replace('text', 'bg')}`}></div>
                        {healthLabel}
                    </Badge>
                </div>
            </div>

            {/* Card Content */}
            <div className="pt-8 px-6 pb-6 flex-1 flex flex-col bg-card">
                <div className="flex justify-between items-start mb-2">
                    <div className="pr-4">
                        <Badge variant="outline" className="mb-2 text-[10px] uppercase font-semibold tracking-wider text-blue-600 bg-blue-50 border-blue-100 rounded-md">
                            {categoryName}
                        </Badge>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {service.name}
                        </h3>
                    </div>
                    <Dropdown
                        className="w-48 bg-white shadow-lg rounded-xl border border-slate-100 z-20 overflow-hidden"
                        trigger={
                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors -mr-2">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        }
                    >
                        <div className="p-1">
                            {SERVICE_ACTIONS.map((action, idx) => (
                                <button key={idx} onClick={action.action} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors ${action.className}`}>
                                    <action.icon className="w-4 h-4 mr-2.5 opacity-70" /> {action.label}
                                </button>
                            ))}
                        </div>
                    </Dropdown>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
                    {service.description || 'No description provided for this service.'}
                </p>

                {/* Metrics */}
                <div className="flex gap-3 mb-6 bg-slate-200/50 rounded-xl p-3 border border-slate-100/50">
                    <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-slate-700">{subServiceCount}</div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Sub-services</div>
                    </div>
                    <div className="w-px bg-slate-200 my-2"></div>
                    <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-slate-700">{workerCount}</div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Workers</div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEdit(service)} className="rounded-lg h-9 px-4 text-sm font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm">
                            Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/sub-services?serviceId=${service._id}`)} className="rounded-lg h-9 px-4 py-2 text-sm font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm">
                            Sub-services
                        </Button>
                    </div>
                    <div className="text-[12px] font-medium text-slate-400 flex items-center">
                        {service.updatedAt ? timeAgo(service.updatedAt) : 'Just now'}
                    </div>
                </div>
            </div>
        </div>
    );
}
