/// <reference types="cypress" />

describe("Contact Form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#contact, [data-section='contact']", {
      timeout: 10000,
    }).scrollIntoView();
  });

  describe("Form Display", () => {
    it("should display contact form", () => {
      cy.get("form, [data-testid='contact-form']").should("be.visible");
    });

    it("should have required form fields", () => {
      cy.get("input[type='text'], input[name*='name']").should("exist");
      cy.get("input[type='email'], input[name*='email']").should("exist");
      cy.get("textarea, input[name*='message']").should("exist");
    });

    it("should have submit button", () => {
      cy.get("button[type='submit'], input[type='submit']").should(
        "be.visible"
      );
    });

    it("should have proper form labels and placeholders", () => {
      cy.get("input[type='text'], input[name*='name']").should(
        "have.attr",
        "placeholder"
      );
      cy.get("input[type='email'], input[name*='email']").should(
        "have.attr",
        "placeholder"
      );
      cy.get("textarea, input[name*='message']").should(
        "have.attr",
        "placeholder"
      );
    });

    it("should display contact section title", () => {
      cy.get("#contact, [data-section='contact']").within(() => {
        cy.get("h1, h2, h3").should("exist");
      });
    });
  });

  describe("Form Validation", () => {
    it("should validate required fields", () => {
      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get("input:invalid, .error, [aria-invalid='true']").should("exist");
    });

    it("should validate email format", () => {
      cy.get("input[type='email'], input[name*='email']").type("invalid-email");
      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get(
        "input[type='email']:invalid, .error, [aria-invalid='true']"
      ).should("exist");
    });

    it("should accept valid email format", () => {
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("input[type='email'], input[name*='email']").should(
        "have.value",
        "test@example.com"
      );
    });

    it("should validate minimum message length", () => {
      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("textarea, input[name*='message']").type("Hi");

      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get("textarea:invalid, .error, [aria-invalid='true']").should("exist");
    });

    it("should accept valid form submission", () => {
      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("textarea, input[name*='message']").type(
        "This is a valid test message with sufficient length for form validation."
      );

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .should("not.have.attr", "aria-invalid", "true");
      cy.get("input[type='email'], input[name*='email']").should(
        "not.have.attr",
        "aria-invalid",
        "true"
      );
      cy.get("textarea, input[name*='message']").should(
        "not.have.attr",
        "aria-invalid",
        "true"
      );
    });

    it("should display validation messages", () => {
      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get(".error, [role='alert'], .text-red").should("exist");
    });
  });

  describe("Form Interaction", () => {
    it("should allow typing in all fields", () => {
      const testData = {
        name: "Test User",
        email: "test@example.com",
        message:
          "This is a comprehensive test message to verify form functionality",
      };

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type(testData.name);
      cy.get("input[type='email'], input[name*='email']").type(testData.email);
      cy.get("textarea, input[name*='message']").type(testData.message);

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .should("have.value", testData.name);
      cy.get("input[type='email'], input[name*='email']").should(
        "have.value",
        testData.email
      );
      cy.get("textarea, input[name*='message']").should(
        "contain.value",
        testData.message
      );
    });

    it("should be keyboard accessible", () => {
      cy.get("input[type='text'], input[name*='name']").first().focus();
      cy.focused().should("exist");

      cy.focused().type("{tab}");
      cy.focused().should("exist");

      cy.focused().type("{tab}");
      cy.focused().should("exist");

      cy.focused().type("{tab}");
      cy.focused().should("exist");
    });

    it("should clear form fields when reset", () => {
      cy.get("input[type='text'], input[name*='name']").first().type("Test");
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("textarea, input[name*='message']").type("Test message");

      cy.get("button[type='reset'], button")
        .contains(/reset|clear/i)
        .then(($resetBtn) => {
          if ($resetBtn.length > 0) {
            cy.wrap($resetBtn).click();

            cy.get("input[type='text'], input[name*='name']")
              .first()
              .should("have.value", "");
            cy.get("input[type='email'], input[name*='email']").should(
              "have.value",
              ""
            );
            cy.get("textarea, input[name*='message']").should("have.value", "");
          }
        });
    });

    it("should handle special characters in inputs", () => {
      const specialChars = "Test User & Co. <script>alert('xss')</script>";
      const specialEmail = "test+user@example-domain.com";
      const specialMessage =
        "Message with special chars: @#$%^&*()_+-=[]{}|;':\",./<>?";

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type(specialChars);
      cy.get("input[type='email'], input[name*='email']").type(specialEmail);
      cy.get("textarea, input[name*='message']").type(specialMessage);

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .should("contain.value", "Test User & Co.");
      cy.get("input[type='email'], input[name*='email']").should(
        "have.value",
        specialEmail
      );
      cy.get("textarea, input[name*='message']").should(
        "contain.value",
        "Message with special chars:"
      );
    });
  });

  describe("Form Submission", () => {
    it("should handle form submission gracefully", () => {
      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("textarea, input[name*='message']").type(
        "This is a valid test message with enough content for proper validation testing."
      );

      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get("body").should("not.contain", "error");
    });

    it("should show loading state during submission", () => {
      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("textarea, input[name*='message']").type(
        "Valid test message content"
      );

      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get(
        "button[type='submit'] svg, .loading, .spinner, [data-testid='loading']"
      ).should("exist");
    });

    it("should display success message after successful submission", () => {
      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("textarea, input[name*='message']").type(
        "This is a comprehensive test message for successful form submission."
      );

      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get(".success, [role='status'], .text-green", {
        timeout: 10000,
      }).should("exist");
    });

    it("should handle submission errors gracefully", () => {
      cy.intercept("POST", "**/contact", {
        statusCode: 500,
        body: { error: "Server error" },
      }).as("contactSubmissionError");

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type("Test User");
      cy.get("input[type='email'], input[name*='email']").type(
        "test@example.com"
      );
      cy.get("textarea, input[name*='message']").type(
        "Test message for error handling"
      );

      cy.get("button[type='submit'], input[type='submit']").click();

      cy.wait("@contactSubmissionError");
      cy.get(".error, [role='alert'], .text-red", { timeout: 10000 }).should(
        "exist"
      );
    });
  });

  describe("Form Security", () => {
    it("should sanitize input to prevent XSS", () => {
      const xssAttempt = "<script>alert('xss')</script>";

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .type(xssAttempt);
      cy.get("textarea, input[name*='message']").type(xssAttempt);

      cy.get("input[type='text'], input[name*='name']")
        .first()
        .should("not.contain.value", "<script>");
      cy.get("textarea, input[name*='message']").should(
        "not.contain.value",
        "<script>"
      );
    });

    it("should validate CSRF protection", () => {
      cy.get("form").should("exist");
      cy.get(
        "input[type='hidden'][name*='csrf'], input[type='hidden'][name*='token']"
      ).should("exist");
    });
  });

  describe("Responsive Design", () => {
    it("should be responsive on mobile", () => {
      cy.viewport(375, 667);

      cy.get("form, [data-testid='contact-form']").should("be.visible");
      cy.get("input, textarea").should("have.css", "width");

      cy.get("input[type='text'], input[name*='name']").should("be.visible");
      cy.get("input[type='email'], input[name*='email']").should("be.visible");
      cy.get("textarea, input[name*='message']").should("be.visible");
      cy.get("button[type='submit'], input[type='submit']").should(
        "be.visible"
      );
    });

    it("should be responsive on tablet", () => {
      cy.viewport(768, 1024);

      cy.get("form, [data-testid='contact-form']").should("be.visible");
      cy.get("input, textarea").should("be.visible");

      cy.get("input, textarea").each(($el) => {
        cy.wrap($el).should("have.css", "width").and("not.equal", "0px");
      });
    });

    it("should stack form elements properly on small screens", () => {
      cy.viewport(320, 568);

      cy.get("form, [data-testid='contact-form']").should("be.visible");

      cy.get("input, textarea, button").each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels and placeholders", () => {
      cy.get("input[type='text'], input[name*='name']").should(
        "have.attr",
        "placeholder"
      );
      cy.get("input[type='email'], input[name*='email']").should(
        "have.attr",
        "placeholder"
      );
      cy.get("textarea, input[name*='message']").should(
        "have.attr",
        "placeholder"
      );
    });

    it("should announce validation errors to screen readers", () => {
      cy.get("button[type='submit'], input[type='submit']").click();

      cy.get(
        "[role='alert'], [aria-live='polite'], [aria-live='assertive']"
      ).should("exist");
    });

    it("should support high contrast mode", () => {
      cy.get("form").should("be.visible");
      cy.get("input, textarea")
        .should("have.css", "border")
        .and("not.equal", "none");
    });
  });
});
