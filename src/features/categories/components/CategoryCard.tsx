import React from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/features/categories/categories.service';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Copy, Archive, Trash2, Layers } from 'lucide-react';
import { FALLBACK_IMAGE } from '../utils/constants';
import { renderIcon } from '../utils/categoryHelpers';

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
    const router = useRouter();

    const serviceCount = category.serviceCount || 0;
    const subServiceCount = category.subServiceCount || 0;

    // Health indicators logic
    let healthColor = 'bg-slate-100 text-slate-600 border-slate-200';
    let healthLabel = 'No Data';

    if (category.status === 'active' && serviceCount > 0) {
        healthColor = 'bg-green-50 text-green-700 border-green-200';
        healthLabel = 'Healthy';
    } else if (category.status === 'active' && serviceCount === 0) {
        healthColor = 'bg-amber-50 text-amber-700 border-amber-200';
        healthLabel = 'Needs Services';
    } else if (category.status === 'inactive') {
        healthColor = 'bg-red-50 text-red-700 border-red-200';
        healthLabel = 'Inactive';
    }

    const CATEGORY_ACTIONS = [
        { label: "Edit Category", icon: Edit, action: () => onEdit(category), className: "text-slate-700 hover:bg-slate-50" },
        { label: "View Services", icon: Layers, action: () => router.push(`/services?categoryId=${category._id}`), className: "text-slate-700 hover:bg-slate-50" },
        { label: "Duplicate Category", icon: Copy, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Archive Category", icon: Archive, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Delete Category", icon: Trash2, action: () => onDelete(category), className: "text-red-600 hover:bg-red-50" }
    ];

    return (
        <div className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(41,52,61,0.04)] border border-slate-100 overflow-hidden hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg transition-all duration-300 ease-out flex flex-col h-full">
            {/* Image Header */}
            <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden shrink-0">
                <img
                    src={category.imageUrl || FALLBACK_IMAGE}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-80" />

                {/* Floating Icon */}
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border border-slate-50 group-hover:shadow-blue-100 group-hover:shadow-lg transition-shadow duration-300 z-10">
                    {renderIcon(category.icon || category.iconKey)}
                </div>

                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <Badge variant="secondary" className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md backdrop-blur-md ${category.status === 'active' ? 'bg-green-500/90 text-white border-none' : 'bg-slate-800/80 text-white border-none'}`}>
                        {category.status === 'active' ? 'Active' : 'Inactive'}
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
            <div className="pt-8 px-6 pb-6 flex-1 flex flex-col bg-white">
                <div className="flex justify-between items-start mb-2">
                    <div className="pr-4">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {category.name}
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
                            {CATEGORY_ACTIONS.map((action, idx) => (
                                <button key={idx} onClick={action.action} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors ${action.className}`}>
                                    <action.icon className="w-4 h-4 mr-2.5 opacity-70" /> {action.label}
                                </button>
                            ))}
                        </div>
                    </Dropdown>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
                    {category.description || 'No description provided for this category.'}
                </p>

                {/* Metrics */}
                <div className="flex gap-3 mb-6 bg-slate-50/50 rounded-xl p-3 border border-slate-100/50">
                    <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-slate-700">{serviceCount}</div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Services</div>
                    </div>
                    <div className="w-px bg-slate-200 my-2"></div>
                    <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-slate-700">{subServiceCount}</div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Sub-services</div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEdit(category)} className="rounded-lg h-9 px-4 text-sm font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm">
                            Edit
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => router.push(`/services?categoryId=${category._id}`)} className="rounded-lg h-9 px-4 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm">
                            View Services
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
