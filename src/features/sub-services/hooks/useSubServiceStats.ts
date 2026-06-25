import { useMemo } from 'react';
import { SubService } from '@/features/services/types';

export function useSubServiceStats(subServices: SubService[]) {
    return useMemo(() => {
        const total = subServices.length;
        const active = subServices.filter(s => s.isActive).length;
        const inactive = total - active;
        
        const fixed = subServices.filter(s => s.priceType === 'fixed').length;
        const range = subServices.filter(s => s.priceType === 'range').length;

        const validPrices = subServices.filter(s => s.basePrice !== undefined && s.basePrice !== null).map(s => s.basePrice);
        const avgBasePrice = validPrices.length > 0 ? validPrices.reduce((a, b) => a + b, 0) / validPrices.length : 0;

        return {
            total,
            active,
            inactive,
            fixed,
            range,
            avgBasePrice: Math.round(avgBasePrice)
        };
    }, [subServices]);
}
