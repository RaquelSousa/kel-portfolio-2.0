import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@kel/ui-components";
import { Alert, AlertDescription } from "@kel/ui-components";
import ErrorBoundary from "./ErrorBoundary";

interface ComponentErrorBoundaryProps {
  children: React.ReactNode;
  componentName?: string;
  fallbackHeight?: string;
  showMinimalUI?: boolean;
}

const ComponentErrorFallback: React.FC<{
  componentName?: string;
  onRetry: () => void;
  fallbackHeight?: string;
  showMinimalUI?: boolean;
}> = ({
  componentName = "component",
  onRetry,
  fallbackHeight = "auto",
  showMinimalUI = false,
}) => {
  if (showMinimalUI) {
    return (
      <div
        className="flex items-center justify-center p-4 border border-destructive/20 rounded-lg bg-destructive/5"
        style={{ height: fallbackHeight }}
      >
        <div className="text-center space-y-2">
          <AlertTriangle className="w-5 h-5 text-destructive mx-auto" />
          <p className="text-sm text-muted-foreground">
            Error loading {componentName}
          </p>
          <Button size="sm" variant="outline" onClick={onRetry}>
            <RefreshCw className="w-3 h-3 mr-1" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4" style={{ height: fallbackHeight }}>
      <Alert variant="destructive" className="border-destructive/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span>Failed to load {componentName}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              className="ml-2"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

const ComponentErrorBoundary: React.FC<ComponentErrorBoundaryProps> = ({
  children,
  componentName,
  fallbackHeight,
  showMinimalUI = false,
}) => {
  return (
    <ErrorBoundary
      resetOnPropsChange
      onError={(error, errorInfo) => {
        console.warn(`Error in ${componentName || "component"}:`, {
          error,
          errorInfo,
        });
      }}
      fallback={
        <ComponentErrorFallback
          componentName={componentName}
          onRetry={() => window.location.reload()}
          fallbackHeight={fallbackHeight}
          showMinimalUI={showMinimalUI}
        />
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default ComponentErrorBoundary;
