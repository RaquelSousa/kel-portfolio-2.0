import { useEffect } from "react";

interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "profile" | "article";
  structuredData?: StructuredData;
  canonical?: string;
}

const defaultSEO = {
  title: "Raquel Sousa - Frontend Developer | React & TypeScript Expert",
  description:
    "Frontend Developer with expertise in React/TypeScript building scalable SaaS platforms and enterprise applications. Expert in modern development tooling including Vite, Next.js build optimization, and CI/CD workflows. Available for roles in Belfast, Northern Ireland.",
  keywords: [
    "React Developer",
    "TypeScript",
    "Frontend Engineer",
    "Developer",
    "Belfast",
    "Northern Ireland",
    "SaaS",
    "Next.js",
  ],
  image: "/favicon.ico",
  url: "https://raquelsousa.dev",
  type: "profile" as const,
};

export function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  structuredData,
  canonical,
}: SEOProps) {
  const seoTitle = title || defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoKeywords = [...defaultSEO.keywords, ...keywords].join(", ");
  const seoImage = image || defaultSEO.image;
  const seoUrl = url || defaultSEO.url;
  const canonicalUrl = canonical || seoUrl;

  const defaultStructuredData: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raquel Sousa",
    jobTitle: "Frontend Developer",
    description:
      "Frontend Developer with expertise in React/TypeScript building scalable SaaS platforms and enterprise applications. Expert in modern development tooling including Vite, Next.js build optimization, and CI/CD workflows.",
    url: "https://raquelsousa.dev",
    image: "/favicon.ico",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lurgan",
      addressRegion: "Northern Ireland",
      addressCountry: "GB",
    },
    alumniOf: {
      "@type": "Organization",
      name: "CapEduc, Portugal",
    },
    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Frontend Development",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Vite",
      "Azure DevOps",
      "Component Libraries",
      "SaaS Development",
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "Workstream",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Remote",
          addressRegion: "Northern Ireland",
        },
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Developer",
      occupationLocation: {
        "@type": "City",
        name: "Belfast",
      },
      skills:
        "React, TypeScript, Next.js, Tailwind CSS, Node.js, Go, Vite, Azure DevOps",
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = seoTitle;

    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement;

      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    updateMetaTag("description", seoDescription);
    updateMetaTag("keywords", seoKeywords);
    updateMetaTag("author", "Raquel Sousa");

    updateMetaTag("og:type", type, true);
    updateMetaTag("og:title", seoTitle, true);
    updateMetaTag("og:description", seoDescription, true);
    updateMetaTag("og:url", seoUrl, true);
    updateMetaTag("og:image", seoImage, true);
    updateMetaTag("og:site_name", "Raquel Sousa Portfolio", true);
    updateMetaTag("og:locale", "en_GB", true);

    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", seoTitle);
    updateMetaTag("twitter:description", seoDescription);
    updateMetaTag("twitter:image", seoImage);
    updateMetaTag("twitter:creator", "@raquelsousa");

    updateMetaTag("robots", "index, follow, max-image-preview:large");
    updateMetaTag(
      "googlebot",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    updateMetaTag(
      "bingbot",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    updateMetaTag("format-detection", "telephone=no");
    updateMetaTag("theme-color", "#000000");
    updateMetaTag("color-scheme", "dark light");

    updateMetaTag("application-name", "Raquel Sousa Portfolio");
    updateMetaTag("apple-mobile-web-app-title", "Raquel Sousa");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");
    updateMetaTag("msapplication-TileColor", "#000000");
    updateMetaTag("msapplication-config", "/browserconfig.xml");

    updateMetaTag("geo.region", "GB-NIR");
    updateMetaTag("geo.placename", "Belfast, Northern Ireland");
    updateMetaTag("geo.position", "54.597285;-5.930120");
    updateMetaTag("ICBM", "54.597285, -5.930120");

    updateLinkTag("canonical", canonicalUrl);

    let structuredDataScript = document.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement;

    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredDataScript);
    }

    structuredDataScript.textContent = JSON.stringify(
      finalStructuredData,
      null,
      2
    );

    const preloadFont = document.querySelector(
      'link[href*="fonts.googleapis.com"]'
    );
    if (preloadFont) {
      preloadFont.setAttribute("rel", "preload");
      preloadFont.setAttribute("as", "style");
    }

    return () => {};
  }, [
    seoTitle,
    seoDescription,
    seoKeywords,
    seoImage,
    seoUrl,
    canonicalUrl,
    type,
    finalStructuredData,
  ]);

  return null;
}
