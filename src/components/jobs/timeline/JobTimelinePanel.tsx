"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TimelineRepository } from "@/features/fulfillment/repositories/timeline.repository";
import { TimelineEvent } from "@/features/fulfillment/types/timeline.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, RefreshCw, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

const timelineRepository = new TimelineRepository();

interface JobTimelinePanelProps {
  jobId: string;
}

// Event type to icon mapping
const getEventIcon = (event: string) => {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('create') || eventLower.includes('open')) {
    return "●";
  }
  if (eventLower.includes('assign') || eventLower.includes('match')) {
    return "●";
  }
  if (eventLower.includes('schedule')) {
    return "●";
  }
  if (eventLower.includes('start') || eventLower.includes('progress')) {
    return "●";
  }
  if (eventLower.includes('complete') || eventLower.includes('finish')) {
    return "●";
  }
  if (eventLower.includes('cancel')) {
    return "●";
  }
  return "●";
};

// Event type to color mapping
const getEventColor = (event: string) => {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('create') || eventLower.includes('open')) {
    return "bg-blue-500";
  }
  if (eventLower.includes('assign') || eventLower.includes('match')) {
    return "bg-purple-500";
  }
  if (eventLower.includes('schedule')) {
    return "bg-cyan-500";
  }
  if (eventLower.includes('start') || eventLower.includes('progress')) {
    return "bg-orange-500";
  }
  if (eventLower.includes('complete') || eventLower.includes('finish')) {
    return "bg-green-500";
  }
  if (eventLower.includes('cancel')) {
    return "bg-red-500";
  }
  return "bg-gray-500";
};

export const JobTimelinePanel: React.FC<JobTimelinePanelProps> = ({ jobId }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadTimeline = useCallback(async (pageNum = 1, append = false) => {
    if (!jobId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await timelineRepository.getTimeline(jobId, {
        page: pageNum,
        limit: 20,
        sort: 'createdAt',
        order: 'desc'
      } as any);
      
      const newData = response.data || [];
      if (append) {
        setEvents(prev => {
          const combined = [...prev, ...newData];
          const totalCount = response.pagination?.total ?? combined.length;
          setTotal(totalCount);
          setHasMore(combined.length < totalCount);
          return combined;
        });
      } else {
        setEvents(newData);
        const totalCount = response.pagination?.total ?? newData.length;
        setTotal(totalCount);
        setHasMore(newData.length < totalCount);
      }
    } catch (err) {
      setError("Failed to load timeline events. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadTimeline(1, false);
  }, [loadTimeline]);

  const handleRefresh = () => {
    setPage(1);
    loadTimeline(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadTimeline(nextPage, true);
  };

  const toggleExpand = (eventId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  if (loading && events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" /> Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-muted/60 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-muted/60 animate-pulse rounded" />
                  <div className="h-3 w-48 bg-muted/60 animate-pulse rounded" />
                  <div className="h-3 w-24 bg-muted/60 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" /> Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-4" onClick={handleRefresh}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" /> Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-xl text-center">
            <p className="text-muted-foreground font-medium">No Timeline Events</p>
            <p className="text-xs text-muted-foreground mt-1">Timeline will update as the job progresses.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" /> Timeline
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="h-8 w-8 p-0"
            aria-label="Refresh timeline"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              {/* Timeline line and icon */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs",
                  getEventColor(event.event)
                )}>
                  {getEventIcon(event.event)}
                </div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-12 bg-border/50 mt-2" />
                )}
              </div>

              {/* Event content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{event.event}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(new Date(event.createdAt), "dd MMM, hh:mm a")}
                    </p>
                    {event.actorType && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.actorType}: {event.actorId || '-'}
                      </p>
                    )}
                    {event.description && (
                      <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                    )}
                  </div>
                  
                  {event.metadata && Object.keys(event.metadata).length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(event.id)}
                      className="h-6 w-6 p-0"
                      aria-label={expandedItems.has(event.id) ? "Collapse details" : "Expand details"}
                    >
                      {expandedItems.has(event.id) ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Expandable metadata */}
                {event.metadata && Object.keys(event.metadata).length > 0 && expandedItems.has(event.id) && (
                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Metadata</p>
                    <pre className="text-xs text-foreground/80 whitespace-pre-wrap">
                      {JSON.stringify(event.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More button */}
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};