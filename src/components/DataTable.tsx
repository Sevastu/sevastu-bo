"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableProps<T> {
    data: T[];
    columns: { key: keyof T; label: string; render?: (item: T) => React.ReactNode }[];
    total: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
    onSearch: (search: string) => void;
    isLoading?: boolean;
}

export function DataTable<T>({
    data,
    columns,
    total,
    page,
    limit,
    onPageChange,
    onSearch,
    isLoading,
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");

    const rows = Array.isArray(data) ? data : [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const totalPages = Math.ceil(total / limit) || 1;

    return (
        <div className="bg-card rounded-xl shadow-md border border-border/50 overflow-hidden transition-all">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-card/50 backdrop-blur-sm">
                <form onSubmit={handleSearch} className="relative w-72 group">
                    <Input
                        type="text"
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-10 bg-muted/50 border-none focus-visible:ring-primary/30 transition-all rounded-lg"
                    />
                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3 group-focus-within:text-primary transition-colors" />
                </form>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-muted-foreground uppercase tracking-wider bg-muted/30 border-b border-border/50">
                            {columns.map((col) => (
                                <th key={col.key as string} className="px-6 py-4 font-semibold">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        <span className="text-muted-foreground font-medium">Fetching data...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Search className="w-8 h-8 opacity-20" />
                                        <span className="font-medium">No results found matching your search.</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((item, rowIndex) => (
                                <tr 
                                    key={rowIndex} 
                                    className="hover:bg-primary/5 transition-colors group cursor-default"
                                >
                                    {columns.map((col) => (
                                        <td key={col.key as string} className="px-6 py-4 text-foreground/80 group-hover:text-foreground font-medium transition-colors">
                                            {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-border/50 bg-card/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Page <span className="text-foreground">{page}</span> of <span className="text-foreground">{totalPages}</span>
                    </span>
                    <span className="text-xs text-muted-foreground/60 px-2 py-0.5 bg-muted rounded-full">
                        {total} total records
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1 || isLoading}
                        className="h-9 px-3 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages || isLoading}
                        className="h-9 px-3 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
                    >
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
