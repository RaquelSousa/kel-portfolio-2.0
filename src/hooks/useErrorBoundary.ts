import { useCallback, useState } from "react";

interface UseErrorBoundaryReturn {
  captureError: (error: Error) => void;
  resetError: () => void;
  hasError: boolean;
  error: Error | null;
}

export function useErrorBoundary(): UseErrorBoundaryReturn {
  const [error, setError] = useState<Error | null>(null);

  const captureError = (error: Error) => {
    setError(error);

    setTimeout(() => {
      throw error;
    }, 0);
  };

  const resetError = () => {
    setError(null);
  };

  return {
    captureError,
    resetError,
    hasError: error !== null,
    error,
  };
}

export function useAsyncError() {
  const { captureError } = useErrorBoundary();

  const wrapAsync = useCallback(
    <T extends unknown[], R>(asyncFn: (...args: T) => Promise<R>) => {
      return async (...args: T): Promise<R> => {
        try {
          return await asyncFn(...args);
        } catch (error) {
          captureError(
            error instanceof Error ? error : new Error(String(error))
          );
          throw error;
        }
      };
    },
    [captureError]
  );

  return { wrapAsync, captureError };
}
