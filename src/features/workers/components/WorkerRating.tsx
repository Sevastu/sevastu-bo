import React from 'react';
import { Star } from 'lucide-react';

export function WorkerRating({ rating }: { rating: number }) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<Star key={i} className="w-3.5 h-3.5 fill-warning/50 text-warning" />);
        } else {
            stars.push(<Star key={i} className="w-3.5 h-3.5 text-muted-foreground" />);
        }
    }
    
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex">{stars}</div>
            <span className="text-sm font-semibold text-foreground">{rating > 0 ? rating.toFixed(1) : 'New'}</span>
        </div>
    );
}
