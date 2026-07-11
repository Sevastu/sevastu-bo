import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ShieldCheck, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

interface AutomationOverviewProps {
  policies: any[];
  isLoading: boolean;
}

export const AutomationOverview: React.FC<AutomationOverviewProps> = ({ policies, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardContent className="h-24 bg-gray-100 p-4"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate metrics based on policies array
  const total = policies.length;
  const active = policies.filter(p => p.status === 'ACTIVE').length;
  const inactive = total - active;
  // Mock failed executions for the dashboard (would come from a metric API in reality)
  const failedExecutions = Math.floor(Math.random() * 5); 

  const healthScore = total === 0 ? 100 : Math.max(0, 100 - (failedExecutions * 5) - (inactive * 2));

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      
      <Card className="bg-indigo-50/50 border-indigo-100">
        <CardContent className="p-4 flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Total Rules</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{total}</div>
        </CardContent>
      </Card>

      <Card className="bg-green-50/50 border-green-100">
        <CardContent className="p-4 flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Active</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{active}</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4 flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Inactive</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{inactive}</div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50/50 border-orange-100">
        <CardContent className="p-4 flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Failed Execs</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{failedExecutions}</div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50/50 border-blue-100">
        <CardContent className="p-4 flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Health</span>
          </div>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-black text-blue-900 tracking-tighter">{healthScore}%</div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
