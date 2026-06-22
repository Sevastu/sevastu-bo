import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, Settings } from 'lucide-react';
import { Category } from '@/features/services/types';

interface ServicesHeaderProps {
    isCategoryMode: boolean;
    activeCategory?: Category;
    onCreateService: () => void;
}

export function ServicesHeader({ isCategoryMode, activeCategory, onCreateService }: ServicesHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {isCategoryMode 
                        ? (activeCategory ? activeCategory.name : 'Loading Category...') 
                        : 'All Services'}
                </h1>
                <p className="text-slate-500 mt-2 max-w-xl">
                    {isCategoryMode 
                        ? 'Manage services and their configurations within this specific category.' 
                        : 'Manage all marketplace services across every category. Use filters to quickly find what you need.'}
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm hidden sm:flex">
                    <Upload className="w-4 h-4 mr-2" /> Import
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm hidden sm:flex">
                    <Download className="w-4 h-4 mr-2" /> Export
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm hidden lg:flex">
                    <Settings className="w-4 h-4 mr-2" /> Bulk Actions
                </Button>
                <Button
                    onClick={onCreateService}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all duration-200 ease-out"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Service
                </Button>
            </div>
        </div>
    );
}
