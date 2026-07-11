import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Settings, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RuleSimulatorProps {
  policies: any[];
}

export const RuleSimulator: React.FC<RuleSimulatorProps> = ({ policies }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSimulate = () => {
    setIsSimulating(true);
    // Simulate network delay for effect
    setTimeout(() => {
      // Mock simulation logic: check which policies would trigger on a mock payload
      const mockResults = policies.filter(p => p.status === 'ACTIVE').map(p => ({
        policyName: p.name || 'Unnamed Policy',
        triggered: Math.random() > 0.5,
        action: p.payload?.actions?.[0]?.type || 'UNKNOWN_ACTION',
        target: p.payload?.actions?.[0]?.target || 'N/A'
      }));
      setResults(mockResults);
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <Card className="h-full flex flex-col border-indigo-100">
      <CardHeader className="bg-indigo-50/50 border-b pb-4">
        <CardTitle className="flex items-center gap-2 text-base text-indigo-900">
          <Settings className="w-5 h-5 text-indigo-600" />
          Rule Simulator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-6 flex flex-col gap-6">
        
        <div className="bg-slate-50 p-4 rounded-lg border text-sm">
          <h4 className="font-semibold text-gray-900 mb-2">Mock Input Payload</h4>
          <pre className="text-xs text-gray-600 font-mono bg-white p-2 rounded border">
{`{
  "entity": "JOB",
  "id": "mock-job-123",
  "category": "PLUMBING",
  "priority": "HIGH",
  "distance": 3.2
}`}
          </pre>
        </div>

        {results ? (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Simulation Results:</h4>
            {results.map((res, idx) => (
              <div key={idx} className={`p-3 rounded-lg border flex flex-col gap-2 ${res.triggered ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {res.triggered ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-gray-400" />}
                    <span className={`font-medium ${res.triggered ? 'text-green-900' : 'text-gray-600'}`}>{res.policyName}</span>
                  </div>
                  {res.triggered ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Triggered</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">Skipped</Badge>
                  )}
                </div>
                {res.triggered && (
                  <div className="flex items-center gap-2 text-xs font-mono ml-6">
                    <span className="text-gray-500">Action:</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border">{res.action}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span className="bg-white px-1.5 py-0.5 rounded border">{res.target}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <PlayCircle className="w-12 h-12 opacity-20" />
            <p className="text-sm text-center">Click run to test how the current active rules<br/>evaluate this mock payload.</p>
          </div>
        )}

      </CardContent>
      
      <CardFooter className="bg-slate-50 border-t p-4 flex justify-end gap-2">
        {results && <Button variant="outline" onClick={() => setResults(null)}>Reset</Button>}
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto" 
          onClick={handleSimulate}
          disabled={isSimulating}
        >
          {isSimulating ? (
            <span className="flex items-center"><Settings className="w-4 h-4 mr-2 animate-spin" /> Simulating...</span>
          ) : (
            <span className="flex items-center"><PlayCircle className="w-4 h-4 mr-2" /> Run Simulation</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
