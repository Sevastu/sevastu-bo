import React from 'react';
import { SubService } from '@/features/services/types';
import { Card, CardContent } from '@/components/ui/card';
import { PriceBadge } from './PriceBadge';
import { SubServiceStatusBadge } from './SubServiceStatusBadge';
import { SubServiceActionsDropdown } from './SubServiceActionsDropdown';

interface SubServiceCardProps {
    subService: SubService;
    onEdit: (subService: SubService) => void;
    onToggleStatus: (id: string, currentStatus: boolean) => void;
    isAdmin: boolean;
}

export function SubServiceCard({ subService, onEdit, onToggleStatus, isAdmin }: SubServiceCardProps) {
    return (
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl overflow-hidden bg-white mb-4 lg:hidden">
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{subService.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">
                            {typeof subService.serviceId === 'string' ? subService.serviceId : subService.serviceId?.name}
                        </p>
                    </div>
                    <SubServiceActionsDropdown
                        subService={subService}
                        onEdit={onEdit}
                        onToggleStatus={onToggleStatus}
                        isAdmin={isAdmin}
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Pricing</p>
                        <PriceBadge basePrice={subService.basePrice} priceType={subService.priceType} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Status</p>
                        <SubServiceStatusBadge isActive={subService.isActive} />
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                        Added {subService.createdAt ? new Date(subService.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        }) : '-'}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
