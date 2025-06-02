import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useGlitchText } from "../use-glitch-text";

describe("useGlitchText", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random");
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should return original text initially", () => {
    const { result } = renderHook(() => useGlitchText("Hello World"));

    expect(result.current).toBe("Hello World");
  });

  it("should return original text when random is below threshold", () => {
    vi.mocked(Math.random).mockReturnValue(0.9);

    const { result } = renderHook(() => useGlitchText("Hello World", 1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe("Hello World");
  });

  it("should trigger glitch effect when random exceeds threshold", () => {
    vi.mocked(Math.random).mockReturnValueOnce(0.96).mockReturnValue(0.5);

    const { result } = renderHook(() => useGlitchText("Hello", 1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).not.toBe("Hello");
    expect(result.current).toHaveLength(5);
  });

  it("should restore original text after glitch timeout", () => {
    vi.mocked(Math.random).mockReturnValueOnce(0.96).mockReturnValue(0.5);

    const { result } = renderHook(() => useGlitchText("Hello", 1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).not.toBe("Hello");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("Hello");
  });

  it("should use custom interval", () => {
    vi.mocked(Math.random).mockReturnValue(0.96);

    const { result } = renderHook(() => useGlitchText("Test", 500));

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe("Test");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).not.toBe("Test");
  });

  it("should handle empty string", () => {
    const { result } = renderHook(() => useGlitchText(""));

    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe("");
  });

  it("should cleanup interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() => useGlitchText("Test"));

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it("should update when originalText changes", () => {
    const { result, rerender } = renderHook(({ text }) => useGlitchText(text), {
      initialProps: { text: "Hello" },
    });

    expect(result.current).toBe("Hello");

    rerender({ text: "World" });

    vi.mocked(Math.random).mockReturnValue(0.96);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("World");
  });
});
