import React from 'react';
import { WorkflowWorkspace } from '@/components/jobs/timeline/WorkflowWorkspace';
import { Activity } from 'lucide-react';

export default function GlobalTimelinePage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header & Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4 flex flex-col gap-4">
          <nav className="flex text-sm text-gray-500 items-center">
            <span className="font-semibold text-gray-900">Global Timeline</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Enterprise Operations Feed</h1>
              <p className="text-sm text-gray-500 mt-1">Live, unified stream of all system events across jobs, workers, and assignments.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Area - Pass 'all' or undefined to indicate global scope */}
      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full">
        <WorkflowWorkspace jobId="all" />
      </main>
    </div>
  );
}
