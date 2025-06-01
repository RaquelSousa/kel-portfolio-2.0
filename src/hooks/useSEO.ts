import { useEffect, useCallback } from "react";
import { StructuredData } from "@/utils/structuredData";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  canonical?: string;
  structuredData?: StructuredData;
  noIndex?: boolean;
  noFollow?: boolean;
}

export function useSEO(config: SEOConfig) {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    canonical,
    structuredData,
    noIndex = false,
    noFollow = false,
  } = config;

  const updateMetaTag = (name: string, content: string, property = false) => {
    if (typeof document === "undefined") return;

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
    if (typeof document === "undefined") return;

    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  };

  const updateStructuredData = (data: StructuredData) => {
    if (typeof document === "undefined") return;

    let script = document.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data, null, 2);
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (title) {
      document.title = title;
    }

    if (description) {
      updateMetaTag("description", description);
      updateMetaTag("og:description", description, true);
      updateMetaTag("twitter:description", description);
    }

    if (keywords.length > 0) {
      updateMetaTag("keywords", keywords.join(", "));
    }

    if (image) {
      updateMetaTag("og:image", image, true);
      updateMetaTag("twitter:image", image);
    }

    if (url) {
      updateMetaTag("og:url", url, true);
    }

    if (title) {
      updateMetaTag("og:title", title, true);
      updateMetaTag("twitter:title", title);
    }

    if (canonical) {
      updateLinkTag("canonical", canonical);
    }

    const robotsContent = [];
    if (noIndex) robotsContent.push("noindex");
    else robotsContent.push("index");

    if (noFollow) robotsContent.push("nofollow");
    else robotsContent.push("follow");

    robotsContent.push("max-image-preview:large");
    updateMetaTag("robots", robotsContent.join(", "));

    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [
    title,
    description,
    keywords,
    image,
    url,
    canonical,
    structuredData,
    noIndex,
    noFollow,
  ]);

  return {
    updateTitle: (newTitle: string) => {
      if (typeof document !== "undefined") {
        document.title = newTitle;
        updateMetaTag("og:title", newTitle, true);
        updateMetaTag("twitter:title", newTitle);
      }
    },
    updateDescription: (newDescription: string) => {
      updateMetaTag("description", newDescription);
      updateMetaTag("og:description", newDescription, true);
      updateMetaTag("twitter:description", newDescription);
    },
    addStructuredData: (data: StructuredData) => {
      updateStructuredData(data);
    },
  };
}
