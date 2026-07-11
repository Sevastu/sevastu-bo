"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText, Calendar, Mail, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ReportsPanel: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock generation delay
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Scheduled Reports
        </CardTitle>
        <CardDescription>Generate and schedule automated reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex gap-2 justify-start h-auto py-3">
              <FileText className="w-4 h-4 text-red-500" />
              <div className="flex flex-col items-start">
                <span>PDF Report</span>
                <span className="text-xs text-muted-foreground font-normal">Executive Summary</span>
              </div>
            </Button>
            <Button variant="outline" className="flex gap-2 justify-start h-auto py-3">
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
              <div className="flex flex-col items-start">
                <span>Excel Data</span>
                <span className="text-xs text-muted-foreground font-normal">Raw Analytics</span>
              </div>
            </Button>
          </div>

          <div className="p-4 border rounded-xl bg-muted/20 space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Report Scheduler
            </h4>
            
            <div className="grid grid-cols-3 gap-2">
              <Button variant="secondary" size="sm">Daily</Button>
              <Button variant="default" size="sm">Weekly</Button>
              <Button variant="secondary" size="sm">Monthly</Button>
            </div>

            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Recipients (comma separated)" 
                  className="w-full pl-9 pr-3 py-2 text-sm bg-background border rounded-md"
                  defaultValue="leadership@sevastu.com"
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? 'Configuring Schedule...' : 'Save Schedule'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
