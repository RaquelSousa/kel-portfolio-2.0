import { ErrorInfo } from "react";

interface ErrorContext {
  userId?: string;
  sessionId?: string;
  page?: string;
  component?: string;
  userAgent?: string;
  url?: string;
  timestamp?: number;
  buildVersion?: string;
  [key: string]: unknown;
}

interface ErrorReport {
  error: Error;
  context: ErrorContext;
  errorInfo?: ErrorInfo;
  severity: "low" | "medium" | "high" | "critical";
}

class ErrorReportingService {
  private isProduction = process.env.NODE_ENV === "production";
  private isEnabled = true;
  private queue: ErrorReport[] = [];
  private flushTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.setupGlobalHandlers();
  }

  private setupGlobalHandlers() {
    window.addEventListener("unhandledrejection", (event) => {
      const error =
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason));

      this.reportError(error, {
        type: "unhandledrejection",
        severity: "high",
      });
    });

    window.addEventListener("error", (event) => {
      const error =
        event.error instanceof Error ? event.error : new Error(event.message);

      this.reportError(error, {
        type: "globalerror",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        severity: "high",
      });
    });
  }

  reportError(
    error: Error,
    context: Partial<ErrorContext> & {
      severity?: "low" | "medium" | "high" | "critical";
    } = {}
  ) {
    if (!this.isEnabled) return;

    const fullContext: ErrorContext = {
      ...this.getDefaultContext(),
      ...context,
    };

    const report: ErrorReport = {
      error,
      context: fullContext,
      severity: context.severity || "medium",
    };

    if (this.isProduction) {
      this.queueReport(report);
    } else {
      this.logToConsole(report);
    }
  }

  reportReactError(
    error: Error,
    errorInfo: ErrorInfo,
    context: Partial<ErrorContext> = {}
  ) {
    this.reportError(error, {
      ...context,
      errorInfo,
      componentStack: errorInfo.componentStack,
      severity: "high",
    });
  }

  private getDefaultContext(): ErrorContext {
    return {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      buildVersion: process.env.REACT_APP_VERSION || "unknown",
      sessionId: this.getSessionId(),
    };
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem("error-session-id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      sessionStorage.setItem("error-session-id", sessionId);
    }
    return sessionId;
  }

  private queueReport(report: ErrorReport) {
    this.queue.push(report);

    if (this.queue.length >= 10 || !this.flushTimer) {
      this.scheduleFlush();
    }
  }

  private scheduleFlush() {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
    }

    this.flushTimer = setTimeout(() => {
      this.flush();
      this.flushTimer = null;
    }, 5000);
  }

  private async flush() {
    if (this.queue.length === 0) return;

    const reports = [...this.queue];
    this.queue = [];

    try {
      await this.sendReports(reports);
    } catch (sendError) {
      console.error("Failed to send error reports:", sendError);
    }
  }

  private async sendReports(reports: ErrorReport[]) {
    // TODO: Replace with your actual error reporting service
    // Examples:

    // Sentry
    // reports.forEach(report => {
    //   Sentry.captureException(report.error, {
    //     contexts: { custom: report.context },
    //     level: this.mapSeverityToSentryLevel(report.severity),
    //   });
    // });

    // Custom API endpoint
    // const response = await fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(reports),
    // });

    // For now, just log in production
    console.group("Error Reports Sent");
    reports.forEach((report) => {
      console.error("Error:", report.error);
      console.log("Context:", report.context);
    });
    console.groupEnd();
  }

  private logToConsole(report: ErrorReport) {
    const { error, context, severity } = report;

    console.group(`🚨 Error Report (${severity.toUpperCase()})`);
    console.error("Error:", error);
    console.log("Context:", context);
    console.log("Stack:", error.stack);
    console.groupEnd();
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }

  setUserContext(userId: string, additionalInfo: Record<string, unknown> = {}) {
    this.reportError = ((originalReportError) => {
      return (
        error: Error,
        context: Partial<ErrorContext> & {
          severity?: "low" | "medium" | "high" | "critical";
        } = {}
      ) => {
        return originalReportError.call(this, error, {
          ...context,
          userId,
          ...additionalInfo,
        });
      };
    })(this.reportError.bind(this));
  }
}

const errorReporting = new ErrorReportingService();

export default errorReporting;
export { ErrorReportingService };
export type { ErrorContext, ErrorReport };
