import React, { memo } from 'react';
import { Clock, CheckCircle, XCircle, Users, Activity } from 'lucide-react';
import { WorkerVerificationStats as StatsType } from '../hooks/useWorkerVerificationStats';

interface WorkerVerificationStatsProps {
  stats: StatsType;
}

export const WorkerVerificationStats = memo(function WorkerVerificationStats({ stats }: WorkerVerificationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-5 shadow-sm transition-all hover:shadow-md hover:bg-warning/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-warning/80 uppercase tracking-wider mb-1">Pending Reviews</p>
            <p className="text-3xl font-black text-foreground">{stats.pending}</p>
          </div>
          <div className="p-3 bg-warning/20 rounded-xl">
            <Clock className="h-6 w-6 text-warning" />
          </div>
        </div>
      </div>
      
      <div className="bg-success/10 border border-success/20 rounded-lg p-5 shadow-sm transition-all hover:shadow-md hover:bg-success/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-success/80 uppercase tracking-wider mb-1">Approved</p>
            <p className="text-3xl font-black text-foreground">{stats.approved}</p>
          </div>
          <div className="p-3 bg-success/20 rounded-xl">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
        </div>
      </div>
      
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-5 shadow-sm transition-all hover:shadow-md hover:bg-destructive/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-destructive/80 uppercase tracking-wider mb-1">Rejected</p>
            <p className="text-3xl font-black text-foreground">{stats.rejected}</p>
          </div>
          <div className="p-3 bg-destructive/20 rounded-xl">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
        </div>
      </div>
      
      <div className="bg-muted/50 border border-border rounded-lg p-5 shadow-sm transition-all hover:shadow-md hover:bg-muted">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground/80 uppercase tracking-wider mb-1">Total Workers</p>
            <p className="text-3xl font-black text-foreground">{stats.total}</p>
          </div>
          <div className="p-3 bg-muted rounded-xl">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-5 shadow-sm transition-all hover:shadow-md hover:bg-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-1">Success Rate</p>
            <p className="text-3xl font-black text-foreground">{stats.successRate}%</p>
          </div>
          <div className="p-3 bg-primary/20 rounded-xl">
            <Activity className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
});
