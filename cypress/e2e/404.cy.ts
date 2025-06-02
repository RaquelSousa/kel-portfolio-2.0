/// <reference types="cypress" />

describe("404 Not Found Page", () => {
  beforeEach(() => {
    cy.visit("/non-existent-page", { failOnStatusCode: false });
  });

  describe("Layout and Content", () => {
    it("should display 404 page for invalid routes", () => {
      cy.get("nav").should("exist");
      cy.get("main").should("exist");
    });

    it("should have proper navigation back to home", () => {
      cy.get('a[href="/"]').should("exist");
    });

    it("should navigate back to homepage", () => {
      cy.get('a[href="/"]').first().click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  describe("Multiple Invalid Routes", () => {
    const invalidRoutes = [
      "/invalid-page",
      "/blog/non-existent-post",
      "/random-route",
      "/admin",
      "/dashboard",
    ];

    invalidRoutes.forEach((route) => {
      it(`should handle ${route} route gracefully`, () => {
        cy.visit(route, { failOnStatusCode: false });

        cy.get("nav").should("exist");
        cy.get('a[href="/"]').should("exist");
      });
    });
  });

  describe("Responsive Design", () => {
    it("should display correctly on mobile", () => {
      cy.viewport(375, 667);

      cy.get("nav").should("be.visible");
      cy.get('a[href="/"]').should("be.visible");
    });

    it("should display correctly on desktop", () => {
      cy.viewport(1280, 720);

      cy.get("nav").should("be.visible");
      cy.get('a[href="/"]').should("be.visible");
    });
  });
});
