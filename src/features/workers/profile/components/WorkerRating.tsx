import { Star, StarHalf } from "lucide-react";
import React from "react";

interface WorkerRatingProps {
  rating: number;
  showText?: boolean;
}

export const WorkerRating = React.memo(function WorkerRating({ rating, showText = true }: WorkerRatingProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<StarHalf key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-slate-200 fill-slate-200" />);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      {showText && <span className="text-sm font-semibold text-slate-900">{rating.toFixed(1)}</span>}
    </div>
  );
});
