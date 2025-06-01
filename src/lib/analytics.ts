export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean | object>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

export interface UserSession {
  id: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  events: AnalyticsEvent[];
  userAgent: string;
  referrer: string;
  utm: UtmParams;
}

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface PerformanceData {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

export interface ScrollMetrics {
  maxDepth: number;
  timeOnPage: number;
  scrollEvents: number;
  engagementScore: number;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private session: UserSession | null = null;
  private events: AnalyticsEvent[] = [];
  private config = {
    flushInterval: 10000,
    maxEvents: 50,
    enableConsoleLogging: process.env.NODE_ENV === "development",
    apiEndpoint: "/api/analytics",
  };
  private scrollMetrics: ScrollMetrics = {
    maxDepth: 0,
    timeOnPage: 0,
    scrollEvents: 0,
    engagementScore: 0,
  };
  private pageStartTime = Date.now();
  private isScrollTracking = false;
  private lastScrollTime = 0;
  private flushTimer: NodeJS.Timeout | null = null;

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  init(userId?: string): void {
    this.createSession(userId);
    this.setupScrollTracking();
    this.setupPerformanceTracking();
    this.setupUnloadTracking();
    this.startFlushTimer();

    if (this.config.enableConsoleLogging) {
      console.log("🔍 Analytics initialized", { sessionId: this.session?.id });
    }
  }

  track(
    eventName: string,
    properties?: Record<string, string | number | boolean | object>
  ): void {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
      timestamp: Date.now(),
      userId: this.session?.id,
      sessionId: this.session?.id,
    };

    this.addEvent(event);
    this.updateSession();

    if (this.config.enableConsoleLogging) {
      console.log("📊 Event tracked:", eventName, properties);
    }
  }

  trackPageView(page?: string, title?: string): void {
    const currentPage = page || window.location.pathname;
    const pageTitle = title || document.title;

    this.track("page_view", {
      page: currentPage,
      title: pageTitle,
      referrer: document.referrer,
      utm: this.getUtmParams(),
      timestamp: Date.now(),
    });

    if (this.session) {
      this.session.pageViews++;
    }
  }

  trackInteraction(
    element: string,
    action: string,
    value?: string | number | boolean
  ): void {
    this.track("user_interaction", {
      element,
      action,
      value,
      timestamp: Date.now(),
    });
  }

  trackButtonClick(buttonName: string, location?: string): void {
    this.track("button_click", {
      button: buttonName,
      location: location || "unknown",
      timestamp: Date.now(),
    });
  }

  trackFormSubmission(
    formName: string,
    success: boolean,
    duration: number,
    errors?: string[]
  ): void {
    this.track("form_submission", {
      form: formName,
      success,
      duration,
      errors,
      timestamp: Date.now(),
    });
  }

  trackFormFieldInteraction(
    formName: string,
    fieldName: string,
    action: "focus" | "blur" | "change"
  ): void {
    this.track("form_field_interaction", {
      form: formName,
      field: fieldName,
      action,
      timestamp: Date.now(),
    });
  }

  trackError(
    error: Error,
    context?: Record<string, string | number | boolean>
  ): void {
    this.track("error", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      context,
      timestamp: Date.now(),
    });
  }

  trackFeatureUsage(
    feature: string,
    action: string,
    metadata?: Record<string, string | number | boolean>
  ): void {
    this.track("feature_usage", {
      feature,
      action,
      metadata,
      timestamp: Date.now(),
    });
  }

  trackOutboundLink(url: string, linkText?: string): void {
    this.track("outbound_link", {
      url,
      linkText,
      timestamp: Date.now(),
    });
  }

  trackScrollDepth(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

    if (scrollPercentage > this.scrollMetrics.maxDepth) {
      this.scrollMetrics.maxDepth = scrollPercentage;

      const milestones = [25, 50, 75, 90, 100];
      const milestone = milestones.find(
        (m) => scrollPercentage >= m && this.scrollMetrics.maxDepth < m
      );

      if (milestone) {
        this.track("scroll_depth", {
          depth: milestone,
          timeToReach: Date.now() - this.pageStartTime,
        });
      }
    }

    this.scrollMetrics.scrollEvents++;
    this.scrollMetrics.timeOnPage = Date.now() - this.pageStartTime;
    this.calculateEngagementScore();
  }

  getSession(): UserSession | null {
    return this.session;
  }

  getScrollMetrics(): ScrollMetrics {
    return { ...this.scrollMetrics };
  }

  async flush(): Promise<void> {
    if (this.events.length === 0) return;

    try {
      const eventsToSend = [...this.events];
      this.events = [];

      if (this.config.enableConsoleLogging) {
        console.log("📤 Flushing analytics events:", eventsToSend.length);
      }

      if (this.config.enableConsoleLogging) {
        console.group("📊 Analytics Data");
        console.table(eventsToSend);
        console.log("Session:", this.session);
        console.log("Scroll Metrics:", this.scrollMetrics);
        console.groupEnd();
      }
    } catch (error) {
      console.error("Failed to flush analytics events:", error);
      this.events.unshift(...this.events);
    }
  }

  private createSession(userId?: string): void {
    this.session = {
      id: userId || this.generateSessionId(),
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: 0,
      events: [],
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      utm: this.getUtmParams(),
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUtmParams(): UtmParams {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      source: urlParams.get("utm_source") || undefined,
      medium: urlParams.get("utm_medium") || undefined,
      campaign: urlParams.get("utm_campaign") || undefined,
      term: urlParams.get("utm_term") || undefined,
      content: urlParams.get("utm_content") || undefined,
    };
  }

  private addEvent(event: AnalyticsEvent): void {
    this.events.push(event);

    if (this.session) {
      this.session.events.push(event);
    }

    if (this.events.length >= this.config.maxEvents) {
      this.flush();
    }
  }

  private updateSession(): void {
    if (this.session) {
      this.session.lastActivity = Date.now();
    }
  }

  private setupScrollTracking(): void {
    if (this.isScrollTracking) return;

    this.isScrollTracking = true;
    let ticking = false;

    const handleScroll = () => {
      this.lastScrollTime = Date.now();

      if (!ticking) {
        requestAnimationFrame(() => {
          this.trackScrollDepth();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  private setupPerformanceTracking(): void {
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            this.track("performance_navigation", {
              loadTime: navEntry.loadEventEnd - navEntry.fetchStart,
              domContentLoaded:
                navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
              type: navEntry.type,
            });
          }

          if (entry.entryType === "paint") {
            this.track("performance_paint", {
              name: entry.name,
              startTime: entry.startTime,
            });
          }
        }
      });

      observer.observe({ entryTypes: ["navigation", "paint"] });
    }
  }

  private setupUnloadTracking(): void {
    const handleUnload = () => {
      this.track("page_unload", {
        timeOnPage: Date.now() - this.pageStartTime,
        scrollMetrics: this.scrollMetrics,
      });

      this.flush();
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  private calculateEngagementScore(): void {
    const timeOnPage = this.scrollMetrics.timeOnPage / 1000;
    const scrollDepth = this.scrollMetrics.maxDepth / 100;
    const scrollActivity = Math.min(this.scrollMetrics.scrollEvents / 10, 1);

    this.scrollMetrics.engagementScore = Math.round(
      (timeOnPage * 0.4 + scrollDepth * 0.4 + scrollActivity * 0.2) * 100
    );
  }
}

export const analytics = AnalyticsService.getInstance();

export const trackClick = (element: string, location?: string) =>
  analytics.trackButtonClick(element, location);

export const trackPageView = (page?: string, title?: string) =>
  analytics.trackPageView(page, title);

export const trackEvent = (
  name: string,
  properties?: Record<string, string | number | boolean | object>
) => analytics.track(name, properties);

export const trackError = (
  error: Error,
  context?: Record<string, string | number | boolean>
) => analytics.trackError(error, context);

export const trackFeature = (
  feature: string,
  action: string,
  metadata?: Record<string, string | number | boolean>
) => analytics.trackFeatureUsage(feature, action, metadata);

export default AnalyticsService;
