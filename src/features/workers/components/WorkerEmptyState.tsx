import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface WorkerEmptyStateProps {
    onClearFilters?: () => void;
    onOnboardWorker?: () => void;
    hasFilters?: boolean;
}

export function WorkerEmptyState({ onClearFilters, onOnboardWorker, hasFilters }: WorkerEmptyStateProps) {
    return (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No workers found</h3>
            <p className="text-slate-500 mb-8 max-w-sm text-center">
                {hasFilters 
                    ? "We couldn't find any workers matching your current filters. Try adjusting your search or status." 
                    : "There are no workers in the system yet. Onboard your first worker to get started."}
            </p>
            <div className="flex gap-4">
                {hasFilters && onClearFilters && (
                    <Button
                        variant="outline"
                        onClick={onClearFilters}
                        className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                        Clear Filters
                    </Button>
                )}
                {onOnboardWorker && (
                    <Button
                        onClick={onOnboardWorker}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm"
                    >
                        Onboard Worker
                    </Button>
                )}
            </div>
        </div>
    );
}
