import { Project } from "@/types";

export interface StructuredData {
  "@context": string;
  "@type"?: string;
  "@graph"?: StructuredData[];
  [key: string]: unknown;
}

export function generateOrganizationSchema(
  name: string,
  address: { locality: string; region: string; country: string }
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: name,
    address: {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
    },
  };
}

export function generateProjectSchema(project: Project): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    creator: {
      "@type": "Person",
      name: "Raquel Sousa",
    },
    programmingLanguage: project.technologies,
    codeRepository: project.github,
    url: project.demo,
    keywords: project.technologies.join(", "),
    applicationSuite: "Frontend Development",
    operatingSystem: "Web Browser",
    softwareRequirements: "Modern Web Browser",
  };
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
}

export function generateWebsiteSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Website",
    name: "Raquel Sousa Portfolio",
    description:
      "Frontend Developer portfolio showcasing React and TypeScript expertise in enterprise SaaS development",
    url: "https://raquelsousa.dev",
    author: {
      "@type": "Person",
      name: "Raquel Sousa",
    },
    inLanguage: "en-GB",
    copyrightYear: new Date().getFullYear(),
    genre: "Portfolio",
    keywords:
      "React Developer, Next.js, TypeScript, Frontend Engineer, Belfast, Northern Ireland, SaaS Development, Vite",
    mainEntity: {
      "@type": "Person",
      name: "Raquel Sousa",
    },
  };
}

export function generatePersonSchemaWithExperience(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raquel Sousa",
    jobTitle: "Frontend Developer",
    description:
      "Frontend Developer with expertise in React/TypeScript building scalable SaaS platforms and enterprise applications. Expert in modern development tooling including Vite, Next.js build optimization, and CI/CD workflows. Self-motivated developer who maintains personal technical roadmaps using Jira, creates POC guidelines, and proactively delivers innovative solutions.",
    url: "https://raquelsousa.dev",
    image: "/placeholder.svg",
    email: "mailto:raquel.sousa.wt@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lurgan",
      addressRegion: "Northern Ireland",
      addressCountry: "United Kingdom",
    },
    nationality: {
      "@type": "Country",
      name: "Portugal",
    },
    knowsAbout: [
      {
        "@type": "Thing",
        name: "React",
        description: "JavaScript library for building user interfaces",
      },
      {
        "@type": "Thing",
        name: "TypeScript",
        description: "Typed superset of JavaScript",
      },
      {
        "@type": "Thing",
        name: "Next.js",
        description: "React framework for production",
      },
      {
        "@type": "Thing",
        name: "Frontend Development",
        description: "Client-side web development",
      },
      {
        "@type": "Thing",
        name: "SaaS Development",
        description: "Software as a Service development",
      },
      {
        "@type": "Thing",
        name: "Vite",
        description: "Modern frontend build tool",
      },
      {
        "@type": "Thing",
        name: "Azure DevOps",
        description: "CI/CD and development workflows",
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Developer",
      occupationLocation: {
        "@type": "City",
        name: "Belfast",
        containedInPlace: {
          "@type": "Country",
          name: "United Kingdom",
        },
      },
      skills:
        "React, TypeScript, Next.js, Node.js, Vite, Azure DevOps, Figma, Component Libraries, Form Validation, Enterprise Architecture",
      experienceRequirements: "Expert in modern frontend development",
    },
    worksFor: [
      {
        "@type": "Organization",
        name: "Workstream",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Belfast",
          addressCountry: "GB",
        },
      },
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "CapEduc",
        address: {
          "@type": "PostalAddress",
          addressCountry: "Portugal",
        },
      },
      {
        "@type": "Organization",
        name: "Escola Secundaria da Amora",
        address: {
          "@type": "PostalAddress",
          addressCountry: "Portugal",
        },
      },
    ],
    sameAs: [
      "https://github.com/RaquelSousa",
      "https://www.linkedin.com/in/raquel-sousa-frontend-developer/",
    ],
  };
}

export function generatePortfolioCollectionSchema(
  projects: Project[]
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Raquel Sousa's Portfolio Projects",
    description:
      "Collection of frontend development projects showcasing React and TypeScript expertise",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: generateProjectSchema(project),
    })),
  };
}
