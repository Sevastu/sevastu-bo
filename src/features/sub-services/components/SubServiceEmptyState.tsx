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
        <div className="bg-card rounded-2xl border border-dashed border-border flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6">
                {isFiltered ? (
                    <SearchX className="w-8 h-8 text-muted-foreground" />
                ) : (
                    <Layers className="w-8 h-8 text-muted-foreground" />
                )}
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-2">
                {isFiltered ? 'No Sub-Services Found' : 'No Sub-Services Yet'}
            </h3>
            
            <p className="text-muted-foreground max-w-sm mb-8">
                {isFiltered 
                    ? "We couldn't find any sub-services matching your current filters. Try adjusting your search or filters." 
                    : "You haven't created any sub-services yet. Add your first sub-service offering to get started."}
            </p>

            <div className="flex gap-3">
                {isFiltered && (
                    <Button 
                        variant="outline" 
                        onClick={onClearFilters}
                        className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm"
                    >
                        Clear Filters
                    </Button>
                )}
                {!isFiltered && isAdmin && (
                    <Button 
                        onClick={onCreateSubService}
                        className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    >
                        Add Sub-Service
                    </Button>
                )}
            </div>
        </div>
    );
}
