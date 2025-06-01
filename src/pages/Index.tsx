import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import {
  SuspendedAbout,
  SuspendedExperience,
  SuspendedProjects,
  SuspendedSkills,
  SuspendedContact,
} from "@/components/LazyComponents";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import ComponentErrorBoundary from "@/components/ComponentErrorBoundary";
import {
  PerformanceMonitor,
  analyzeBundlePerformance,
} from "@/utils/performance";
import {
  generatePersonSchemaWithExperience,
  generateWebsiteSchema,
} from "@/utils/structuredData";
import { usePageView, useComponentTracking } from "@/hooks/useAnalytics";
import { trackEvent } from "@/lib/analytics";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

const Index = () => {
  usePageView("/", "Kel's Portfolio - Senior Frontend Developer");

  const { trackAction } = useComponentTracking("HomePage");

  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.markLoadStart();

    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.classList.add("dark");

    console.log("Portfolio loaded successfully");

    trackEvent("page_loaded", {
      page: "home",
      loadTime: performance.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });

    monitor.markLoadEnd();
    monitor.logMetrics();

    const webVitals = monitor.getWebVitals();
    trackEvent("performance_metrics", {
      page: "home",
      ...webVitals,
    });

    setTimeout(() => {
      analyzeBundlePerformance();

      trackAction("bundle_analysis_completed");
    }, 2000);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";

      trackEvent("page_unloaded", {
        page: "home",
        timeOnPage: performance.now(),
      });
    };
  }, [trackAction]);

  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@graph": [
      generateWebsiteSchema(),
      generatePersonSchemaWithExperience(),
      {
        "@type": "WebPage",
        "@id": "https://raquelsousa.dev/",
        url: "https://raquelsousa.dev",
        name: "Raquel Sousa - Frontend Developer | React & TypeScript Expert",
        isPartOf: {
          "@id": "https://raquelsousa.dev",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "/placeholder.svg",
        },
        description:
          "Frontend Developer with expertise in React/TypeScript building scalable SaaS platforms and enterprise applications. Expert in modern development tooling including Vite, Next.js build optimization, and CI/CD workflows. Available for roles in Belfast, Northern Ireland.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://raquelsousa.dev",
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="Raquel Sousa - Frontend Developer | React & TypeScript Expert"
        description="Frontend Developer with expertise in React/TypeScript building scalable SaaS platforms and enterprise applications. Expert in modern development tooling including Vite, Next.js build optimization, and CI/CD workflows. Available for roles in Belfast, Northern Ireland."
        keywords={[
          "React Developer",
          "TypeScript",
          "Frontend Engineer",
          "Developer",
          "Belfast",
          "Northern Ireland",
          "SaaS",
          "Next.js",
          "Component Libraries",
          "Vite",
          "Azure DevOps",
        ]}
        type="profile"
        url="https://raquelsousa.dev"
        structuredData={homepageStructuredData}
        canonical="https://raquelsousa.dev"
      />

      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50">
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to navigation
        </a>
      </div>

      <ComponentErrorBoundary componentName="Navigation" showMinimalUI={true}>
        <Navigation />
      </ComponentErrorBoundary>

      <main id="main-content" role="main">
        <ComponentErrorBoundary componentName="Hero">
          <Hero />
        </ComponentErrorBoundary>

        <ComponentErrorBoundary componentName="About">
          <SuspendedAbout />
        </ComponentErrorBoundary>

        <ComponentErrorBoundary componentName="Experience">
          <SuspendedExperience />
        </ComponentErrorBoundary>

        <ComponentErrorBoundary componentName="Projects">
          <SuspendedProjects />
        </ComponentErrorBoundary>

        <ComponentErrorBoundary componentName="Skills">
          <SuspendedSkills />
        </ComponentErrorBoundary>

        <ComponentErrorBoundary componentName="Contact">
          <SuspendedContact />
        </ComponentErrorBoundary>
      </main>

      <ComponentErrorBoundary componentName="Footer" showMinimalUI={true}>
        <Footer />
      </ComponentErrorBoundary>

      <AnalyticsDashboard />
    </>
  );
};

export default Index;
