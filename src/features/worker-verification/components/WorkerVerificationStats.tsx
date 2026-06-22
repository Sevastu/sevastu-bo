import React, { memo } from 'react';
import { Clock, CheckCircle, XCircle, Users, Activity } from 'lucide-react';
import { WorkerVerificationStats as StatsType } from '../hooks/useWorkerVerificationStats';

interface WorkerVerificationStatsProps {
  stats: StatsType;
}

export const WorkerVerificationStats = memo(function WorkerVerificationStats({ stats }: WorkerVerificationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-amber-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-600/80 uppercase tracking-wider mb-1">Pending Reviews</p>
            <p className="text-3xl font-black text-amber-900">{stats.pending}</p>
          </div>
          <div className="p-3 bg-amber-100 rounded-xl">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-emerald-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-600/80 uppercase tracking-wider mb-1">Approved</p>
            <p className="text-3xl font-black text-emerald-900">{stats.approved}</p>
          </div>
          <div className="p-3 bg-emerald-100 rounded-xl">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-rose-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-rose-600/80 uppercase tracking-wider mb-1">Rejected</p>
            <p className="text-3xl font-black text-rose-900">{stats.rejected}</p>
          </div>
          <div className="p-3 bg-rose-100 rounded-xl">
            <XCircle className="h-6 w-6 text-rose-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-600/80 uppercase tracking-wider mb-1">Total Workers</p>
            <p className="text-3xl font-black text-slate-900">{stats.total}</p>
          </div>
          <div className="p-3 bg-slate-200 rounded-xl">
            <Users className="h-6 w-6 text-slate-600" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-blue-600/80 uppercase tracking-wider mb-1">Success Rate</p>
            <p className="text-3xl font-black text-blue-900">{stats.successRate}%</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-xl">
            <Activity className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
});
