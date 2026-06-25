import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, Settings } from 'lucide-react';

interface SubServiceHeaderProps {
    onCreateSubService: () => void;
    isAdmin: boolean;
}

export function SubServiceHeader({ onCreateSubService, isAdmin }: SubServiceHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
                <nav className="flex items-center text-sm font-medium text-slate-500 mb-2">
                    <span className="hover:text-slate-900 cursor-pointer">Categories</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-slate-900 cursor-pointer">Services</span>
                    <span className="mx-2">/</span>
                    <span className="text-slate-900">Sub-Services</span>
                </nav>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Sub-Service Management
                </h1>
                <p className="text-slate-500 mt-2 max-w-xl">
                    Manage detailed service offerings, granular pricing models, and configurations for marketplace services.
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm hidden sm:flex">
                    <Upload className="w-4 h-4 mr-2" /> Import
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm hidden sm:flex">
                    <Download className="w-4 h-4 mr-2" /> Export
                </Button>
                {isAdmin && (
                    <Button
                        onClick={onCreateSubService}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all duration-200 ease-out"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Sub-Service
                    </Button>
                )}
            </div>
        </div>
    );
}
