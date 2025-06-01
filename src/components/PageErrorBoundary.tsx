import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@kel/ui-components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@kel/ui-components";
import ErrorBoundary from "./ErrorBoundary";

interface PageErrorBoundaryProps {
  children: React.ReactNode;
  pageName?: string;
}

const PageErrorFallback: React.FC<{
  pageName?: string;
  onRetry: () => void;
}> = ({ pageName = "page", onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Card className="max-w-lg w-full mx-4">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <CardTitle className="text-xl">Oops! Something went wrong</CardTitle>
        <CardDescription>
          We encountered an issue while loading the {pageName}. Don't worry,
          this happens sometimes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Homepage
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            If the problem persists, please refresh the page or contact support.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({
  children,
  pageName,
}) => {
  return (
    <ErrorBoundary
      resetOnPropsChange
      onError={(error, errorInfo) => {
        console.error(`Error in ${pageName || "page"}:`, { error, errorInfo });
      }}
      fallback={
        <PageErrorFallback
          pageName={pageName}
          onRetry={() => window.location.reload()}
        />
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;
