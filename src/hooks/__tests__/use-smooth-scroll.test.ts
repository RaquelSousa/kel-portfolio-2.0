import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useSmoothScroll } from "../use-smooth-scroll";

describe("useSmoothScroll", () => {
  let mockElement: HTMLElement;
  let mockScrollIntoView: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockScrollIntoView = vi.fn();
    mockElement = {
      scrollIntoView: mockScrollIntoView,
    } as unknown as HTMLElement;

    vi.spyOn(document, "getElementById").mockImplementation((id: string) => {
      if (id === "existing-element") {
        return mockElement;
      }
      return null;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return scrollToSection function", () => {
    const { result } = renderHook(() => useSmoothScroll());

    expect(typeof result.current.scrollToSection).toBe("function");
  });

  it("should scroll to existing element with smooth behavior", () => {
    const { result } = renderHook(() => useSmoothScroll());

    result.current.scrollToSection("existing-element");

    expect(document.getElementById).toHaveBeenCalledWith("existing-element");
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("should not scroll when element does not exist", () => {
    const { result } = renderHook(() => useSmoothScroll());

    result.current.scrollToSection("non-existing-element");

    expect(document.getElementById).toHaveBeenCalledWith(
      "non-existing-element"
    );
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it("should handle empty string id", () => {
    const { result } = renderHook(() => useSmoothScroll());

    result.current.scrollToSection("");

    expect(document.getElementById).toHaveBeenCalledWith("");
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it("should handle multiple calls to scrollToSection", () => {
    const { result } = renderHook(() => useSmoothScroll());

    result.current.scrollToSection("existing-element");
    result.current.scrollToSection("existing-element");

    expect(document.getElementById).toHaveBeenCalledTimes(2);
    expect(mockScrollIntoView).toHaveBeenCalledTimes(2);
  });

  it("should handle special characters in element id", () => {
    const specialId = "element-with-special_chars.123";

    vi.mocked(document.getElementById).mockImplementation((id: string) => {
      if (id === specialId) {
        return mockElement;
      }
      return null;
    });

    const { result } = renderHook(() => useSmoothScroll());

    result.current.scrollToSection(specialId);

    expect(document.getElementById).toHaveBeenCalledWith(specialId);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
