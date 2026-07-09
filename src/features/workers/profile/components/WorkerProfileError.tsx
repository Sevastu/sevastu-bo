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
      <div className="bg-muted min-h-screen px-4 md:px-8 py-16 flex items-center justify-center font-sans">
        <div className="bg-card rounded-3xl p-8 max-w-md w-full text-center border border-border shadow-xl shadow-border/40 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-destructive" />
          
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
            <AlertOctagon className="w-10 h-10 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {error.message || "We couldn't find the worker profile you were looking for. It may have been deleted or the link is incorrect."}
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-foreground hover:bg-foreground/90 text-primary-foreground font-semibold rounded-xl transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
            <Link 
              href="/workers"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-card hover:bg-muted text-foreground font-semibold rounded-xl border border-border transition-colors"
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
