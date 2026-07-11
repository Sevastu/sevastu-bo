"use client";

import React, { useState, useEffect, useCallback } from "react";
import { RecommendationApi } from "@/features/fulfillment/repositories/recommendation.api";
import { Recommendation, RecommendationStatus } from "@/features/fulfillment/types/recommendation.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { recommendationStatusColors } from "@/lib/status-colors";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const recommendationApi = new RecommendationApi();

interface RecommendationPanelProps {
  jobId: string;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ jobId }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'accept' | 'decline' | null;
    recommendationId: string | null;
  }>({ open: false, action: null, recommendationId: null });

  const loadRecommendations = useCallback(async () => {
    if (!jobId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await recommendationApi.getRecommendations(jobId);
      setRecommendations(data);
    } catch (err) {
      setError("Failed to load recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  const handleAction = async (recommendationId: string, action: 'accept' | 'decline') => {
    setProcessingId(recommendationId);
    try {
      if (action === 'accept') {
        await recommendationApi.acceptRecommendation(jobId, recommendationId);
      } else {
        await recommendationApi.declineRecommendation(jobId, recommendationId);
      }
      await loadRecommendations();
    } catch (err) {
      setError(`Failed to ${action} recommendation. Please try again.`);
    } finally {
      setProcessingId(null);
      setConfirmDialog({ open: false, action: null, recommendationId: null });
    }
  };

  if (loading && recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-4 h-4" /> Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 rounded-xl bg-muted/60 animate-pulse" />
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
            <User className="w-4 h-4" /> Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-4" onClick={loadRecommendations}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-4 h-4" /> Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-xl text-center">
            <p className="text-muted-foreground font-medium">No Recommendations Available</p>
            <p className="text-xs text-muted-foreground mt-1">The system is still matching workers to this job.</p>
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
            <User className="w-4 h-4" /> Recommendations
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadRecommendations}
            disabled={loading}
            className="h-8 w-8 p-0"
            aria-label="Refresh recommendations"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Worker #{rec.workerId?.slice(-4) || '-'}</span>
                    <Badge className={cn("px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[8px] border shadow-none", recommendationStatusColors[rec.status])}>
                      {rec.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(new Date(rec.createdAt), "dd MMM, hh:mm a")}
                    </span>
                    {rec.score && (
                      <span>Score: {rec.score}</span>
                    )}
                  </div>
                </div>
                
                {rec.status === RecommendationStatus.PENDING && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:text-green-500"
                      onClick={() => setConfirmDialog({ open: true, action: 'accept', recommendationId: rec.id })}
                      disabled={processingId === rec.id}
                      aria-label={`Accept recommendation for worker ${rec.workerId?.slice(-4)}`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:text-red-500"
                      onClick={() => setConfirmDialog({ open: true, action: 'decline', recommendationId: rec.id })}
                      disabled={processingId === rec.id}
                      aria-label={`Decline recommendation for worker ${rec.workerId?.slice(-4)}`}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.action === 'accept' ? "Accept Recommendation" : "Decline Recommendation"}
        description={
          confirmDialog.action === 'accept'
            ? "This will assign the worker to the job. Are you sure you want to proceed?"
            : "This will reject the worker recommendation. Are you sure you want to proceed?"
        }
        onConfirm={() => {
          if (confirmDialog.recommendationId && confirmDialog.action) {
            handleAction(confirmDialog.recommendationId, confirmDialog.action);
          }
        }}
        isProcessing={processingId !== null}
      />
    </Card>
  );
};