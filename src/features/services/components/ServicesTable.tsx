import React from 'react';
import { useRouter } from 'next/navigation';
import { Service } from '@/features/services/types';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { MoreVertical, Edit, Copy, Archive, Trash2, Layers } from 'lucide-react';
import { FALLBACK_IMAGE, renderIcon, timeAgo } from '../utils';

interface ServicesTableProps {
    services: Service[];
    getCategoryName: (id: string | any) => string;
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
}

export function ServicesTable({ services, getCategoryName, onEdit, onDelete }: ServicesTableProps) {
    const router = useRouter();

    const getActions = (service: Service) => [
        { label: "Edit Service", icon: Edit, action: () => onEdit(service), className: "text-slate-700 hover:bg-slate-50" },
        { label: "View Sub-services", icon: Layers, action: () => router.push(`/sub-services?serviceId=${service._id}`), className: "text-slate-700 hover:bg-slate-50" },
        { label: "Duplicate Service", icon: Copy, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Archive Service", icon: Archive, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Delete Service", icon: Trash2, action: () => onDelete(service), className: "text-red-600 hover:bg-red-50" }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-2xl">Service</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Sub-services</th>
                            <th className="px-6 py-4 text-center">Workers</th>
                            <th className="px-6 py-4">Updated</th>
                            <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {services.map(service => (
                            <tr key={service._id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                            <img
                                                src={service.imageUrl || FALLBACK_IMAGE}
                                                alt={service.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {service.name}
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center mt-0.5">
                                                <div className="w-3 h-3 mr-1 opacity-50">{renderIcon(service.icon, "w-full h-full")}</div>
                                                {service.description ? (
                                                    <span className="line-clamp-1 max-w-[200px]">{service.description}</span>
                                                ) : 'No description'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="outline" className="text-[11px] uppercase font-semibold tracking-wider text-blue-600 bg-blue-50 border-blue-100">
                                        {getCategoryName(service.categoryId)}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="secondary" className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${service.isActive ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : 'bg-slate-100 text-slate-600 hover:bg-slate-100 border-none'}`}>
                                        {service.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-center font-medium text-slate-700">
                                    {service.subServiceCount || 0}
                                </td>
                                <td className="px-6 py-4 text-center font-medium text-slate-700">
                                    {service.activeWorkerCount || 0}
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                    {service.updatedAt ? timeAgo(service.updatedAt) : 'Just now'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Dropdown
                                        className="w-48 bg-white shadow-lg rounded-xl border border-slate-100 z-20 overflow-hidden"
                                        trigger={
                                            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        }
                                    >
                                        <div className="p-1">
                                            {getActions(service).map((action, idx) => (
                                                <button key={idx} onClick={action.action} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors ${action.className}`}>
                                                    <action.icon className="w-4 h-4 mr-2.5 opacity-70" /> {action.label}
                                                </button>
                                            ))}
                                        </div>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
