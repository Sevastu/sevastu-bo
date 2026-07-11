import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ConflictPanelProps {
  availability: any;
  schedule: any;
  isLoading: boolean;
}

export const ConflictPanel: React.FC<ConflictPanelProps> = ({ availability, schedule, isLoading }) => {
  if (isLoading) {
    return null; // Don't show while loading
  }

  // Determine conflicts based on available backend data
  // Assuming conflicts array might be injected by the backend in either schedule or availability
  const conflicts = availability?.conflicts || schedule?.conflicts || [];

  if (conflicts.length === 0) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <Info className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Validation Passed</AlertTitle>
        <AlertDescription className="text-green-700">
          No scheduling conflicts detected for this assignment.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-red-200 shadow-sm">
      <CardHeader className="bg-red-50 pb-4 border-b border-red-100">
        <CardTitle className="text-red-800 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Schedule Conflicts Detected
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {conflicts.map((conflict: any, idx: number) => (
            <div key={idx} className="flex gap-3 p-3 bg-white rounded border border-red-100 shadow-sm">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900">{conflict.title}</h4>
                <p className="text-sm text-red-700 mt-1">{conflict.reason}</p>
                {conflict.resolution && (
                  <div className="mt-2 text-sm bg-red-50 p-2 rounded text-red-800 border border-red-100">
                    <span className="font-semibold">Suggested Action: </span> 
                    {conflict.resolution}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
