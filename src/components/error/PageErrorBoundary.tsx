"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  children?: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

export class PageErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Page boundary caught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="m-4 border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-red-500 opacity-80" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-400">
                Failed to load component
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 opacity-80 max-w-sm">
                {this.props.fallbackMessage || "An error occurred while rendering this section. Please try again."}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={this.handleRetry} className="gap-2 border-red-200 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900/30">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
