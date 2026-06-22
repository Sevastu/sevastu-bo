import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';

export function WorkerHeader() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Worker Management</h1>
                <p className="text-slate-500 mt-2 max-w-xl">
                    Manage and monitor service providers across the platform.
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm hidden sm:flex">
                    <Upload className="w-4 h-4 mr-2" /> Import
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm hidden sm:flex">
                    <Download className="w-4 h-4 mr-2" /> Export
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all duration-200 ease-out">
                    <Plus className="w-4 h-4 mr-2" /> Onboard Worker
                </Button>
            </div>
        </div>
    );
}
