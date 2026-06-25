import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AlertOctagon, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface WorkerProfileErrorProps {
  error: Error;
}

export function WorkerProfileError({ error }: WorkerProfileErrorProps) {
  return (
    <AppLayout>
      <div className="bg-slate-50 min-h-screen px-4 md:px-8 py-16 flex items-center justify-center font-sans">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-red-500" />
          
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
            <AlertOctagon className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            {error.message || "We couldn't find the worker profile you were looking for. It may have been deleted or the link is incorrect."}
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
            <Link 
              href="/workers"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Workers
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
