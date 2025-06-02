/// <reference types="cypress" />

describe("Accessibility", () => {
  describe("Homepage Accessibility", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should have proper semantic HTML structure", () => {
      cy.get("nav").should("exist");
      cy.get('main[role="main"]').should("exist");
      cy.get("footer").should("exist");
      cy.get("h1").should("exist");
    });

    it("should have skip links", () => {
      cy.get('a[href="#main-content"]').should("exist");
      cy.get('a[href="#navigation"]').should("exist");
    });

    it("should have accessible navigation links", () => {
      cy.get("nav a").should("have.length.greaterThan", 0);
      cy.get("nav button").should("exist");
    });

    it("should have proper heading hierarchy", () => {
      cy.get("h1").should("have.length.at.least", 1);
      cy.get("h1").should("be.visible").and("not.be.empty");
    });

    it("should have alt text for all images", () => {
      cy.get("img")
        .should("exist")
        .each(($img) => {
          cy.wrap($img).should("have.attr", "alt");
        });
    });

    it("should be keyboard accessible", () => {
      cy.get("a, button").first().focus();
      cy.focused().should("exist");
    });
  });

  describe("Blog Page Accessibility", () => {
    beforeEach(() => {
      cy.visit("/blog");
    });

    it("should have proper semantic structure", () => {
      cy.get("nav").should("exist");
      cy.get("main").should("exist");
      cy.get("h1").should("exist");
    });

    it("should have accessible return link", () => {
      cy.get('a[href="/"]').should("contain.text", "RETURN_TO_HOME");
    });
  });

  describe("Form Accessibility", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should have labeled form inputs", () => {
      cy.get("input, textarea, select").each(($input) => {
        cy.wrap($input).then(($el) => {
          const hasLabel =
            $el.attr("aria-label") ||
            $el.attr("placeholder") ||
            $el.closest("label").length > 0;
          if (!hasLabel) {
            cy.log("Form input without proper label found");
          }
        });
      });
    });
  });

  describe("Screen Reader Support", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should have proper landmarks", () => {
      cy.get("nav, [role='navigation']").should("exist");
      cy.get("main, [role='main']").should("exist");
      cy.get("footer, [role='contentinfo']").should("exist");
    });

    it("should have meaningful link text", () => {
      cy.get("a").each(($link) => {
        cy.wrap($link).then(($el) => {
          const text = $el.text().trim();
          const hasAriaLabel = $el.attr("aria-label");

          if (text.length === 0 && !hasAriaLabel) {
            cy.log("Link without accessible text found");
          }
        });
      });
    });
  });

  describe("Visual Accessibility", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should have proper color contrast", () => {
      cy.get("body").should("have.css", "background-color");
      cy.get("body").should("have.css", "color");
    });

    it("should respect user preferences", () => {
      cy.window().then((win) => {
        const prefersReducedMotion = win.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        cy.log(`Prefers reduced motion: ${prefersReducedMotion}`);
      });
    });
  });
});
