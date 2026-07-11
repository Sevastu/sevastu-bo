import React from 'react';
import { ScheduleWorkspace } from '@/components/jobs/schedule/ScheduleWorkspace';
import { ChevronRight } from 'lucide-react';

export default function SchedulePage({ params }: { params: { jobId: string } }) {
  const { jobId } = params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header & Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4 flex flex-col gap-4">
          <nav className="flex text-sm text-gray-500 items-center">
            <a href="/jobs" className="hover:text-gray-900">Jobs</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href={`/jobs/${jobId}`} className="hover:text-gray-900">{jobId}</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-semibold text-gray-900">Schedule</span>
          </nav>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Scheduling Operations Center</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and orchestrate job scheduling, worker assignments, and timelines.</p>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <ScheduleWorkspace jobId={jobId} />
      </main>
    </div>
  );
}
