import { useEffect, useCallback, useRef } from "react";
import {
  analytics,
  trackClick,
  trackEvent,
  trackError,
  trackFeature,
} from "@/lib/analytics";

export function useAnalytics() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      analytics.init();
      isInitialized.current = true;
    }
  }, []);

  return {
    track: analytics.track.bind(analytics),
    trackClick,
    trackEvent,
    trackError,
    trackFeature,
    trackPageView: analytics.trackPageView.bind(analytics),
    trackInteraction: analytics.trackInteraction.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
    trackOutboundLink: analytics.trackOutboundLink.bind(analytics),
    getSession: analytics.getSession.bind(analytics),
    getScrollMetrics: analytics.getScrollMetrics.bind(analytics),
  };
}

export function usePageView(page?: string, title?: string) {
  const pageRef = useRef<string | undefined>(page);
  const titleRef = useRef<string | undefined>(title);

  useEffect(() => {
    const currentPage = pageRef.current || window.location.pathname;
    const currentTitle = titleRef.current || document.title;

    analytics.trackPageView(currentPage, currentTitle);
  }, []);
}

export function useClickTracking(elementName: string, location?: string) {
  return useCallback(() => {
    trackClick(elementName, location);
  }, [elementName, location]);
}

export function useFormTracking(formName: string) {
  const startTime = useRef<number>(Date.now());

  const trackFieldInteraction = useCallback(
    (fieldName: string, action: "focus" | "blur" | "change") => {
      analytics.trackFormFieldInteraction(formName, fieldName, action);
    },
    [formName]
  );

  const trackSubmission = useCallback(
    (success: boolean, errors?: string[]) => {
      const duration = Date.now() - startTime.current;
      analytics.trackFormSubmission(formName, success, duration, errors);

      startTime.current = Date.now();
    },
    [formName]
  );

  return {
    trackFieldInteraction,
    trackSubmission,
    trackFieldFocus: (fieldName: string) =>
      trackFieldInteraction(fieldName, "focus"),
    trackFieldBlur: (fieldName: string) =>
      trackFieldInteraction(fieldName, "blur"),
    trackFieldChange: (fieldName: string) =>
      trackFieldInteraction(fieldName, "change"),
  };
}

export function useFeatureTracking(featureName: string) {
  return useCallback(
    (action: string, metadata?: Record<string, string | number | boolean>) => {
      trackFeature(featureName, action, metadata);
    },
    [featureName]
  );
}

export function useInteractionTracking() {
  return (
    element: string,
    action: string,
    value?: string | number | boolean
  ) => {
    analytics.trackInteraction(element, action, value);
  };
}

export function useOutboundLinkTracking() {
  return (url: string, linkText?: string) => {
    analytics.trackOutboundLink(url, linkText);
  };
}

export function useErrorTracking(componentName: string) {
  return useCallback(
    (
      error: Error,
      additionalContext?: Record<string, string | number | boolean>
    ) => {
      trackError(error, {
        component: componentName,
        ...additionalContext,
      });
    },
    [componentName]
  );
}

export function useComponentTracking(componentName: string) {
  const mountTime = useRef<number>(Date.now());

  useEffect(() => {
    trackEvent("component_mounted", {
      component: componentName,
      timestamp: Date.now(),
    });

    return () => {
      const timeAlive = Date.now() - mountTime.current;
      trackEvent("component_unmounted", {
        component: componentName,
        timeAlive,
        timestamp: Date.now(),
      });
    };
  }, [componentName]);

  const trackAction = useCallback(
    (action: string, metadata?: Record<string, string | number | boolean>) => {
      trackEvent("component_action", {
        component: componentName,
        action,
        ...metadata,
      });
    },
    [componentName]
  );

  return { trackAction };
}

export function useScrollTracking(
  elementRef: React.RefObject<HTMLElement>,
  componentName: string
) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackEvent("component_viewed", {
              component: componentName,
              visibilityRatio: entry.intersectionRatio,
              timestamp: Date.now(),
            });
            hasTrackedView.current = true;
          }
        });
      },
      {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, componentName]);
}

export function usePerformanceTracking() {
  return useCallback(
    (operationName: string, operation: () => void | Promise<void>) => {
      const startTime = performance.now();

      const trackCompletion = (success: boolean, error?: Error) => {
        const duration = performance.now() - startTime;
        trackEvent("operation_performance", {
          operation: operationName,
          duration,
          success,
          error: error?.message,
          timestamp: Date.now(),
        });
      };

      try {
        const result = operation();

        if (result instanceof Promise) {
          return result
            .then(() => trackCompletion(true))
            .catch((error) => {
              trackCompletion(false, error);
              throw error;
            });
        } else {
          trackCompletion(true);
          return result;
        }
      } catch (error) {
        trackCompletion(false, error as Error);
        throw error;
      }
    },
    []
  );
}

export function usePreferenceTracking() {
  return useCallback(
    (
      preference: string,
      value: string | number | boolean,
      category?: string
    ) => {
      trackEvent("preference_changed", {
        preference,
        value,
        category: category || "general",
        timestamp: Date.now(),
      });
    },
    []
  );
}

export default useAnalytics;
