import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, HeartPulse, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkflowInsightsProps {
  health: any;
  stageDurations: any;
  isLoading: boolean;
}

export const WorkflowInsights: React.FC<WorkflowInsightsProps> = ({ health, stageDurations, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workflow Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 animate-pulse">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="h-8 bg-gray-100 rounded"></div>)}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center gap-2 text-base">
          <LineChart className="w-4 h-4 text-indigo-500" />
          Workflow Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        
        {/* Premium Feature 2: Workflow Health Score */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Health Score</h4>
          <div className={`p-4 rounded-xl border flex items-center justify-between ${getHealthColor(health.status)}`}>
            <div className="flex items-center gap-3">
              <HeartPulse className="w-8 h-8 opacity-80" />
              <div>
                <div className="text-sm font-semibold opacity-90">Overall Status</div>
                <div className="text-xl font-black">{health.status}</div>
              </div>
            </div>
            <div className="text-3xl font-black tracking-tighter">
              {health.overall}%
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-slate-50 border rounded p-2 text-center">
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Assignment</div>
              <div className={`text-lg font-bold ${getScoreColor(health.assignment)}`}>{health.assignment}%</div>
            </div>
            <div className="bg-slate-50 border rounded p-2 text-center">
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Schedule</div>
              <div className={`text-lg font-bold ${getScoreColor(health.schedule)}`}>{health.schedule}%</div>
            </div>
          </div>
        </div>

        {/* Premium Feature 3: Stage Duration Analysis */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Stage Durations</h4>
          <div className="space-y-2">
            
            <div className="flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Created <ArrowRight className="w-3 h-3 text-gray-400" /> Assigned
              </div>
              <Badge variant="secondary" className="font-mono">{stageDurations.createdToAssigned}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Assigned <ArrowRight className="w-3 h-3 text-gray-400" /> Scheduled
              </div>
              <Badge variant="secondary" className="font-mono">{stageDurations.assignedToScheduled}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Scheduled <ArrowRight className="w-3 h-3 text-gray-400" /> Started
              </div>
              <Badge variant="secondary" className="font-mono">{stageDurations.scheduledToStarted}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Started <ArrowRight className="w-3 h-3 text-gray-400" /> Completed
              </div>
              <Badge variant="secondary" className="font-mono">{stageDurations.startedToCompleted}</Badge>
            </div>

          </div>
        </div>

      </CardContent>
    </Card>
  );
};
