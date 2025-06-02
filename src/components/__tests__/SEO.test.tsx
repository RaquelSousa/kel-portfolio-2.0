import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SEO } from "../SEO";

describe("SEO", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set default title when no title prop provided", () => {
    render(<SEO />);

    expect(document.title).toBe(
      "Raquel Sousa - Frontend Developer | React & TypeScript Expert"
    );
  });

  it("should set custom title when provided", () => {
    render(<SEO title="Custom Page Title" />);

    expect(document.title).toBe("Custom Page Title");
  });

  it("should create description meta tag", () => {
    render(<SEO description="Custom description for testing" />);

    const descriptionMeta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    expect(descriptionMeta).toBeTruthy();
    expect(descriptionMeta.content).toBe("Custom description for testing");
  });

  it("should create keywords meta tag with defaults", () => {
    render(<SEO />);

    const keywordsMeta = document.querySelector(
      'meta[name="keywords"]'
    ) as HTMLMetaElement;
    expect(keywordsMeta).toBeTruthy();
    expect(keywordsMeta.content).toContain("React Developer");
    expect(keywordsMeta.content).toContain("TypeScript");
  });

  it("should merge custom keywords with defaults", () => {
    render(<SEO keywords={["Vue.js", "Angular"]} />);

    const keywordsMeta = document.querySelector(
      'meta[name="keywords"]'
    ) as HTMLMetaElement;
    expect(keywordsMeta.content).toContain("React Developer");
    expect(keywordsMeta.content).toContain("Vue.js");
    expect(keywordsMeta.content).toContain("Angular");
  });

  it("should create Open Graph meta tags", () => {
    render(
      <SEO
        title="Test Title"
        description="Test Description"
        type="article"
        url="https://example.com"
        image="/test-image.jpg"
      />
    );

    const ogType = document.querySelector(
      'meta[property="og:type"]'
    ) as HTMLMetaElement;
    const ogTitle = document.querySelector(
      'meta[property="og:title"]'
    ) as HTMLMetaElement;
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    ) as HTMLMetaElement;
    const ogUrl = document.querySelector(
      'meta[property="og:url"]'
    ) as HTMLMetaElement;
    const ogImage = document.querySelector(
      'meta[property="og:image"]'
    ) as HTMLMetaElement;

    expect(ogType.content).toBe("article");
    expect(ogTitle.content).toBe("Test Title");
    expect(ogDescription.content).toBe("Test Description");
    expect(ogUrl.content).toBe("https://example.com");
    expect(ogImage.content).toBe("/test-image.jpg");
  });

  it("should create Twitter Card meta tags", () => {
    render(
      <SEO
        title="Test Title"
        description="Test Description"
        image="/test-image.jpg"
      />
    );

    const twitterCard = document.querySelector(
      'meta[name="twitter:card"]'
    ) as HTMLMetaElement;
    const twitterTitle = document.querySelector(
      'meta[name="twitter:title"]'
    ) as HTMLMetaElement;
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    ) as HTMLMetaElement;
    const twitterImage = document.querySelector(
      'meta[name="twitter:image"]'
    ) as HTMLMetaElement;
    const twitterCreator = document.querySelector(
      'meta[name="twitter:creator"]'
    ) as HTMLMetaElement;

    expect(twitterCard.content).toBe("summary_large_image");
    expect(twitterTitle.content).toBe("Test Title");
    expect(twitterDescription.content).toBe("Test Description");
    expect(twitterImage.content).toBe("/test-image.jpg");
    expect(twitterCreator.content).toBe("@raquelsousa");
  });

  it("should create robots meta tags", () => {
    render(<SEO />);

    const robots = document.querySelector(
      'meta[name="robots"]'
    ) as HTMLMetaElement;
    const googlebot = document.querySelector(
      'meta[name="googlebot"]'
    ) as HTMLMetaElement;
    const bingbot = document.querySelector(
      'meta[name="bingbot"]'
    ) as HTMLMetaElement;

    expect(robots.content).toBe("index, follow, max-image-preview:large");
    expect(googlebot.content).toBe(
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    expect(bingbot.content).toBe(
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
  });

  it("should create canonical link", () => {
    render(<SEO canonical="https://example.com/canonical" />);

    const canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(canonical).toBeTruthy();
    expect(canonical.href).toBe("https://example.com/canonical");
  });

  it("should use url as canonical when no canonical provided", () => {
    render(<SEO url="https://example.com/page" />);

    const canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(canonical.href).toBe("https://example.com/page");
  });

  it("should create technical meta tags", () => {
    render(<SEO />);

    const formatDetection = document.querySelector(
      'meta[name="format-detection"]'
    ) as HTMLMetaElement;
    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement;
    const colorScheme = document.querySelector(
      'meta[name="color-scheme"]'
    ) as HTMLMetaElement;

    expect(formatDetection.content).toBe("telephone=no");
    expect(themeColor.content).toBe("#000000");
    expect(colorScheme.content).toBe("dark light");
  });

  it("should create geographic meta tags", () => {
    render(<SEO />);

    const geoRegion = document.querySelector(
      'meta[name="geo.region"]'
    ) as HTMLMetaElement;
    const geoPlacename = document.querySelector(
      'meta[name="geo.placename"]'
    ) as HTMLMetaElement;
    const geoPosition = document.querySelector(
      'meta[name="geo.position"]'
    ) as HTMLMetaElement;
    const icbm = document.querySelector('meta[name="ICBM"]') as HTMLMetaElement;

    expect(geoRegion.content).toBe("GB-NIR");
    expect(geoPlacename.content).toBe("Belfast, Northern Ireland");
    expect(geoPosition.content).toBe("54.597285;-5.930120");
    expect(icbm.content).toBe("54.597285, -5.930120");
  });

  it("should update existing meta tags instead of creating duplicates", () => {
    render(<SEO description="First description" />);

    let descriptionMetas = document.querySelectorAll(
      'meta[name="description"]'
    );
    expect(descriptionMetas).toHaveLength(1);
    expect((descriptionMetas[0] as HTMLMetaElement).content).toBe(
      "First description"
    );

    render(<SEO description="Updated description" />);

    descriptionMetas = document.querySelectorAll('meta[name="description"]');
    expect(descriptionMetas).toHaveLength(1);
    expect((descriptionMetas[0] as HTMLMetaElement).content).toBe(
      "Updated description"
    );
  });

  it("should handle custom structured data", () => {
    const customStructuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Test Article",
    };

    render(<SEO structuredData={customStructuredData} />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
  });

  it("should use default type when not specified", () => {
    render(<SEO />);

    const ogType = document.querySelector(
      'meta[property="og:type"]'
    ) as HTMLMetaElement;
    expect(ogType.content).toBe("website");
  });
});
