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
    let healthColor = 'bg-muted text-muted-foreground border-border';
    let healthLabel = 'No Data';

    if (category.status === 'active' && serviceCount > 0) {
        healthColor = 'bg-success/10 text-success border-success/20';
        healthLabel = 'Healthy';
    } else if (category.status === 'active' && serviceCount === 0) {
        healthColor = 'bg-warning/10 text-warning border-warning/20';
        healthLabel = 'Needs Services';
    } else if (category.status === 'inactive') {
        healthColor = 'bg-destructive/10 text-destructive border-destructive/20';
        healthLabel = 'Inactive';
    }

    const CATEGORY_ACTIONS = [
        { label: "Edit Category", icon: Edit, action: () => onEdit(category), className: "text-foreground hover:bg-muted" },
        { label: "View Services", icon: Layers, action: () => router.push(`/services?categoryId=${category._id}`), className: "text-foreground hover:bg-muted" },
        { label: "Duplicate Category", icon: Copy, action: () => {}, className: "text-foreground hover:bg-muted" },
        { label: "Archive Category", icon: Archive, action: () => {}, className: "text-foreground hover:bg-muted" },
        { label: "Delete Category", icon: Trash2, action: () => onDelete(category), className: "text-destructive hover:bg-destructive/10" }
    ];

    return (
        <div className="group bg-card rounded-lg shadow-sm border border-border/20 overflow-hidden hover:-translate-y-1 hover: hover:shadow-lg transition-all duration-300 ease-out flex flex-col h-full">
            {/* Image Header */}
            <div className="relative aspect-[16/9] bg-muted overflow-hidden shrink-0">
                <img
                    src={category.imageUrl || FALLBACK_IMAGE}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

                {/* Floating Icon */}
                <div className="absolute bottom-26 left-4 w-12 h-12 bg-card rounded-xl shadow-md flex items-center justify-center border border-border group-hover:shadow-primary/20 group-hover:shadow-lg transition-shadow duration-300 z-10">
                    {renderIcon(category.icon || category.iconKey)}
                </div>

                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <Badge variant="secondary" className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md backdrop-blur-md ${category.status === 'active' ? 'bg-success/90 text-primary-foreground border-none' : 'bg-muted/80 text-foreground border-none'}`}>
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
            <div className="pt-8 px-6 pb-6 flex-1 flex flex-col bg-card">
                <div className="flex justify-between items-start mb-2">
                    <div className="pr-4">
                        <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                            {category.name}
                        </h3>
                    </div>
                    <Dropdown
                        className="w-48 bg-card shadow-lg rounded-xl border border-border z-20 overflow-hidden"
                        trigger={
                            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors -mr-2">
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

                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1 leading-relaxed">
                    {category.description || 'No description provided for this category.'}
                </p>

                {/* Metrics */}
                <div className="flex gap-3 mb-6 rounded-lg p-3 border border-border/20">
                    <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-foreground">{serviceCount}</div>
                        <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Services</div>
                    </div>
                    <div className="w-px bg-border my-2"></div>
                    <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-foreground">{subServiceCount}</div>
                        <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Sub-services</div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-5 border-t border-border flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEdit(category)} className="rounded-lg h-9 px-4 text-sm font-medium border-border hover:bg-muted hover:text-foreground shadow-sm">
                            Edit
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => router.push(`/services?categoryId=${category._id}`)} className="rounded-lg h-9 px-4 text-sm font-medium bg-muted hover:bg-muted/80 text-foreground shadow-sm">
                            View Services
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
