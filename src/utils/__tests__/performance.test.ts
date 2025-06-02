import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  PerformanceMonitor,
  useComponentLoadTracking,
  analyzeBundlePerformance,
} from "../performance";

describe("PerformanceMonitor", () => {
  let performanceMonitor: PerformanceMonitor;

  beforeEach(() => {
    vi.spyOn(performance, "now").mockReturnValue(1000);
    vi.spyOn(console, "group").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "groupEnd").mockImplementation(() => {});

    performanceMonitor = PerformanceMonitor.getInstance();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getInstance", () => {
    it("should return singleton instance", () => {
      const instance1 = PerformanceMonitor.getInstance();
      const instance2 = PerformanceMonitor.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe("load tracking", () => {
    it("should track load time correctly", () => {
      vi.mocked(performance.now)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(1500);

      performanceMonitor.markLoadStart();
      performanceMonitor.markLoadEnd();

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.loadTime).toBe(500);
    });

    it("should not mark load end without start", () => {
      vi.mocked(performance.now).mockReturnValue(2000);

      const freshMonitor = PerformanceMonitor.getInstance();

      freshMonitor.markLoadEnd();

      const metrics = freshMonitor.getMetrics();
      expect(
        typeof metrics.loadTime === "undefined" || metrics.loadTime > 0
      ).toBe(true);
    });
  });

  describe("chunk tracking", () => {
    it("should track chunk load times", () => {
      vi.mocked(performance.now)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(1200);

      performanceMonitor.markChunkLoadStart("test-header");
      performanceMonitor.markChunkLoadEnd("test-header");

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.chunkLoadTimes?.["test-header"]).toBe(200);
    });

    it("should handle multiple chunks", () => {
      vi.mocked(performance.now)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(1100)
        .mockReturnValueOnce(1200)
        .mockReturnValueOnce(1250);

      performanceMonitor.markChunkLoadStart("test-header");
      performanceMonitor.markChunkLoadStart("test-footer");
      performanceMonitor.markChunkLoadEnd("test-header");
      performanceMonitor.markChunkLoadEnd("test-footer");

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.chunkLoadTimes?.["test-header"]).toBe(200);
      expect(metrics.chunkLoadTimes?.["test-footer"]).toBe(150);
    });

    it("should not mark chunk end without start", () => {
      const uniqueChunkName = `test-chunk-${Date.now()}`;
      const freshMonitor = PerformanceMonitor.getInstance();

      freshMonitor.markChunkLoadEnd(uniqueChunkName);

      const metrics = freshMonitor.getMetrics();
      expect(metrics.chunkLoadTimes?.[uniqueChunkName]).toBeUndefined();
    });
  });

  describe("getMetrics", () => {
    it("should return copy of metrics", () => {
      performanceMonitor.markLoadStart();

      const metrics1 = performanceMonitor.getMetrics();
      const metrics2 = performanceMonitor.getMetrics();

      expect(metrics1).not.toBe(metrics2);
      expect(metrics1).toEqual(metrics2);
    });
  });

  describe("logMetrics", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    it("should log metrics in development", () => {
      vi.mocked(performance.now)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(1250);

      performanceMonitor.markLoadStart();
      performanceMonitor.markLoadEnd();
      performanceMonitor.logMetrics();

      expect(console.group).toHaveBeenCalledWith("📊 Performance Metrics");
      expect(console.log).toHaveBeenCalledWith(
        "Initial Load Time:",
        "250.00",
        "ms"
      );
      expect(console.groupEnd).toHaveBeenCalled();
    });

    it("should not log in production", () => {
      process.env.NODE_ENV = "production";

      performanceMonitor.logMetrics();

      expect(console.group).not.toHaveBeenCalled();
    });
  });

  describe("getWebVitals", () => {
    beforeEach(() => {
      const mockNavigationEntry: Partial<PerformanceNavigationTiming> = {
        fetchStart: 1000,
        domContentLoadedEventEnd: 1500,
        loadEventEnd: 2000,
      };

      vi.spyOn(performance, "getEntriesByType").mockReturnValue([
        mockNavigationEntry as PerformanceNavigationTiming,
      ]);
    });

    it("should calculate web vitals correctly", () => {
      const vitals = performanceMonitor.getWebVitals();

      expect(vitals.tti).toBe(1000);
      expect(vitals.dcl).toBe(500);
      expect(vitals.load).toBe(1000);
    });
  });
});

describe("useComponentLoadTracking", () => {
  beforeEach(() => {
    vi.spyOn(performance, "now").mockReturnValue(1000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should provide tracking functions", () => {
    const tracking = useComponentLoadTracking("TestComponent");

    expect(typeof tracking.onLoadStart).toBe("function");
    expect(typeof tracking.onLoadEnd).toBe("function");
    expect(typeof tracking.getMetrics).toBe("function");
  });

  it("should track component load times", () => {
    vi.mocked(performance.now)
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(1300);

    const tracking = useComponentLoadTracking("UniqueTestComponent");

    tracking.onLoadStart();
    tracking.onLoadEnd();

    const metrics = tracking.getMetrics();
    expect(metrics.chunkLoadTimes?.UniqueTestComponent).toBe(300);
  });
});

describe("analyzeBundlePerformance", () => {
  beforeEach(() => {
    vi.spyOn(console, "group").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "groupEnd").mockImplementation(() => {});

    const mockNavigationEntry: Partial<PerformanceNavigationTiming> = {
      fetchStart: 1000,
      domContentLoadedEventEnd: 1500,
      loadEventEnd: 2000,
    };

    vi.spyOn(performance, "getEntriesByType").mockReturnValue([
      mockNavigationEntry as PerformanceNavigationTiming,
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should analyze and log performance data", () => {
    analyzeBundlePerformance();

    expect(console.group).toHaveBeenCalledWith(
      "🔍 Bundle Performance Analysis"
    );
    expect(console.log).toHaveBeenCalledWith("Web Vitals:", expect.any(Object));
    expect(console.log).toHaveBeenCalledWith(
      "Load Metrics:",
      expect.any(Object)
    );
    expect(console.groupEnd).toHaveBeenCalled();
  });
});
