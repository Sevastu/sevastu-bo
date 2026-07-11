import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConflictDetectorProps {
  policies: any[];
}

export const ConflictDetector: React.FC<ConflictDetectorProps> = ({ policies }) => {
  // Hardcoded conflicts for this prototype to demonstrate the UI
  // Real implementation would parse policy arrays and find overlapping conditions
  const conflicts = [
    {
      ruleA: 'Auto-Assign Plumbing (Priority 1)',
      ruleB: 'Manual Review > 5km (Priority 1)',
      reason: 'Both rules trigger on "Plumbing" category when distance > 5km, creating a race condition.',
      module: 'Assignment Engine',
      suggestion: 'Lower the priority of Auto-Assign Plumbing or add distance constraint < 5km.'
    }
  ];

  return (
    <Card className="border-orange-100 shadow-sm h-full">
      <CardHeader className="bg-orange-50/50 border-b pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-orange-900">
          <ShieldAlert className="w-5 h-5 text-orange-600" />
          Conflict Detector
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-4">
        
        {conflicts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-2 p-6">
            <ShieldAlert className="w-12 h-12 text-gray-200" />
            <p className="text-sm">No rule conflicts detected.</p>
          </div>
        ) : (
          conflicts.map((conflict, idx) => (
            <div key={idx} className="bg-white border border-orange-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-orange-50 px-3 py-2 border-b border-orange-100 text-xs font-bold text-orange-800 uppercase tracking-wider flex items-center justify-between">
                <span>Conflict Detected in {conflict.module}</span>
                <Badge variant="outline" className="text-[10px] h-4 bg-orange-100 border-orange-200 text-orange-800">Critical</Badge>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 bg-slate-50 p-2 rounded border">
                  <span>{conflict.ruleA}</span>
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                  <span>{conflict.ruleB}</span>
                </div>
                
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Reason:</span> {conflict.reason}
                </p>
                
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-blue-900 uppercase">Suggested Resolution</div>
                    <div className="text-sm text-blue-800">{conflict.suggestion}</div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" size="sm" className="text-slate-600">Ignore</Button>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">Resolve Issue</Button>
                </div>
              </div>
            </div>
          ))
        )}

      </CardContent>
    </Card>
  );
};

// Internal badge import
import { Badge } from '@/components/ui/badge';
