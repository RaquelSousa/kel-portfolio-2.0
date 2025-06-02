import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useMousePosition } from "../use-mouse-position";

describe("useMousePosition", () => {
  beforeEach(() => {
    vi.spyOn(window, "addEventListener");
    vi.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial mouse position as (0, 0)", () => {
    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it("should register mousemove event listener on mount", () => {
    renderHook(() => useMousePosition());

    expect(window.addEventListener).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );
  });

  it("should update mouse position when mouse moves", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      const mouseMoveEvent = new MouseEvent("mousemove", {
        clientX: 100,
        clientY: 200,
      });
      window.dispatchEvent(mouseMoveEvent);
    });

    expect(result.current).toEqual({ x: 100, y: 200 });
  });

  it("should update mouse position multiple times", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      const firstEvent = new MouseEvent("mousemove", {
        clientX: 50,
        clientY: 75,
      });
      window.dispatchEvent(firstEvent);
    });

    expect(result.current).toEqual({ x: 50, y: 75 });

    act(() => {
      const secondEvent = new MouseEvent("mousemove", {
        clientX: 150,
        clientY: 250,
      });
      window.dispatchEvent(secondEvent);
    });

    expect(result.current).toEqual({ x: 150, y: 250 });
  });

  it("should remove event listener on unmount", () => {
    const { unmount } = renderHook(() => useMousePosition());

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );
  });

  it("should handle negative coordinates", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      const mouseMoveEvent = new MouseEvent("mousemove", {
        clientX: -10,
        clientY: -20,
      });
      window.dispatchEvent(mouseMoveEvent);
    });

    expect(result.current).toEqual({ x: -10, y: -20 });
  });

  it("should handle large coordinates", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      const mouseMoveEvent = new MouseEvent("mousemove", {
        clientX: 9999,
        clientY: 8888,
      });
      window.dispatchEvent(mouseMoveEvent);
    });

    expect(result.current).toEqual({ x: 9999, y: 8888 });
  });
});
