/// <reference types="cypress" />

describe("Integration Tests - User Journeys", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Complete User Journey", () => {
    it("should support full navigation flow through all sections", () => {
      cy.get("h1").should("contain.text", "INITIALIZE:Raquel");

      cy.contains("button", "VIEW PROJECTS").click();
      cy.get("#projects, [data-section='projects']", { timeout: 5000 }).should(
        "be.visible"
      );

      cy.get("nav")
        .first()
        .within(() => {
          cy.get("a, button").contains(/about/i).click();
        });
      cy.get("#about, [data-section='about']", { timeout: 5000 }).should(
        "be.visible"
      );

      cy.get("nav")
        .first()
        .within(() => {
          cy.get("a, button")
            .contains(/experience/i)
            .click();
        });
      cy.get("#experience, [data-section='experience']", {
        timeout: 5000,
      }).should("be.visible");

      cy.get("nav")
        .first()
        .within(() => {
          cy.get("a, button")
            .contains(/contact/i)
            .click();
        });
      cy.get("#contact, [data-section='contact']", { timeout: 5000 }).should(
        "be.visible"
      );
    });

    it("should handle complete contact form submission flow", () => {
      cy.contains("button", "GET IN TOUCH").click();
      cy.get("#contact, [data-section='contact']", { timeout: 5000 }).should(
        "be.visible"
      );

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Integration Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "integration@test.com"
      );
      cy.get("textarea, input[name*='message']").type(
        "This is a comprehensive integration test message to verify the complete contact form workflow including validation and submission handling."
      );

      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get(".success, [role='status'], .text-green", {
        timeout: 10000,
      }).should("exist");
    });

    it("should support complete keyboard navigation", () => {
      cy.get("body").type("{tab}");
      cy.focused().should("exist");

      cy.focused().type("{tab}");
      cy.focused().should("exist");

      cy.get("nav")
        .first()
        .within(() => {
          cy.get("a, button").first().focus();
          cy.focused().type("{enter}");
        });

      cy.wait(1000);
      cy.window().its("scrollY").should("be.greaterThan", 0);
    });
  });

  describe("Cross-Component Interactions", () => {
    it("should maintain scroll position when navigating between sections", () => {
      cy.contains("button", "VIEW PROJECTS").click();
      cy.get("#projects, [data-section='projects']", { timeout: 5000 }).should(
        "be.visible"
      );

      cy.window()
        .its("scrollY")
        .then((initialScroll) => {
          expect(initialScroll).to.be.greaterThan(100);

          cy.get("nav")
            .first()
            .within(() => {
              cy.get("a, button").contains(/about/i).click();
            });

          cy.window().its("scrollY").should("be.greaterThan", 0);
        });
    });

    it("should handle theme consistency across components", () => {
      cy.get("main").should("have.css", "background-color");

      cy.get("nav").should("be.visible");
      cy.get("footer").should("be.visible");

      cy.get("button").should("have.css", "color");
      cy.get("input, textarea").should("have.css", "border-color");
    });

    it("should maintain responsive behavior across all components", () => {
      cy.viewport(375, 667);

      cy.get("nav").should("exist");
      cy.get("main").should("be.visible");
      cy.get("footer").should("exist");

      cy.contains("button", "VIEW CV").should("be.visible");
      cy.contains("button", "VIEW PROJECTS").should("be.visible");
      cy.contains("button", "GET IN TOUCH").should("be.visible");

      cy.viewport(1280, 720);

      cy.get("nav").should("be.visible");
      cy.get("main").should("be.visible");
      cy.get("footer").should("be.visible");
    });
  });

  describe("Hero Section Integration", () => {
    it("should handle VIEW CV button with proper tracking", () => {
      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpen");
      });

      cy.contains("button", "VIEW CV").should("be.visible").click();

      cy.get("@windowOpen").should(
        "have.been.calledWith",
        "https://docs.google.com/document/d/1t82n3E9je6DkGVWS-vznq8o7x5gZwT3-CvJkcL0GRt8/edit?tab=t.0",
        "_blank",
        "noopener,noreferrer"
      );
    });

    it("should integrate hero animations with scroll behavior", () => {
      cy.get("h1").should("be.visible");
      cy.get(
        '[role="button"][aria-label="Scroll down to About section"]'
      ).should("be.visible");

      cy.get(
        '[role="button"][aria-label="Scroll down to About section"]'
      ).click();

      cy.get("#about, [data-section='about']", { timeout: 5000 }).should(
        "be.visible"
      );
      cy.window().its("scrollY").should("be.greaterThan", 100);
    });

    it("should handle hero button interactions with proper focus management", () => {
      cy.contains("button", "VIEW PROJECTS").focus();
      cy.focused().should("contain.text", "VIEW PROJECTS");

      cy.focused().type("{tab}");
      cy.focused().should("contain.text", "VIEW CV");

      cy.focused().type("{tab}");
      cy.focused().should("contain.text", "GET IN TOUCH");
    });
  });

  describe("Performance and Error Handling", () => {
    it("should handle network errors gracefully", () => {
      cy.intercept("POST", "**/contact", {
        statusCode: 500,
        body: { error: "Network error" },
      }).as("networkError");

      cy.contains("button", "GET IN TOUCH").click();
      cy.get("#contact, [data-section='contact']", { timeout: 5000 }).should(
        "be.visible"
      );

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Error Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "error@test.com"
      );
      cy.get("textarea, input[name*='message']").type("Testing error handling");

      cy.get("button[type='submit'], input[type='submit']").click();

      cy.wait("@networkError");
      cy.get(".error, [role='alert'], .text-red", { timeout: 10000 }).should(
        "exist"
      );
    });

    it("should maintain performance across all interactions", () => {
      const interactions = [
        () => cy.contains("button", "VIEW PROJECTS").click(),
        () =>
          cy
            .get("nav")
            .first()
            .within(() => cy.get("a, button").contains(/about/i).click()),
        () =>
          cy
            .get("nav")
            .first()
            .within(() =>
              cy
                .get("a, button")
                .contains(/experience/i)
                .click()
            ),
        () => cy.contains("button", "GET IN TOUCH").click(),
      ];

      interactions.forEach((interaction, index) => {
        const startTime = Date.now();
        interaction();
        cy.then(() => {
          const responseTime = Date.now() - startTime;
          expect(responseTime).to.be.lessThan(2000);
          cy.log(`Interaction ${index + 1} response time: ${responseTime}ms`);
        });
        cy.wait(500);
      });
    });
  });

  describe("Social Media Integration", () => {
    it("should handle social media links correctly", () => {
      cy.get('a[href*="github.com"]').should("be.visible");
      cy.get('a[href*="linkedin.com"]').should("be.visible");

      cy.get('a[href*="github.com"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");

      cy.get('a[href*="linkedin.com"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");
    });

    it("should maintain social link accessibility", () => {
      cy.get('a[href*="github.com"]').within(() => {
        cy.get("svg").should("exist");
      });

      cy.get('a[href*="linkedin.com"]').within(() => {
        cy.get("svg").should("exist");
      });

      cy.get('a[href*="github.com"]').focus();
      cy.focused().should("exist");

      cy.focused().type("{tab}");
      cy.focused().should("exist");
    });
  });

  describe("Multi-Device Integration", () => {
    const devices = [
      { width: 320, height: 568, name: "iPhone 5" },
      { width: 375, height: 812, name: "iPhone X" },
      { width: 768, height: 1024, name: "iPad" },
      { width: 1024, height: 768, name: "iPad Landscape" },
      { width: 1280, height: 720, name: "Desktop" },
      { width: 1920, height: 1080, name: "Large Desktop" },
    ];

    devices.forEach(({ width, height, name }) => {
      it(`should handle complete user journey on ${name}`, () => {
        cy.viewport(width, height);

        cy.get("h1").should("be.visible");

        cy.contains("button", "VIEW CV").should("be.visible");
        cy.contains("button", "VIEW PROJECTS").should("be.visible");
        cy.contains("button", "GET IN TOUCH").should("be.visible");

        cy.contains("button", "VIEW PROJECTS").click();
        cy.get("#projects, [data-section='projects']", {
          timeout: 5000,
        }).should("be.visible");

        if (width >= 768) {
          cy.get("nav").should("be.visible");
        }

        cy.contains("button", "GET IN TOUCH").click();
        cy.get("#contact, [data-section='contact']", { timeout: 5000 }).should(
          "be.visible"
        );

        cy.get("form, [data-testid='contact-form']").should("be.visible");
      });
    });
  });

  describe("Blog Navigation Integration", () => {
    it("should handle blog navigation and return journey", () => {
      cy.get("nav")
        .first()
        .within(() => {
          cy.get('a[href="/blog"]').should("exist").click();
        });

      cy.url().should("include", "/blog");
      cy.get("h1").should("contain.text", "BLOG_SYSTEM");

      cy.get('a[href="/"]').contains("RETURN_TO_HOME").click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.get("h1").should("contain.text", "INITIALIZE:Raquel");

      cy.contains("button", "VIEW CV").should("be.visible");
    });
  });

  describe("Error Boundary Integration", () => {
    it("should handle 404 errors and return to homepage", () => {
      cy.visit("/non-existent-page", { failOnStatusCode: false });

      cy.get("nav").should("exist");
      cy.get('a[href="/"]').should("exist").click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.get("h1").should("contain.text", "INITIALIZE:Raquel");
    });
  });
});
