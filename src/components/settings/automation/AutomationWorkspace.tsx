'use client';

import React, { useState } from 'react';
import { useWorkflowPolicies } from '@/features/fulfillment/hooks/useAutomationSettings';
import { AutomationOverview } from './AutomationOverview';
import { GenericRulePanel } from './GenericRulePanel';
import { RuleBuilder } from './RuleBuilder';
import { RuleSimulator } from './RuleSimulator';
import { DependencyGraph } from './DependencyGraph';
import { ConflictDetector } from './ConflictDetector';
import { BusinessHoursCard, HolidayCalendarCard, ApprovalMatrixCard, AuditHistoryCard } from './EnterpriseSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AutomationWorkspace: React.FC = () => {
  const { policies, isLoading, createPolicy, deletePolicy } = useWorkflowPolicies();
  
  // UI State
  const [activeTab, setActiveTab] = useState('assignment');
  const [isBuildingRule, setIsBuildingRule] = useState(false);

  // Filter policies by type (mock logic for demo)
  const getPolicies = (type: string) => policies.filter((p: { type: string; payload: { category: string; }; }) => p.type === type || (p.payload?.category === type));

  const handleSaveRule = (rule: any) => {
    createPolicy.mutate(rule, {
      onSuccess: () => setIsBuildingRule(false)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top KPI Dashboard */}
      <AutomationOverview policies={policies} isLoading={isLoading} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left/Main Column: Configuration Tabs */}
        <div className="xl:col-span-2 space-y-6">
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white p-1 rounded-lg border shadow-sm mb-4 inline-flex overflow-x-auto w-full">
              <TabsList className="bg-transparent h-auto p-0 gap-1 flex-nowrap w-full justify-start">
                <TabsTrigger value="assignment" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm px-4 py-2">Assignment Rules</TabsTrigger>
                <TabsTrigger value="scheduling" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm px-4 py-2">Scheduling Rules</TabsTrigger>
                <TabsTrigger value="availability" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm px-4 py-2">Availability Rules</TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700 data-[state=active]:shadow-sm px-4 py-2">Notifications</TabsTrigger>
                <TabsTrigger value="escalations" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700 data-[state=active]:shadow-sm px-4 py-2">Escalations</TabsTrigger>
                <TabsTrigger value="enterprise" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800 data-[state=active]:shadow-sm px-4 py-2">Enterprise</TabsTrigger>
              </TabsList>
            </div>

            {isBuildingRule ? (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <RuleBuilder onSave={handleSaveRule} onCancel={() => setIsBuildingRule(false)} />
              </div>
            ) : (
              <div className="bg-white rounded-lg border shadow-sm p-6 min-h-[500px]">
                <TabsContent value="assignment" className="mt-0">
                  <GenericRulePanel 
                    title="Assignment Automation" 
                    description="Configure rules for auto-assigning workers based on skills, distance, and rating."
                    rules={getPolicies('ASSIGNMENT')}
                    onCreateNew={() => setIsBuildingRule(true)}
                    onEdit={() => setIsBuildingRule(true)}
                    onDelete={(id) => deletePolicy.mutate(id)}
                  />
                </TabsContent>

                <TabsContent value="scheduling" className="mt-0">
                  <GenericRulePanel 
                    title="Scheduling Rules" 
                    description="Control auto-scheduling logic, preferred times, and break handling."
                    rules={getPolicies('SCHEDULING')}
                    onCreateNew={() => setIsBuildingRule(true)}
                    onEdit={() => setIsBuildingRule(true)}
                    onDelete={(id) => deletePolicy.mutate(id)}
                  />
                </TabsContent>

                <TabsContent value="availability" className="mt-0">
                  <GenericRulePanel 
                    title="Availability Rules" 
                    description="Set maximum capacity and block constraints for workers."
                    rules={getPolicies('AVAILABILITY')}
                    onCreateNew={() => setIsBuildingRule(true)}
                    onEdit={() => setIsBuildingRule(true)}
                    onDelete={(id) => deletePolicy.mutate(id)}
                  />
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <GenericRulePanel 
                    title="Notification Triggers" 
                    description="Set up automatic alerts for job status changes."
                    rules={getPolicies('NOTIFICATION')}
                    onCreateNew={() => setIsBuildingRule(true)}
                    onEdit={() => setIsBuildingRule(true)}
                    onDelete={(id) => deletePolicy.mutate(id)}
                  />
                </TabsContent>

                <TabsContent value="escalations" className="mt-0">
                  <GenericRulePanel 
                    title="Escalation Rules" 
                    description="Define SLAs and escalation paths for delayed workflows."
                    rules={getPolicies('ESCALATION')}
                    onCreateNew={() => setIsBuildingRule(true)}
                    onEdit={() => setIsBuildingRule(true)}
                    onDelete={(id) => deletePolicy.mutate(id)}
                  />
                </TabsContent>

                <TabsContent value="enterprise" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Enterprise Settings</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-6">Global configurations affecting all workflows.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BusinessHoursCard />
                    <HolidayCalendarCard />
                    <ApprovalMatrixCard />
                    <AuditHistoryCard />
                  </div>
                </TabsContent>
              </div>
            )}
          </Tabs>

        </div>

        {/* Right Column: Intelligence & Simulation */}
        <div className="space-y-6">
          
          <ConflictDetector policies={policies} />
          
          <div className="h-[400px]">
            <RuleSimulator policies={policies} />
          </div>
          
          <div className="h-[400px]">
            <DependencyGraph policies={policies} />
          </div>

        </div>

      </div>
    </div>
  );
};
