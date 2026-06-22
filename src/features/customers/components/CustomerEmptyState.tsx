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
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center mt-2">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No customers found</h3>
            <p className="text-slate-500 mb-8 max-w-sm text-center">
                {hasFilters 
                    ? "We couldn't find any customers matching your current filters. Try adjusting your search, status, or date range." 
                    : "There are no customers in the system yet. Add your first customer to get started."}
            </p>
            <div className="flex gap-4">
                {hasFilters && onClearFilters && (
                    <Button
                        variant="outline"
                        onClick={onClearFilters}
                        className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                        Clear All Filters
                    </Button>
                )}
                {onAddCustomer && (
                    <Button
                        onClick={onAddCustomer}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm"
                    >
                        Add Customer
                    </Button>
                )}
            </div>
        </div>
    );
}
