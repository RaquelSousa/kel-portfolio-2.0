export interface PerformanceMetrics {
  loadTime: number;
  deferredLoadTime: number;
  bundleSize: number;
  chunkLoadTimes: Record<string, number>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<PerformanceMetrics> = {};
  private chunkLoadStartTimes: Record<string, number> = {};

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  markLoadStart(): void {
    this.metrics.loadTime = performance.now();
  }

  markLoadEnd(): void {
    if (this.metrics.loadTime) {
      this.metrics.loadTime = performance.now() - this.metrics.loadTime;
    }
  }

  markChunkLoadStart(chunkName: string): void {
    this.chunkLoadStartTimes[chunkName] = performance.now();
  }

  markChunkLoadEnd(chunkName: string): void {
    const startTime = this.chunkLoadStartTimes[chunkName];
    if (startTime) {
      if (!this.metrics.chunkLoadTimes) {
        this.metrics.chunkLoadTimes = {};
      }
      this.metrics.chunkLoadTimes[chunkName] = performance.now() - startTime;
      delete this.chunkLoadStartTimes[chunkName];
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  logMetrics(): void {
    if (process.env.NODE_ENV === "development") {
      console.group("📊 Performance Metrics");
      console.log(
        "Initial Load Time:",
        this.metrics.loadTime?.toFixed(2),
        "ms"
      );
      console.log("Chunk Load Times:", this.metrics.chunkLoadTimes);
      console.groupEnd();
    }
  }

  getWebVitals(): Record<string, number> {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    return {
      fcp: this.getFirstContentfulPaint(),

      lcp: this.getLargestContentfulPaint(),

      cls: this.getCumulativeLayoutShift(),
      tti: navigation.loadEventEnd - navigation.fetchStart,
      dcl: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      load: navigation.loadEventEnd - navigation.fetchStart,
    };
  }

  private getFirstContentfulPaint(): number {
    const entries = performance.getEntriesByType("paint");
    const fcpEntry = entries.find(
      (entry) => entry.name === "first-contentful-paint"
    );
    return fcpEntry?.startTime || 0;
  }

  private getLargestContentfulPaint(): number {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      }).observe({ entryTypes: ["largest-contentful-paint"] });
    }) as unknown as number;
  }

  private getCumulativeLayoutShift(): number {
    return new Promise((resolve) => {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
          }
        }
        resolve(clsValue);
      }).observe({ entryTypes: ["layout-shift"] });
    }) as unknown as number;
  }
}

export function useComponentLoadTracking(componentName: string) {
  const monitor = PerformanceMonitor.getInstance();

  return {
    onLoadStart: () => monitor.markChunkLoadStart(componentName),
    onLoadEnd: () => monitor.markChunkLoadEnd(componentName),
    getMetrics: () => monitor.getMetrics(),
  };
}

export function analyzeBundlePerformance(): void {
  const monitor = PerformanceMonitor.getInstance();
  const webVitals = monitor.getWebVitals();

  console.group("🔍 Bundle Performance Analysis");
  console.log("Web Vitals:", webVitals);
  console.log("Load Metrics:", monitor.getMetrics());

  const recommendations: string[] = [];

  if (webVitals.fcp > 2500) {
    recommendations.push(
      "Consider reducing initial bundle size or implementing better code splitting"
    );
  }

  if (webVitals.lcp > 4000) {
    recommendations.push(
      "Optimize largest contentful paint by lazy loading below-fold content"
    );
  }

  if (webVitals.cls > 0.1) {
    recommendations.push(
      "Improve cumulative layout shift by reserving space for dynamic content"
    );
  }

  if (recommendations.length > 0) {
    console.group("💡 Recommendations:");
    recommendations.forEach((rec) => console.log(`• ${rec}`));
    console.groupEnd();
  }

  console.groupEnd();
}
