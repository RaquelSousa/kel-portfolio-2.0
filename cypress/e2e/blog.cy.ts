/// <reference types="cypress" />

describe("Blog Page", () => {
  beforeEach(() => {
    cy.visit("/blog");
  });

  describe("Layout and Content", () => {
    it("should display blog page correctly", () => {
      cy.get("nav").should("exist");
      cy.get("main").should("exist");
      cy.get("h1").should("contain.text", "BLOG_SYSTEM");
    });

    it("should have proper meta tags", () => {
      cy.get('meta[name="description"]').should("exist");
      cy.get("title").should("contain", "Blog - Coming Soon");
    });

    it("should display coming soon message", () => {
      cy.contains("COMING_SOON.exe").should("be.visible");
      cy.contains("Blog system is currently under development").should(
        "be.visible"
      );
    });
  });

  describe("Navigation", () => {
    it("should have return to home link", () => {
      cy.get('a[href="/"]').contains("RETURN_TO_HOME").should("be.visible");
    });

    it("should navigate back to homepage", () => {
      cy.get('a[href="/"]').contains("RETURN_TO_HOME").click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.get("h1").should("not.contain.text", "BLOG_SYSTEM");
    });
  });

  describe("Content Sections", () => {
    it("should display upcoming topics list", () => {
      const expectedTopics = [
        "React 19 & Advanced Patterns",
        "TypeScript Best Practices",
        "Performance Optimization",
        "Component Architecture",
        "Modern Frontend Tooling",
        "Developer Experience",
      ];

      expectedTopics.forEach((topic) => {
        cy.contains(topic).should("be.visible");
      });
    });

    it("should display status badge", () => {
      cy.contains("BLOG_MODULE_INITIALIZING").should("be.visible");
    });
  });

  describe("Responsive Design", () => {
    const viewports = [
      { width: 375, height: 667, name: "Mobile" },
      { width: 768, height: 1024, name: "Tablet" },
      { width: 1280, height: 720, name: "Desktop" },
    ];

    viewports.forEach(({ width, height, name }) => {
      it(`should display correctly on ${name}`, () => {
        cy.viewport(width, height);

        cy.get("h1").should("be.visible");
        cy.get('a[href="/"]').should("be.visible");
        cy.contains("COMING_SOON.exe").should("be.visible");
      });
    });
  });

  describe("Animations", () => {
    it("should have animated elements", () => {
      cy.get("h1").should("be.visible");

      cy.get('[aria-hidden="true"]').should("exist");
    });
  });
});
