/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      checkA11y(selector?: string): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
      testResponsive(
        breakpoints?: Array<{ width: number; height: number; name: string }>
      ): Chainable<void>;
      scrollToSection(sectionId: string): Chainable<JQuery<HTMLElement>>;
      testForm(formData: {
        name?: string;
        email?: string;
        message?: string;
      }): Chainable<void>;
      checkConsole(): Chainable<void>;
      measurePerformance(testName: string): Chainable<number>;
    }
  }
}

Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("checkA11y", (selector?: string) => {
  const target = selector || "body";
  cy.get(target).should("exist");
  cy.get(target).within(() => {
    cy.get("img").each(($img) => {
      cy.wrap($img).should("have.attr", "alt");
    });
  });
});

Cypress.Commands.add("waitForPageLoad", () => {
  cy.get("h1").should("be.visible");
  cy.get("nav").should("be.visible");
  cy.document().should("exist");
});

Cypress.Commands.add(
  "testResponsive",
  (breakpoints?: Array<{ width: number; height: number; name: string }>) => {
    const defaultBreakpoints = [
      { width: 375, height: 667, name: "Mobile" },
      { width: 768, height: 1024, name: "Tablet" },
      { width: 1280, height: 720, name: "Desktop" },
    ];

    const viewports = breakpoints || defaultBreakpoints;

    viewports.forEach(({ width, height, name }) => {
      cy.log(`Testing ${name} viewport: ${width}x${height}`);
      cy.viewport(width, height);
      cy.get("body").should("be.visible");
      cy.get("nav").should("be.visible");
    });
  }
);

Cypress.Commands.add("scrollToSection", (sectionId: string) => {
  cy.get(`#${sectionId}, [data-section="${sectionId}"]`, { timeout: 10000 })
    .scrollIntoView()
    .should("be.visible");
});

Cypress.Commands.add(
  "testForm",
  (formData: { name?: string; email?: string; message?: string }) => {
    if (formData.name) {
      cy.get('input[type="text"], input[name*="name"]')
        .first()
        .type(formData.name);
    }
    if (formData.email) {
      cy.get('input[type="email"], input[name*="email"]').type(formData.email);
    }
    if (formData.message) {
      cy.get('textarea, input[name*="message"]').type(formData.message);
    }
  }
);

Cypress.Commands.add("checkConsole", () => {
  cy.window().then((win) => {
    cy.spy(win.console, "error").as("consoleError");
    cy.spy(win.console, "warn").as("consoleWarn");
  });
});

Cypress.Commands.add("measurePerformance", (testName: string) => {
  const startTime = Date.now();

  return cy.then(() => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    cy.log(`${testName}: ${duration}ms`);
    return duration;
  });
});

export {};
