import React from 'react';
import { IndianRupee } from 'lucide-react';

interface PriceBadgeProps {
    basePrice: number;
    priceType: 'fixed' | 'range';
}

export function PriceBadge({ basePrice, priceType }: PriceBadgeProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center font-bold text-slate-900">
                <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                {basePrice.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                {priceType === 'range' ? 'Onwards' : 'Fixed'}
            </div>
        </div>
    );
}
