import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubServiceFiltersState } from '../types/subService-ui.types';
import { Service } from '@/features/services/types';

interface SubServiceFiltersProps {
    filters: SubServiceFiltersState;
    setFilters: React.Dispatch<React.SetStateAction<SubServiceFiltersState>>;
    services: Service[];
}

export function SubServiceFilters({ filters, setFilters, services }: SubServiceFiltersProps) {
    const handleClearFilters = () => {
        setFilters({
            search: '',
            parentService: 'all',
            status: 'all',
            priceType: 'all'
        });
    };

    const hasActiveFilters = filters.search !== '' || filters.parentService !== 'all' || filters.status !== 'all' || filters.priceType !== 'all';

    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-10">
            <div className="relative w-full md:w-96 debounce={300}">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    placeholder="Search sub-services..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-9 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-blue-500 h-10 w-full"
                />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 h-10">
                    <Filter className="w-4 h-4 text-slate-400 mr-2" />
                    <Select
                        value={filters.parentService}
                        onValueChange={(val) => setFilters(prev => ({ ...prev, parentService: val }))}
                    >
                        <SelectTrigger className="w-[160px] border-none bg-transparent shadow-none focus:ring-0 px-0 h-auto">
                            <SelectValue placeholder="Parent Service" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Services</SelectItem>
                            {services.map(s => (
                                <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Select
                    value={filters.status}
                    onValueChange={(val) => setFilters(prev => ({ ...prev, status: val }))}
                >
                    <SelectTrigger className="w-[130px] bg-slate-50 border-slate-200 rounded-xl h-10">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.priceType}
                    onValueChange={(val) => setFilters(prev => ({ ...prev, priceType: val }))}
                >
                    <SelectTrigger className="w-[130px] bg-slate-50 border-slate-200 rounded-xl h-10">
                        <SelectValue placeholder="Price Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                        <SelectItem value="range">Range</SelectItem>
                    </SelectContent>
                </Select>

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        onClick={handleClearFilters}
                        className="text-slate-500 hover:text-slate-700 h-10 px-3 rounded-xl"
                    >
                        <X className="w-4 h-4 mr-2" /> Clear
                    </Button>
                )}
            </div>
        </div>
    );
}
