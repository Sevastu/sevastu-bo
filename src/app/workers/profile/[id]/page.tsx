"use client";

import React, { use } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useWorkerProfile } from "@/features/workers/profile/hooks/useWorkerProfile";
import { WorkerHeroSection } from "@/features/workers/profile/components/WorkerHeroSection";
import { WorkerStatsGrid } from "@/features/workers/profile/components/WorkerStatsGrid";
import { WorkerProfileCard } from "@/features/workers/profile/components/WorkerProfileCard";
import { WorkerProfessionalSummary } from "@/features/workers/profile/components/WorkerProfessionalSummary";
import { WorkerSkillsCard } from "@/features/workers/profile/components/WorkerSkillsCard";
import { WorkerVerificationCard } from "@/features/workers/profile/components/WorkerVerificationCard";
import { WorkerDocumentsCard } from "@/features/workers/profile/components/WorkerDocumentsCard";
import { WorkerProfileSkeleton } from "@/features/workers/profile/components/WorkerProfileSkeleton";
import { WorkerProfileError } from "@/features/workers/profile/components/WorkerProfileError";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WorkerVerificationDetail({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use to unwrap the Promise params as required by Next.js 15+
  const resolvedParams = use(params);
  const workerId = resolvedParams.id;
  
  const { workerData, loading, error } = useWorkerProfile(workerId);

  if (loading) {
    return <WorkerProfileSkeleton />;
  }

  if (error || !workerData) {
    return <WorkerProfileError error={error || new Error("Worker not found")} />;
  }

  return (
    <AppLayout>
      <div className="min-h-screen font-sans">
        {/* Sticky Header with Back Navigation */}
        <div className="sticky top-0 bg-white rounded-xl z-10 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between p-2">
            <Link 
              href="/workers"
              className="flex items-center gap-4 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 shadow-sm bg-primary/10 text-primary rounded-md hover:bg-primary/20" />
              Back to Workers
            </Link>
            
            <div className="text-sm font-medium text-primary">
              ID: {workerData.profile._id.slice(-8)}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-4">
          <div className="max-w-7xl mx-auto space-y-4">
            
            <WorkerHeroSection profile={workerData.profile} />
            <WorkerStatsGrid profile={workerData.profile} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (Main Info) */}
              <div className="lg:col-span-2 space-y-6">
                <WorkerProfileCard profile={workerData.profile} />
                <WorkerProfessionalSummary profile={workerData.profile} />
                <WorkerSkillsCard skills={workerData.profile.skills} />
              </div>

              {/* Right Column (Verification & Docs) */}
              <div className="space-y-6">
                <WorkerVerificationCard profile={workerData.profile} kyc={workerData.kyc} />
                <WorkerDocumentsCard kyc={workerData.kyc} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
