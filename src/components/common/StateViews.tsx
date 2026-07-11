import React from 'react';
import { Loader2, AlertCircle, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BaseStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LoadingState({ title = 'Loading...', description, className }: BaseStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center min-h-[200px]', className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}

export interface ErrorStateProps extends BaseStateProps {
  onRetry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', description, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center min-h-[200px]', className)}>
      <AlertCircle className="h-8 w-8 text-destructive mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export interface EmptyStateProps extends BaseStateProps {
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title = 'No data found', description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center min-h-[200px]', className)}>
      {icon ? (
        <div className="mb-4 text-muted-foreground">{icon}</div>
      ) : (
        <FileQuestion className="h-12 w-12 text-muted-foreground/50 mb-4" />
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-2 max-w-md">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export interface StateViewsProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  isEmpty?: boolean;
  onRetry?: () => void;
  emptyConfig?: {
    icon?: any;
    title?: string;
    description?: string;
    action?: React.ReactNode;
  };
  children: React.ReactNode;
}

export function StateViews({
  isLoading,
  isError,
  error,
  isEmpty,
  onRetry,
  emptyConfig,
  children,
}: StateViewsProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load data"
        description={error?.message || 'An unexpected error occurred. Please try again.'}
        onRetry={onRetry}
      />
    );
  }

  if (isEmpty) {
    const Icon = emptyConfig?.icon;
    return (
      <EmptyState
        title={emptyConfig?.title}
        description={emptyConfig?.description}
        icon={Icon ? <Icon className="h-12 w-12" /> : undefined}
        action={emptyConfig?.action}
      />
    );
  }

  return <>{children}</>;
}
