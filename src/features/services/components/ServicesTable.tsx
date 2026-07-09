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
        { label: "Edit Service", icon: Edit, action: () => onEdit(service), className: "text-foreground hover:bg-muted" },
        { label: "View Sub-services", icon: Layers, action: () => router.push(`/sub-services?serviceId=${service._id}`), className: "text-foreground hover:bg-muted" },
        { label: "Duplicate Service", icon: Copy, action: () => {}, className: "text-foreground hover:bg-muted" },
        { label: "Archive Service", icon: Archive, action: () => {}, className: "text-foreground hover:bg-muted" },
        { label: "Delete Service", icon: Trash2, action: () => onDelete(service), className: "text-destructive hover:bg-destructive/10" }
    ];

    return (
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
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
                    <tbody className="divide-y divide-border">
                        {services.map(service => (
                            <tr key={service._id} className="hover:bg-muted/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-border">
                                            <img
                                                src={service.imageUrl || FALLBACK_IMAGE}
                                                alt={service.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {service.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                                                <div className="w-3 h-3 mr-1 opacity-50">{renderIcon(service.icon, "w-full h-full")}</div>
                                                {service.description ? (
                                                    <span className="line-clamp-1 max-w-[200px]">{service.description}</span>
                                                ) : 'No description'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="outline" className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-primary/10 border-primary/20">
                                        {getCategoryName(service.categoryId)}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="secondary" className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${service.isActive ? 'bg-success/10 text-success hover:bg-success/10 border-none' : 'bg-muted text-muted-foreground hover:bg-muted border-none'}`}>
                                        {service.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-center font-medium text-foreground">
                                    {service.subServiceCount || 0}
                                </td>
                                <td className="px-6 py-4 text-center font-medium text-foreground">
                                    {service.activeWorkerCount || 0}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                                    {service.updatedAt ? timeAgo(service.updatedAt) : 'Just now'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Dropdown
                                        className="w-48 bg-card shadow-lg rounded-xl border border-border z-20 overflow-hidden"
                                        trigger={
                                            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-border">
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
