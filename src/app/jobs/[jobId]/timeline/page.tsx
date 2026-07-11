import React from 'react';
import { WorkflowWorkspace } from '@/components/jobs/timeline/WorkflowWorkspace';
import { ChevronRight } from 'lucide-react';

export default function JobTimelinePage({ params }: { params: { jobId: string } }) {
  const { jobId } = params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header & Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4 flex flex-col gap-4">
          <nav className="flex text-sm text-gray-500 items-center">
            <a href="/jobs" className="hover:text-gray-900 transition-colors">Jobs</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href={`/jobs/${jobId}`} className="hover:text-gray-900 transition-colors">{jobId}</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-semibold text-gray-900">Timeline & Workflow</span>
          </nav>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Workflow Intelligence Center</h1>
            <p className="text-sm text-gray-500 mt-1">Live operational intelligence engine for this job's lifecycle.</p>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full">
        <WorkflowWorkspace jobId={jobId} />
      </main>
    </div>
  );
}
