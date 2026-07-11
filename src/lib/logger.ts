import { captureException } from "./observability";

type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private isProduction = process.env.NODE_ENV === "production";
  private isDebugEnabled = process.env.NEXT_PUBLIC_DEBUG_LOGS === "true";

  private formatMessage(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const formattedData = data ? JSON.stringify(data) : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${formattedData}`;
  }

  info(message: string, data?: any) {
    if (!this.isProduction || this.isDebugEnabled) {
      console.info(this.formatMessage("info", message, data));
    }
  }

  warn(message: string, data?: any) {
    console.warn(this.formatMessage("warn", message, data));
  }

  error(message: string, error?: any, data?: any) {
    // Always log errors, even in prod
    console.error(this.formatMessage("error", message, data), error);
    
    // Push critical errors to observability tools
    if (error instanceof Error) {
      captureException(error, data);
    } else if (typeof error === 'string') {
      captureException(new Error(error), data);
    }
  }

  debug(message: string, data?: any) {
    if (!this.isProduction || this.isDebugEnabled) {
      console.debug(this.formatMessage("debug", message, data));
    }
  }
}

export const logger = new Logger();
