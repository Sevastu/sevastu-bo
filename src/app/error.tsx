"use client";

import { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send to logger/Sentry
    console.error("Next.js Error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-xl shadow-lg p-6 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <AlertOctagon className="w-8 h-8 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-2xl font-bold">A critical error occurred.</h1>
        <p className="text-muted-foreground text-sm">
          We've hit a snag. The application failed to render this page.
        </p>
        {process.env.NODE_ENV !== "production" && (
          <div className="p-3 bg-muted rounded-md text-left text-xs font-mono overflow-auto max-h-32 text-red-600 dark:text-red-400">
            {error.message}
          </div>
        )}
        <Button onClick={() => reset()} className="w-full gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
