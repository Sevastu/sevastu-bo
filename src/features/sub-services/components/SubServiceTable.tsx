import React from 'react';
import { SubService } from '@/features/services/types';
import { DataTable } from '@/components/DataTable';
import { PriceBadge } from './PriceBadge';
import { SubServiceStatusBadge } from './SubServiceStatusBadge';
import { SubServiceActionsDropdown } from './SubServiceActionsDropdown';

interface SubServiceTableProps {
    data: SubService[];
    onEdit: (subService: SubService) => void;
    onToggleStatus: (id: string, currentStatus: boolean) => void;
    isAdmin: boolean;
}

export function SubServiceTable({ data, onEdit, onToggleStatus, isAdmin }: SubServiceTableProps) {
    const columns: any[] = [
        {
            key: "name",
            label: "Sub-Service",
            render: (item: SubService) => (
                <div className="font-semibold text-slate-900">{item.name}</div>
            )
        },
        {
            key: "serviceId",
            label: "Parent Service",
            render: (item: SubService) => (
                <div className="text-slate-600">
                    {typeof item.serviceId === 'string' ? item.serviceId : item.serviceId?.name}
                </div>
            )
        },
        {
            key: "basePrice",
            label: "Pricing",
            render: (item: SubService) => (
                <PriceBadge basePrice={item.basePrice} priceType={item.priceType} />
            )
        },
        {
            key: "isActive",
            label: "Status",
            render: (item: SubService) => (
                <div className="flex items-center">
                    <SubServiceStatusBadge isActive={item.isActive} />
                </div>
            )
        },
        {
            key: "createdAt",
            label: "Added On",
            render: (item: SubService) => (
                <div className="text-slate-500 text-sm">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    }) : '-'}
                </div>
            )
        },
        {
            key: "actions",
            label: "Actions",
            render: (item: SubService) => (
                <SubServiceActionsDropdown
                    subService={item}
                    onEdit={onEdit}
                    onToggleStatus={onToggleStatus}
                    isAdmin={isAdmin}
                />
            )
        }
    ];

    return (
        <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <DataTable
                data={data}
                columns={columns}
                total={data.length}
                page={1}
                limit={data.length}
                onPageChange={() => {}}
                onSearch={() => {}}
                isLoading={false}
            />
        </div>
    );
}
