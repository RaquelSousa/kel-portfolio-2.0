import { lazy, Suspense } from "react";
import { Skeleton } from "@kel/ui-components";

export function ComponentSkeleton() {
  return (
    <div className="space-y-4 p-6" role="status" aria-label="Loading content">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-32 w-full" />
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <section
      className={`${height} flex items-center justify-center bg-muted/50 rounded-lg`}
    >
      <div className="text-center space-y-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </section>
  );
}

export function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <h2 className="text-lg font-semibold">Loading page...</h2>
        <p className="text-muted-foreground">
          Please wait while we load the content
        </p>
      </div>
    </div>
  );
}

export function withLazyLoading<P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  fallback: React.ReactNode = <ComponentSkeleton />
) {
  const LazyComponent = lazy(importFunc);

  return function WrappedComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
