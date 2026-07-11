import React from 'react';
import { AutomationWorkspace } from '@/components/settings/automation/AutomationWorkspace';
import { Settings, ChevronRight } from 'lucide-react';

export default function AutomationSettingsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header & Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4 flex flex-col gap-4">
          <nav className="flex text-sm text-gray-500 items-center">
            <a href="/settings" className="hover:text-gray-900 transition-colors">Settings</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-semibold text-gray-900">Operations Automation</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Settings className="w-6 h-6 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Enterprise Operations Automation Center</h1>
              <p className="text-sm text-gray-500 mt-1">Configure, simulate, and manage the automation rules governing the fulfillment workflow.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full">
        <AutomationWorkspace />
      </main>
    </div>
  );
}
