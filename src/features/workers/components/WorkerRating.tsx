import React from 'react';
import { Star } from 'lucide-react';

export function WorkerRating({ rating }: { rating: number }) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<Star key={i} className="w-3.5 h-3.5 fill-yellow-200 text-yellow-400" />);
        } else {
            stars.push(<Star key={i} className="w-3.5 h-3.5 text-slate-200" />);
        }
    }
    
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex">{stars}</div>
            <span className="text-sm font-semibold text-slate-700">{rating > 0 ? rating.toFixed(1) : 'New'}</span>
        </div>
    );
}
