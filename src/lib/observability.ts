/**
 * Observability Provider Stub
 * Configured for Sentry and OpenTelemetry integration.
 */

export const initObservability = () => {
  if (process.env.NODE_ENV === "production") {
    // TODO: Initialize Sentry
    // Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });
    
    // TODO: Initialize OpenTelemetry
    // setupTracing();
    
    console.info("[Observability] Initialized production tracing & monitoring stubs.");
  }
};

export const captureException = (error: Error, context?: Record<string, any>) => {
  if (process.env.NODE_ENV === "production") {
    // Sentry.captureException(error, { extra: context });
  } else {
    console.error("[Capture Exception]:", error, context);
  }
};

export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === "production") {
    // PostHog or custom telemetry
  } else {
    // In dev, we don't need to spam the console with events unless debugging
  }
};
