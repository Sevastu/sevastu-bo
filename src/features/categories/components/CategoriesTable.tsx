import React from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/features/categories/categories.service';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { MoreVertical, Edit, Copy, Archive, Trash2, Layers } from 'lucide-react';
import { FALLBACK_IMAGE } from '../utils/constants';
import { renderIcon, timeAgo } from '../utils/categoryHelpers';

interface CategoriesTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export function CategoriesTable({ categories, onEdit, onDelete }: CategoriesTableProps) {
    const router = useRouter();

    const getActions = (category: Category) => [
        { label: "Edit Category", icon: Edit, action: () => onEdit(category), className: "text-slate-700 hover:bg-slate-50" },
        { label: "View Services", icon: Layers, action: () => router.push(`/services?categoryId=${category._id}`), className: "text-slate-700 hover:bg-slate-50" },
        { label: "Duplicate Category", icon: Copy, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Archive Category", icon: Archive, action: () => {}, className: "text-slate-700 hover:bg-slate-50" },
        { label: "Delete Category", icon: Trash2, action: () => onDelete(category), className: "text-red-600 hover:bg-red-50" }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-2xl">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Services</th>
                            <th className="px-6 py-4 text-center">Sub-services</th>
                            <th className="px-6 py-4">Created</th>
                            <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {categories.map(category => (
                            <tr key={category._id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                            <img
                                                src={category.imageUrl || FALLBACK_IMAGE}
                                                alt={category.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                                <div className="w-4 h-4 opacity-70">{renderIcon(category.icon || category.iconKey, "w-full h-full")}</div>
                                                {category.name}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">
                                                {category.description ? (
                                                    <span className="line-clamp-1 max-w-[200px]">{category.description}</span>
                                                ) : 'No description'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="secondary" className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${category.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : 'bg-slate-100 text-slate-600 hover:bg-slate-100 border-none'}`}>
                                        {category.status === 'active' ? 'Active' : 'Inactive'}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-center font-medium text-slate-700">
                                    {category.serviceCount || 0}
                                </td>
                                <td className="px-6 py-4 text-center font-medium text-slate-700">
                                    {category.subServiceCount || 0}
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                    {category.createdAt ? timeAgo(category.createdAt) : '-'}
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
                                            {getActions(category).map((action, idx) => (
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
