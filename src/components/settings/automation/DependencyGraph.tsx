import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DependencyGraphProps {
  policies: any[];
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({ policies }) => {
  // Hardcoded visual representation of a dependency graph for this prototype
  // In a real app, this could use React Flow or similar libraries to render dynamic DAGs
  
  return (
    <Card className="h-full border-slate-200 shadow-sm">
      <CardHeader className="border-b pb-3 bg-slate-50/50">
        <CardTitle className="flex items-center gap-2 text-base">
          <Network className="w-5 h-5 text-slate-600" />
          Rule Dependency Graph
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8 flex flex-col items-center">
        
        {/* Node 1 */}
        <div className="w-64 p-3 rounded-lg border-2 border-indigo-200 bg-indigo-50 shadow-sm relative group cursor-pointer hover:border-indigo-400 transition-colors">
          <div className="text-xs font-bold text-indigo-800 mb-1">TRIGGER</div>
          <div className="text-sm font-semibold text-gray-900">Job Created</div>
          <Badge className="absolute -top-2 -right-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">System</Badge>
        </div>

        <ArrowDown className="w-6 h-6 text-gray-300 my-2" />

        {/* Node 2 */}
        <div className="w-64 p-3 rounded-lg border-2 border-emerald-200 bg-emerald-50 shadow-sm relative group cursor-pointer hover:border-emerald-400 transition-colors">
          <div className="text-xs font-bold text-emerald-800 mb-1">EVALUATE</div>
          <div className="text-sm font-semibold text-gray-900">Auto Assignment Rule</div>
          <Badge className="absolute -top-2 -right-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Active</Badge>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-6 h-6 text-gray-300 my-2 rotate-[25deg]" />
            {/* Node 3a */}
            <div className="w-48 p-3 rounded-lg border-2 border-blue-200 bg-blue-50 shadow-sm cursor-pointer hover:border-blue-400">
              <div className="text-xs font-bold text-blue-800 mb-1">THEN (Success)</div>
              <div className="text-sm font-semibold text-gray-900">Notify Worker</div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ArrowDown className="w-6 h-6 text-gray-300 my-2 -rotate-[25deg]" />
            {/* Node 3b */}
            <div className="w-48 p-3 rounded-lg border-2 border-orange-200 bg-orange-50 shadow-sm cursor-pointer hover:border-orange-400">
              <div className="text-xs font-bold text-orange-800 mb-1">THEN (Fail)</div>
              <div className="text-sm font-semibold text-gray-900">Escalate to Ops</div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
