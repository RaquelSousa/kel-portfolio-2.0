import { describe, it, expect } from "vitest";

export const formatName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const calculateAge = (birthYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

describe("Utility Functions", () => {
  describe("formatName", () => {
    it("formats full name correctly", () => {
      expect(formatName("John", "Doe")).toBe("John Doe");
    });

    it("handles empty strings", () => {
      expect(formatName("", "Doe")).toBe("Doe");
      expect(formatName("John", "")).toBe("John");
      expect(formatName("", "")).toBe("");
    });

    it("trims whitespace", () => {
      expect(formatName(" John ", " Doe ")).toBe("John   Doe");
    });
  });

  describe("calculateAge", () => {
    it("calculates age correctly", () => {
      const currentYear = new Date().getFullYear();
      expect(calculateAge(1990)).toBe(currentYear - 1990);
    });

    it("handles current year birth", () => {
      const currentYear = new Date().getFullYear();
      expect(calculateAge(currentYear)).toBe(0);
    });
  });

  describe("isValidEmail", () => {
    it("validates correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
    });

    it("rejects invalid email addresses", () => {
      expect(isValidEmail("invalid-email")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });
});
