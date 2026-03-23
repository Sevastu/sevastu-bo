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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const totalPages = Math.ceil(total / limit) || 1;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <form onSubmit={handleSearch} className="relative w-64">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </form>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key as string} className="px-6 py-3 font-medium">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                    Loading data...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                    No results found.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50/50">
                                    {columns.map((col) => (
                                        <td key={col.key as string} className="px-6 py-4">
                                            {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages} (Total: {total})
                </span>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1 || isLoading}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages || isLoading}
                    >
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
