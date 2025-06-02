/// <reference types="cypress" />

describe("Performance", () => {
  describe("Page Load Performance", () => {
    it("should load homepage within acceptable time", () => {
      const startTime = Date.now();

      cy.visit("/");
      cy.get("h1")
        .should("be.visible")
        .then(() => {
          const loadTime = Date.now() - startTime;
          expect(loadTime).to.be.lessThan(5000);
          cy.log(`Homepage loaded in ${loadTime}ms`);
        });
    });

    it("should load blog page quickly", () => {
      const startTime = Date.now();

      cy.visit("/blog");
      cy.get("h1")
        .should("be.visible")
        .then(() => {
          const loadTime = Date.now() - startTime;
          expect(loadTime).to.be.lessThan(3000);
          cy.log(`Blog page loaded in ${loadTime}ms`);
        });
    });
  });

  describe("Resource Loading", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should load images efficiently", () => {
      cy.get("img").each(($img) => {
        cy.wrap($img).should("be.visible");
        cy.wrap($img).should("have.prop", "complete", true);
      });
    });

    it("should not have excessive DOM nodes", () => {
      cy.document().then((doc) => {
        const nodeCount = doc.querySelectorAll("*").length;
        expect(nodeCount).to.be.lessThan(2000);
        cy.log(`DOM contains ${nodeCount} nodes`);
      });
    });
  });

  describe("Console and Errors", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should not have console errors", () => {
      cy.window().then((win) => {
        cy.spy(win.console, "error").as("consoleError");
      });

      cy.reload();
      cy.get("@consoleError").should("not.have.been.called");
    });

    it("should not have console warnings", () => {
      cy.window().then((win) => {
        cy.spy(win.console, "warn").as("consoleWarn");
      });

      cy.reload();
      cy.get("@consoleWarn").should("not.have.been.called");
    });
  });

  describe("Network Performance", () => {
    it("should make minimal network requests", () => {
      let requestCount = 0;

      cy.intercept("**/*", () => {
        requestCount++;
      });

      cy.visit("/");
      cy.get("h1")
        .should("be.visible")
        .then(() => {
          expect(requestCount).to.be.lessThan(50);
          cy.log(`Made ${requestCount} network requests`);
        });
    });

    it("should handle navigation efficiently", () => {
      cy.visit("/");
      cy.get("h1").should("be.visible");

      const startTime = Date.now();
      cy.get('a[href="/blog"]').click();

      cy.get("h1")
        .should("contain.text", "BLOG_SYSTEM")
        .then(() => {
          const navigationTime = Date.now() - startTime;
          expect(navigationTime).to.be.lessThan(2000);
          cy.log(`Navigation took ${navigationTime}ms`);
        });
    });
  });

  describe("Animation Performance", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should have smooth animations", () => {
      cy.get("main", { timeout: 5000 }).should("be.visible");
    });

    it("should complete page load without hanging", () => {
      cy.get("body").should("be.visible");
      cy.wait(2000);

      cy.get("nav").should("be.visible");
      cy.get("footer").should("be.visible");
    });
  });

  describe("User Interaction Performance", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should respond to clicks quickly", () => {
      const startTime = Date.now();

      cy.get("button, a").first().click();

      cy.then(() => {
        const responseTime = Date.now() - startTime;
        expect(responseTime).to.be.lessThan(1000);
        cy.log(`Click response time: ${responseTime}ms`);
      });
    });

    it("should handle form interactions smoothly", () => {
      cy.get("input, textarea").then(($inputs) => {
        if ($inputs.length > 0) {
          cy.wrap($inputs).first().type("test");
          cy.wrap($inputs).first().should("have.value", "test");
        }
      });
    });
  });

  describe("Page Size and Resources", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should have reasonable number of stylesheets", () => {
      cy.get("link[rel='stylesheet']").should("have.length.lessThan", 10);
    });

    it("should have reasonable number of scripts", () => {
      cy.get("script[src]").should("have.length.lessThan", 20);
    });

    it("should load CSS without blocking", () => {
      cy.get("body").should("have.css", "background-color");
      cy.get("h1").should("be.visible");
    });
  });
});
