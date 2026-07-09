import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react';

interface EmptyStateProps {
    onClearFilters?: () => void;
    onCreateCategory: () => void;
    hasFilters?: boolean;
}

export function EmptyState({ onClearFilters, onCreateCategory, hasFilters }: EmptyStateProps) {
    return (
        <div className="text-center py-20 bg-card rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Layers className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm text-center">
                {hasFilters 
                    ? "We couldn't find any categories matching your current filters. Try adjusting them." 
                    : "You haven't created any categories yet. Create your first category to start organizing marketplace services."}
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
                    onClick={onCreateCategory}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm"
                >
                    Create Category
                </Button>
            </div>
        </div>
    );
}
