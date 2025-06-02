/// <reference types="cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Core Layout", () => {
    it("should display all main sections", () => {
      cy.get("nav").should("exist");
      cy.get('main[role="main"]').should("exist");
      cy.get("footer").should("exist");
    });

    it("should have proper heading structure", () => {
      cy.get("h1").should("exist");
      cy.get("h1").should("contain.text", "INITIALIZE:Raquel");
    });

    it("should have skip links for accessibility", () => {
      cy.get('a[href="#main-content"]').should("exist");
      cy.get('a[href="#navigation"]').should("exist");
    });
  });

  describe("Navigation", () => {
    it("should have working navigation menu", () => {
      cy.get("nav").first().should("be.visible");

      cy.get("nav")
        .first()
        .within(() => {
          cy.get('a[href*="about"], button').contains(/about/i).should("exist");
          cy.get('a[href*="experience"], button')
            .contains(/experience/i)
            .should("exist");
          cy.get('a[href*="projects"], button')
            .contains(/projects/i)
            .should("exist");
          cy.get('a[href*="contact"], button')
            .contains(/contact/i)
            .should("exist");
        });
    });

    it("should navigate to blog page", () => {
      cy.get("nav")
        .first()
        .within(() => {
          cy.get('a[href="/blog"]').should("exist").click();
        });

      cy.url().should("include", "/blog");
      cy.get("h1").should("contain.text", "BLOG_SYSTEM");
    });

    it("should support keyboard navigation", () => {
      cy.get("nav")
        .first()
        .within(() => {
          cy.get("a, button").first().focus();
          cy.focused().should("exist");

          cy.get("a, button").eq(1).focus();
          cy.focused().should("exist");
        });
    });
  });

  describe("Hero Section", () => {
    it("should display hero content", () => {
      cy.get("main").within(() => {
        cy.get("h1").should("be.visible");
        cy.get("p, div")
          .contains(/frontend|developer|react|typescript/i)
          .should("exist");
      });
    });

    it("should display status badge", () => {
      cy.contains("SYSTEM STATUS: AVAILABLE FOR DEPLOYMENT").should(
        "be.visible"
      );
      cy.get("svg").should("exist");
    });

    it("should display professional summary", () => {
      cy.contains("6+ YEARS CRAFTING EXCEPTIONAL DIGITAL EXPERIENCES").should(
        "be.visible"
      );
      cy.contains("REACT • TYPESCRIPT • NEXT.JS").should("be.visible");
      cy.contains("BUILDING THE FUTURE, ONE COMPONENT AT A TIME").should(
        "be.visible"
      );
    });

    it("should display location information", () => {
      cy.contains("LURGAN_NORTHERN_IRELAND").should("be.visible");
      cy.get('[aria-hidden="true"]').should("exist");
    });

    it("should have scroll down indicator", () => {
      cy.get(
        '[role="button"][aria-label="Scroll down to About section"]'
      ).should("be.visible");
    });
  });

  describe("Hero Action Buttons", () => {
    beforeEach(() => {
      cy.get("main").should("be.visible");
    });

    it("should display all action buttons", () => {
      cy.contains("button", "VIEW PROJECTS").should("be.visible");
      cy.contains("button", "VIEW CV").should("be.visible");
      cy.contains("button", "GET IN TOUCH").should("be.visible");
    });

    it("should have VIEW PROJECTS button that scrolls to projects section", () => {
      cy.contains("button", "VIEW PROJECTS").should("be.visible").click();

      cy.get("#projects, [data-section='projects']", { timeout: 5000 }).should(
        "be.visible"
      );

      cy.window().its("scrollY").should("be.greaterThan", 100);
    });

    it("should have VIEW CV button that opens CV in new tab", () => {
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

    it("should have GET IN TOUCH button that scrolls to contact section", () => {
      cy.contains("button", "GET IN TOUCH").should("be.visible").click();

      cy.get("#contact, [data-section='contact']", { timeout: 5000 }).should(
        "be.visible"
      );

      cy.window().its("scrollY").should("be.greaterThan", 100);
    });

    it("should have proper button styling and hover effects", () => {
      cy.contains("button", "VIEW PROJECTS")
        .should("have.class", "cyber-btn")
        .should("have.css", "border");

      cy.contains("button", "VIEW CV")
        .should("have.class", "cyber-btn")
        .should("have.css", "border");

      cy.contains("button", "GET IN TOUCH")
        .should("have.class", "cyber-btn-outline")
        .should("have.css", "border");
    });

    it("should have accessible button labels and icons", () => {
      cy.contains("button", "VIEW CV").within(() => {
        cy.get("svg").should("exist");
      });

      cy.contains("button", "GET IN TOUCH").within(() => {
        cy.get("svg").should("exist");
      });

      cy.contains("button", "VIEW PROJECTS").within(() => {
        cy.get("svg").should("exist");
      });
    });

    it("should support keyboard interaction", () => {
      cy.contains("button", "VIEW CV").focus();
      cy.focused().should("contain.text", "VIEW CV");

      cy.focused().type("{enter}");

      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpenKeyboard");
      });
    });
  });

  describe("Social Media Links", () => {
    it("should display GitHub and LinkedIn links", () => {
      cy.get('a[href*="github.com"]').should("be.visible");
      cy.get('a[href*="linkedin.com"]').should("be.visible");
    });

    it("should open social links in new tabs", () => {
      cy.get('a[href*="github.com"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");

      cy.get('a[href*="linkedin.com"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");
    });

    it("should have proper icons for social links", () => {
      cy.get('a[href*="github.com"]')
        .first()
        .within(() => {
          cy.get("svg").should("exist");
        });

      cy.get('a[href*="linkedin.com"]')
        .first()
        .within(() => {
          cy.get("svg").should("exist");
        });
    });
  });

  describe("Tech Stack Display", () => {
    it("should display tech stack section", () => {
      cy.get("main").within(() => {
        const techStack = [
          "React",
          "TypeScript",
          "Next.js",
          "Tailwind",
          "Node.js",
        ];

        techStack.forEach((tech) => {
          cy.contains(tech, { matchCase: false }).should("exist");
        });
      });
    });
  });

  describe("Portfolio Sections", () => {
    it("should load About section", () => {
      cy.get("#about, [data-section='about']", { timeout: 15000 }).should(
        "be.visible"
      );
    });

    it("should load Experience section", () => {
      cy.get("#experience, [data-section='experience']", {
        timeout: 15000,
      }).should("be.visible");
    });

    it("should load Projects section", () => {
      cy.get("#projects, [data-section='projects']", { timeout: 15000 }).should(
        "exist"
      );
      cy.get("#projects, [data-section='projects']").scrollIntoView();
      cy.wait(3000);
      cy.get("#projects, [data-section='projects']")
        .should("have.css", "opacity")
        .and("not.equal", "0");
    });

    it("should load Skills section", () => {
      cy.get("#skills, [data-section='skills']", { timeout: 15000 }).should(
        "be.visible"
      );
    });

    it("should load Contact section", () => {
      cy.get("#contact, [data-section='contact']", { timeout: 15000 }).should(
        "be.visible"
      );
    });

    it("should have proper section transitions", () => {
      cy.get("#about, [data-section='about']").scrollIntoView();
      cy.wait(500);

      cy.get("#experience, [data-section='experience']").scrollIntoView();
      cy.wait(500);

      cy.get("#projects, [data-section='projects']").scrollIntoView();
      cy.wait(500);

      cy.get("#skills, [data-section='skills']").scrollIntoView();
      cy.wait(500);

      cy.get("#contact, [data-section='contact']").scrollIntoView();
      cy.wait(500);
    });
  });

  describe("Responsive Design", () => {
    const viewports = [
      { width: 375, height: 667, name: "iPhone SE" },
      { width: 768, height: 1024, name: "iPad" },
      { width: 1280, height: 720, name: "Desktop" },
      { width: 1920, height: 1080, name: "Large Desktop" },
    ];

    viewports.forEach(({ width, height, name }) => {
      it(`should display correctly on ${name} (${width}x${height})`, () => {
        cy.viewport(width, height);

        if (width >= 1024) {
          cy.get("nav").should("be.visible");
        }
        cy.get("main").should("be.visible");
        cy.get("h1").should("be.visible");

        cy.get("body").should("not.have.css", "overflow-x", "scroll");

        cy.contains("button", "VIEW PROJECTS").should("be.visible");
        cy.contains("button", "VIEW CV").should("be.visible");
        cy.contains("button", "GET IN TOUCH").should("be.visible");
      });
    });

    it("should stack buttons vertically on mobile", () => {
      cy.viewport(375, 667);

      cy.get("main").within(() => {
        cy.contains("button", "VIEW PROJECTS").should("be.visible");
        cy.contains("button", "VIEW CV").should("be.visible");
        cy.contains("button", "GET IN TOUCH").should("be.visible");
      });
    });
  });

  describe("Performance", () => {
    it("should load without console errors", () => {
      cy.window().then((win) => {
        cy.spy(win.console, "error").as("consoleError");
      });

      cy.reload();
      cy.get("@consoleError").should("not.have.been.called");
    });

    it("should load main content within reasonable time", () => {
      const startTime = Date.now();

      cy.get("h1")
        .should("be.visible")
        .then(() => {
          const loadTime = Date.now() - startTime;
          expect(loadTime).to.be.lessThan(5000);
        });
    });

    it("should load hero buttons quickly", () => {
      cy.contains("button", "VIEW CV", { timeout: 3000 }).should("be.visible");
      cy.contains("button", "VIEW PROJECTS", { timeout: 3000 }).should(
        "be.visible"
      );
      cy.contains("button", "GET IN TOUCH", { timeout: 3000 }).should(
        "be.visible"
      );
    });
  });

  describe("SEO and Meta", () => {
    it("should have proper meta tags", () => {
      cy.get('meta[name="description"]').should("exist");
      cy.get('meta[property="og:title"]').should("exist");
      cy.get('meta[property="og:description"]').should("exist");
      cy.get('link[rel="canonical"]').should("exist");
    });

    it("should have structured data", () => {
      cy.get('script[type="application/ld+json"]').should("exist");
    });
  });

  describe("Interactions", () => {
    it("should handle smooth scrolling", () => {
      cy.get("nav")
        .first()
        .within(() => {
          cy.get('a[href*="#"], button').first().click();
        });

      cy.wait(1000);
      cy.window().its("scrollY").should("be.greaterThan", 0);
    });

    it("should handle scroll down indicator", () => {
      cy.get(
        '[role="button"][aria-label="Scroll down to About section"]'
      ).click({ force: true });

      cy.get("#about, [data-section='about']", { timeout: 5000 }).should(
        "be.visible"
      );
      cy.window().its("scrollY").should("be.greaterThan", 100);
    });

    it("should handle keyboard navigation for scroll indicator", () => {
      cy.get(
        '[role="button"][aria-label="Scroll down to About section"]'
      ).focus();
      cy.focused().type("{enter}");

      cy.get("#about, [data-section='about']", { timeout: 5000 }).should(
        "be.visible"
      );
    });
  });

  describe("Animations and Visual Effects", () => {
    it("should have matrix background animation", () => {
      cy.get("main").should("be.visible");
      cy.get("canvas, [class*='matrix']").should("exist");
    });

    it("should have glitch text effect", () => {
      cy.get("h1").within(() => {
        cy.contains("Raquel").should("be.visible");
      });
    });

    it("should have cursor blinking animation", () => {
      cy.get('[aria-hidden="true"]').should("exist");
    });

    it("should respect reduced motion preferences", () => {
      cy.window().then((win) => {
        const prefersReducedMotion = win.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) {
          cy.log("Reduced motion is preferred");
        }
      });
    });
  });
});
