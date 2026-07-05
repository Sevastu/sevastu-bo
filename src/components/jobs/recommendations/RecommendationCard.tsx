"use client";

import React from "react";
import { Recommendation, RecommendationStatus } from "@/features/fulfillment/types/recommendation.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { Star, MapPin, Calendar, Check, X } from "lucide-react";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAccept: (recommendationId: string) => void;
  onDecline: (recommendationId: string) => void;
  isActionLoading?: boolean;
}

// Status color mapping
const statusColors: Record<RecommendationStatus, string> = {
  [RecommendationStatus.PENDING]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [RecommendationStatus.INTERESTED]: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  [RecommendationStatus.ACCEPTED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [RecommendationStatus.DECLINED]: "bg-red-500/10 text-red-500 border-red-500/20",
  [RecommendationStatus.EXPIRED]: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

// Check if actions should be disabled
const isActionDisabled = (status: RecommendationStatus): boolean => {
  return status === RecommendationStatus.ACCEPTED || 
         status === RecommendationStatus.DECLINED || 
         status === RecommendationStatus.EXPIRED;
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onAccept,
  onDecline,
  isActionLoading = false,
}) => {
  const {
    id,
    workerName,
    workerRating,
    score,
    distance,
    availability,
    status,
    expiresAt,
    createdAt,
  } = recommendation;

  const actionDisabled = isActionDisabled(status);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          {/* Header with Worker Name and Status */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-medium">{workerName || "Unknown Worker"}</h4>
              {workerRating !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{workerRating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <Badge className={cn(
              "px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[8px] border shadow-none",
              statusColors[status]
            )}>
              {status}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground uppercase tracking-widest">Score</p>
              <p className="font-medium mt-1">{score.toFixed(1)}</p>
            </div>
            {distance !== undefined && (
              <div>
                <p className="text-muted-foreground uppercase tracking-widest">Distance</p>
                <p className="font-medium mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {distance.toFixed(1)} km
                </p>
              </div>
            )}
            {availability && (
              <div>
                <p className="text-muted-foreground uppercase tracking-widest">Availability</p>
                <p className="font-medium mt-1">{availability}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground uppercase tracking-widest">Created</p>
              <p className="font-medium mt-1">
                {formatDate(new Date(createdAt), "dd MMM, hh:mm a")}
              </p>
            </div>
          </div>

          {/* Expiration Time */}
          <div className="flex items-center gap-1 text-xs">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Expires: </span>
            <span className="font-medium">
              {formatDate(new Date(expiresAt), "dd MMM, hh:mm a")}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAccept(id)}
              disabled={actionDisabled || isActionLoading}
              className="flex-1 gap-1"
            >
              <Check className="w-3 h-3" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDecline(id)}
              disabled={actionDisabled || isActionLoading}
              className="flex-1 gap-1"
            >
              <X className="w-3 h-3" />
              Decline
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};