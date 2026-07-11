import React from 'react';
import { WorkerOperationsWorkspace } from '@/components/workers/operations/WorkerOperationsWorkspace';
import { ChevronRight } from 'lucide-react';

export default function WorkerOperationsPage({ params }: { params: { workerId: string } }) {
  const { workerId } = params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header & Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4 flex flex-col gap-4">
          <nav className="flex text-sm text-gray-500 items-center">
            <a href="/workers" className="hover:text-gray-900 transition-colors">Workforce</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href={`/workers/${workerId}`} className="hover:text-gray-900 transition-colors">{workerId}</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-semibold text-gray-900">Operations Center</span>
          </nav>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Workforce Operations Center</h1>
            <p className="text-sm text-gray-500 mt-1">Live monitoring and operational command for worker schedules and availability.</p>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 max-w-[1400px] mx-auto w-full">
        <WorkerOperationsWorkspace workerId={workerId} />
      </main>
    </div>
  );
}
