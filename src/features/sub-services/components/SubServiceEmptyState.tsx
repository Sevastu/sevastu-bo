import React from 'react';
import { Layers, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubServiceEmptyStateProps {
    isFiltered: boolean;
    onClearFilters: () => void;
    onCreateSubService: () => void;
    isAdmin: boolean;
}

export function SubServiceEmptyState({ isFiltered, onClearFilters, onCreateSubService, isAdmin }: SubServiceEmptyStateProps) {
    return (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                {isFiltered ? (
                    <SearchX className="w-8 h-8 text-slate-400" />
                ) : (
                    <Layers className="w-8 h-8 text-slate-400" />
                )}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isFiltered ? 'No Sub-Services Found' : 'No Sub-Services Yet'}
            </h3>
            
            <p className="text-slate-500 max-w-sm mb-8">
                {isFiltered 
                    ? "We couldn't find any sub-services matching your current filters. Try adjusting your search or filters." 
                    : "You haven't created any sub-services yet. Add your first sub-service offering to get started."}
            </p>

            <div className="flex gap-3">
                {isFiltered && (
                    <Button 
                        variant="outline" 
                        onClick={onClearFilters}
                        className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
                    >
                        Clear Filters
                    </Button>
                )}
                {!isFiltered && isAdmin && (
                    <Button 
                        onClick={onCreateSubService}
                        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    >
                        Add Sub-Service
                    </Button>
                )}
            </div>
        </div>
    );
}
