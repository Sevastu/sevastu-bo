import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';

interface CategoriesHeaderProps {
    onCreateCategory: () => void;
}

export function CategoriesHeader({ onCreateCategory }: CategoriesHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Total Categories</h1>
                <p className="text-muted-foreground mt-2 max-w-xl">
                    Manage marketplace categories and organize services effectively.
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm hidden sm:flex">
                    <Upload className="w-4 h-4 mr-2" /> Import
                </Button>
                <Button variant="outline" className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm hidden sm:flex">
                    <Download className="w-4 h-4 mr-2" /> Export
                </Button>
                <Button
                    onClick={onCreateCategory}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm transition-all duration-200 ease-out"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Category
                </Button>
            </div>
        </div>
    );
}
