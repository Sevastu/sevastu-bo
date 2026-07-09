import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface CustomerEmptyStateProps {
    onClearFilters?: () => void;
    onAddCustomer?: () => void;
    hasFilters?: boolean;
}

export function CustomerEmptyState({ onClearFilters, onAddCustomer, hasFilters }: CustomerEmptyStateProps) {
    return (
        <div className="text-center py-20 bg-card rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center mt-2">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No customers found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm text-center">
                {hasFilters 
                    ? "We couldn't find any customers matching your current filters. Try adjusting your search, status, or date range." 
                    : "There are no customers in the system yet. Add your first customer to get started."}
            </p>
            <div className="flex gap-4">
                {hasFilters && onClearFilters && (
                    <Button
                        variant="outline"
                        onClick={onClearFilters}
                        className="rounded-xl border-border text-foreground hover:bg-muted"
                    >
                        Clear All Filters
                    </Button>
                )}
                {onAddCustomer && (
                    <Button
                        onClick={onAddCustomer}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm"
                    >
                        Add Customer
                    </Button>
                )}
            </div>
        </div>
    );
}
