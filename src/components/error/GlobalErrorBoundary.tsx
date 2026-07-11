"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, this would be sent to Sentry or OpenTelemetry
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
          <div className="max-w-md w-full bg-card border border-border rounded-xl shadow-lg p-6 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
            <p className="text-muted-foreground text-sm">
              We're sorry, an unexpected error has occurred. Our engineering team has been notified.
            </p>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <div className="p-3 bg-muted rounded-md text-left text-xs font-mono overflow-auto max-h-32 text-red-600 dark:text-red-400">
                {this.state.error.message}
              </div>
            )}
            <Button onClick={this.handleReload} className="w-full gap-2">
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
