import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';

export function CustomerHeader() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-text tracking-tight">Customers</h1>
                <p className="text-muted-foreground mt-2 max-w-xl">
                    Manage and monitor customer activity and accounts across the platform.
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm hidden sm:flex">
                    <Upload className="w-4 h-4 mr-2" /> Import
                </Button>
                <Button variant="outline" className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm hidden sm:flex">
                    <Download className="w-4 h-4 mr-2" /> Export
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm transition-all duration-200 ease-out">
                    <Plus className="w-4 h-4 mr-2" /> Add Customer
                </Button>
            </div>
        </div>
    );
}
