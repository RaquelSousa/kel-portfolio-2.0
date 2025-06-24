import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "kel-ui-components";
import { NewsletterForm } from "@/components/forms";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-gradient mb-4">
                Raquel Sousa
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Senior Frontend Developer with 6+ years of React/TypeScript
                experience. Building scalable SaaS platforms and mentoring the
                next generation of developers.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://github.com/RaquelSousa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.linkedin.com/in/raquel-sousa-frontend-developer/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="mailto:raquel.sousa.wt@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: "About", id: "about" },
                  { label: "Experience", id: "experience" },
                  { label: "Projects", id: "projects" },
                  { label: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Lurgan, Northern Ireland</p>
                <a
                  href="mailto:raquel.sousa.wt@gmail.com"
                  className="block hover:text-primary transition-colors"
                >
                  raquel.sousa.wt@gmail.com
                </a>
                <a
                  href="tel:+447506433613"
                  className="block hover:text-primary transition-colors"
                >
                  +44 7506 433613
                </a>
              </div>
            </div>
          </div>

          {/* TODO: Newsletter signup - commented out for future implementation
          <div className="border-t border-border/50 mt-12 pt-8">
            <div className="max-w-md mx-auto text-center mb-8">
              <h4 className="font-semibold text-lg mb-2">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get notified about new projects, blog posts, and tech insights.
                No spam, unsubscribe anytime.
              </p>
              <NewsletterForm
                size="md"
                placeholder="Enter your email for updates"
                className="justify-center"
              />
            </div>
          </div>
          */}

          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Raquel Sousa. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Built using React 19, TypeScript & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
