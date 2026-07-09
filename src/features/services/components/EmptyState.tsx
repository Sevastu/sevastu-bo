import React from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

interface EmptyStateProps {
    onClearFilters?: () => void;
    onCreateService: () => void;
    hasFilters?: boolean;
}

export function EmptyState({ onClearFilters, onCreateService, hasFilters }: EmptyStateProps) {
    return (
        <div className="text-center py-20 bg-card rounded-xl shadow-sm border border-border flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No services found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm text-center">
                {hasFilters 
                    ? "We couldn't find any services matching your current filters. Try adjusting them." 
                    : "You haven't created any services yet. Create your first service to get started."}
            </p>
            <div className="flex gap-4">
                {hasFilters && onClearFilters && (
                    <Button
                        variant="outline"
                        onClick={onClearFilters}
                        className="rounded-xl border-border text-foreground hover:bg-muted"
                    >
                        Clear Filters
                    </Button>
                )}
                <Button
                    onClick={onCreateService}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm"
                >
                    Create Service
                </Button>
            </div>
        </div>
    );
}
