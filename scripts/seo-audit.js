import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SEOAuditor {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passes = [];
  }

  log(message, type = "info") {
    const timestamp = new Date().toISOString();
    const colors = {
      error: "\x1b[31m",
      warning: "\x1b[33m",
      success: "\x1b[32m",
      info: "\x1b[36m",
      reset: "\x1b[0m",
    };

    console.log(
      `${colors[type]}[${type.toUpperCase()}] ${timestamp}: ${message}${
        colors.reset
      }`
    );
  }

  checkFile(filePath, description) {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      this.passes.push(`✓ ${description} exists at ${filePath}`);
      return true;
    } else {
      this.issues.push(`✗ ${description} missing at ${filePath}`);
      return false;
    }
  }

  checkFileContent(filePath, pattern, description) {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (pattern.test(content)) {
        this.passes.push(`✓ ${description}`);
        return true;
      } else {
        this.issues.push(`✗ ${description}`);
        return false;
      }
    } else {
      this.issues.push(`✗ File not found for check: ${filePath}`);
      return false;
    }
  }

  auditBasicFiles() {
    this.log("Checking basic SEO files...", "info");

    this.checkFile("public/robots.txt", "Robots.txt");
    this.checkFile("public/sitemap.xml", "Sitemap.xml");
    this.checkFile("public/favicon.ico", "Favicon");
    this.checkFile(
      "public/browserconfig.xml",
      "Browser config for Windows tiles"
    );
    this.checkFile("public/placeholder.svg", "Placeholder image for OG tags");
  }

  auditMetaTags() {
    this.log("Checking meta tags in index.html...", "info");

    this.checkFileContent(
      "index.html",
      /<title>.*<\/title>/,
      "Title tag present in index.html"
    );

    this.checkFileContent(
      "index.html",
      /<meta\s+name="description"\s+content=".*"[^>]*>/,
      "Meta description present"
    );

    this.checkFileContent(
      "index.html",
      /<meta\s+name="viewport"\s+content=".*"[^>]*>/,
      "Viewport meta tag present"
    );

    this.checkFileContent(
      "index.html",
      /<meta\s+property="og:title"\s+content=".*"[^>]*>/,
      "Open Graph title present"
    );

    this.checkFileContent(
      "index.html",
      /<meta\s+name="twitter:card"\s+content=".*"[^>]*>/,
      "Twitter Card meta present"
    );
  }

  auditSitemap() {
    this.log("Validating sitemap...", "info");

    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toISOString().split("T")[0];

    this.checkFileContent(
      "public/sitemap.xml",
      new RegExp(`<lastmod>${currentYear}`),
      "Sitemap has current year dates"
    );

    this.checkFileContent(
      "public/sitemap.xml",
      /<url>.*https:\/\/raquelsousa\.dev.*<\/url>/s,
      "Sitemap contains main domain"
    );

    this.checkFileContent(
      "public/sitemap.xml",
      /<priority>1\.0<\/priority>/,
      "Homepage has priority 1.0"
    );
  }

  auditRobots() {
    this.log("Validating robots.txt...", "info");

    this.checkFileContent(
      "public/robots.txt",
      /User-agent: \*/,
      "Robots.txt has wildcard user-agent"
    );

    this.checkFileContent(
      "public/robots.txt",
      /Allow: \//,
      "Robots.txt allows crawling"
    );

    this.checkFileContent(
      "public/robots.txt",
      /Sitemap: https:\/\/raquelsousa\.dev\/sitemap\.xml/,
      "Robots.txt references sitemap"
    );
  }

  auditStructuredData() {
    this.log("Checking structured data implementation...", "info");

    const structuredDataFile = "src/utils/structuredData.ts";
    if (this.checkFile(structuredDataFile, "Structured data utilities")) {
      this.checkFileContent(
        structuredDataFile,
        /@context.*schema\.org/,
        "Schema.org context in structured data"
      );

      this.checkFileContent(
        structuredDataFile,
        /@type.*Person/,
        "Person schema type present"
      );

      this.checkFileContent(
        structuredDataFile,
        /Frontend Developer/,
        "Job title specified in structured data"
      );
    }
  }

  auditSEOComponent() {
    this.log("Checking SEO component implementation...", "info");

    const seoFile = "src/components/SEO.tsx";
    if (this.checkFile(seoFile, "SEO component")) {
      this.checkFileContent(
        seoFile,
        /updateMetaTag.*og:title/,
        "Open Graph title updating"
      );

      this.checkFileContent(
        seoFile,
        /updateMetaTag.*twitter:card/,
        "Twitter Card meta updating"
      );

      this.checkFileContent(
        seoFile,
        /canonical/,
        "Canonical URL implementation"
      );

      this.checkFileContent(
        seoFile,
        /robots.*follow/,
        "Robots directive allowing follow"
      );
    }
  }

  auditAccessibility() {
    this.log("Checking accessibility SEO factors...", "info");

    this.checkFileContent(
      "src/pages/Index.tsx",
      /<main.*role="main"/,
      'Main content has role="main"'
    );

    this.checkFileContent(
      "src/pages/Index.tsx",
      /skip.*content/i,
      "Skip links present for accessibility"
    );

    const heroFile = "src/components/Hero.tsx";
    if (this.checkFile(heroFile, "Hero component")) {
      this.checkFileContent(
        heroFile,
        /<h1/,
        "H1 tag present in Hero component"
      );
    }
  }

  generateReport() {
    this.log("\n=== SEO AUDIT REPORT ===", "info");

    this.log(`\n✅ PASSED CHECKS (${this.passes.length}):`, "success");
    this.passes.forEach((pass) => this.log(pass, "success"));

    if (this.warnings.length > 0) {
      this.log(`\n⚠️  WARNINGS (${this.warnings.length}):`, "warning");
      this.warnings.forEach((warning) => this.log(warning, "warning"));
    }

    if (this.issues.length > 0) {
      this.log(`\n❌ ISSUES FOUND (${this.issues.length}):`, "error");
      this.issues.forEach((issue) => this.log(issue, "error"));
    } else {
      this.log("\n🎉 No critical SEO issues found!", "success");
    }

    const totalChecks =
      this.passes.length + this.warnings.length + this.issues.length;
    const score = Math.round((this.passes.length / totalChecks) * 100);

    this.log(
      `\n📊 SEO SCORE: ${score}%`,
      score >= 90 ? "success" : score >= 70 ? "warning" : "error"
    );

    if (score >= 90) {
      this.log("🚀 Excellent SEO implementation!", "success");
    } else if (score >= 70) {
      this.log("👍 Good SEO, but room for improvement", "warning");
    } else {
      this.log("⚠️  SEO needs attention", "error");
    }
  }

  run() {
    this.log("Starting SEO audit for Raquel Sousa Portfolio...", "info");

    this.auditBasicFiles();
    this.auditMetaTags();
    this.auditSitemap();
    this.auditRobots();
    this.auditStructuredData();
    this.auditSEOComponent();
    this.auditAccessibility();

    this.generateReport();
  }
}

const auditor = new SEOAuditor();
auditor.run();
