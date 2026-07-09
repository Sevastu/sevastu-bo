import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface CustomerDateFilterProps {
    dateRange: { from?: string; to?: string } | undefined;
    onChange: (range: { from?: string; to?: string } | undefined) => void;
}

export function CustomerDateFilter({ dateRange, onChange }: CustomerDateFilterProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-2 bg-card border border-border/20 rounded-lg shadow-sm px-3 h-10 w-full sm:w-auto">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <input
                    type="date"
                    value={dateRange?.from || ''}
                    onChange={(e) => onChange({ ...dateRange, from: e.target.value })}
                    className="bg-transparent border-none outline-none text-sm text-foreground w-full"
                    title="From Date"
                />
            </div>
            <span className="text-muted-foreground hidden sm:inline">-</span>
            <div className="flex items-center gap-2 bg-muted border border-border rounded-xl px-3 h-10 w-full sm:w-auto">
                <input
                    type="date"
                    value={dateRange?.to || ''}
                    onChange={(e) => onChange({ ...dateRange, to: e.target.value })}
                    className="bg-transparent border-none outline-none text-sm text-foreground w-full"
                    title="To Date"
                />
            </div>
            {(dateRange?.from || dateRange?.to) && (
                <Button
                    onClick={() => onChange(undefined)}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground h-10 px-3"
                >
                    Clear Dates
                </Button>
            )}
        </div>
    );
}
