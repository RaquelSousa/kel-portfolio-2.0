import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useIsMobile } from "../use-mobile";

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;
  let mockMediaQueryList: {
    matches: boolean;
    media: string;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
    dispatchEvent: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    mockMediaQueryList = {
      matches: false,
      media: "(max-width: 767px)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };

    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mockMediaQueryList));
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    vi.restoreAllMocks();
  });

  it("should return false for desktop screen size", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("should return true for mobile screen size", () => {
    window.innerWidth = 600;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("should return true at exact breakpoint boundary", () => {
    window.innerWidth = 767;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("should return false just above breakpoint", () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("should update when window is resized", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      const changeHandler =
        mockMediaQueryList.addEventListener.mock.calls[0][1];
      changeHandler();
    });

    expect(result.current).toBe(true);
  });

  it("should register and cleanup event listeners", () => {
    const { unmount } = renderHook(() => useIsMobile());

    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unmount();

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});
