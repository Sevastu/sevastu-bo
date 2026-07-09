import React from 'react';
import { CustomerSkeleton } from './CustomerSkeleton';
import { GRID_CLASSES } from '../constants/grid.constants';

export function CustomerGridLoading() {
    return (
        <div className={GRID_CLASSES}>
            {[...Array(8)].map((_, i) => <CustomerSkeleton key={i} />)}
        </div>
    );
}
