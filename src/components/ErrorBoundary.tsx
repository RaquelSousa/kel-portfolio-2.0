import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@kel/ui-components";
import { Alert, AlertDescription, AlertTitle } from "@kel/ui-components";
import errorReporting from "@/lib/errorReporting";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  resetOnPropsChange?: boolean;
  context?: Record<string, unknown>;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const eventId = this.logErrorToService(error, errorInfo);

    this.setState({
      errorInfo,
      eventId,
    });

    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    const { resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (
      hasError &&
      prevProps.children !== this.props.children &&
      resetOnPropsChange
    ) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo): string => {
    const eventId = `error_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    console.group("🚨 Error Boundary Caught an Error");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo.componentStack);
    console.error("Event ID:", eventId);
    console.groupEnd();

    errorReporting.reportReactError(error, errorInfo, {
      ...this.props.context,
      eventId,
      boundaryType: "ErrorBoundary",
    });

    return eventId;
  };

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    });
  };

  retryWithDelay = () => {
    this.resetTimeoutId = window.setTimeout(() => {
      this.resetErrorBoundary();
    }, 1000);
  };

  reloadPage = () => {
    window.location.reload();
  };

  goHome = () => {
    window.location.href = "/";
  };

  render() {
    const { hasError, error, errorInfo, eventId } = this.state;
    const { fallback, children, showDetails = false } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full space-y-6">
            <Alert variant="destructive" className="border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>
                We encountered an unexpected error. Our team has been notified
                and is working on a fix.
              </AlertDescription>
            </Alert>

            {showDetails && error && (
              <div className="bg-muted p-4 rounded-lg border">
                <h3 className="font-semibold text-sm mb-2">Error Details:</h3>
                <code className="text-xs text-muted-foreground block break-all">
                  {error.message}
                </code>
                {eventId && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Error ID: {eventId}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button
                onClick={this.resetErrorBoundary}
                className="w-full"
                variant="default"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>

              <Button
                onClick={this.retryWithDelay}
                className="w-full"
                variant="outline"
              >
                Retry in 1 second
              </Button>

              <div className="flex gap-2">
                <Button
                  onClick={this.goHome}
                  className="flex-1"
                  variant="outline"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>

                <Button
                  onClick={this.reloadPage}
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload Page
                </Button>
              </div>
            </div>

            {process.env.NODE_ENV === "development" && errorInfo && (
              <details className="bg-muted p-4 rounded-lg border">
                <summary className="cursor-pointer text-sm font-medium">
                  Development Details
                </summary>
                <pre className="text-xs mt-2 overflow-auto max-h-40 text-muted-foreground">
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
