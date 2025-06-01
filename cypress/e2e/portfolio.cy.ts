/// <reference types="cypress" />

describe("Portfolio App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the homepage", () => {
    cy.contains("h1");
    cy.url().should("eq", "http://localhost:8080/");
  });

  it("should be accessible", () => {
    cy.get("body").should("be.visible");
    cy.get('main, [role="main"]').should("exist");
  });

  it("should handle navigation", () => {
    cy.get("nav").should("exist");
  });

  it("should be responsive", () => {
    cy.viewport(375, 667);
    cy.get("body").should("be.visible");

    cy.viewport(1280, 720);
    cy.get("body").should("be.visible");
  });

  it("should load without console errors", () => {
    cy.window().then((win) => {
      cy.spy(win.console, "error").as("consoleError");
    });
    cy.visit("/");
    cy.get("@consoleError").should("not.have.been.called");
  });
});
