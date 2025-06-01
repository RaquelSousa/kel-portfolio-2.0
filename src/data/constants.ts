import { TechStackItem, Project, OtherProject } from "@/types";

export const TECH_STACK: TechStackItem[] = [
  {
    name: "React",
    color: "from-cyan-400 to-blue-500",
    icon: "⚛️",
    category: "frontend",
  },
  {
    name: "TypeScript",
    color: "from-blue-500 to-indigo-600",
    icon: "📘",
    category: "frontend",
  },
  {
    name: "Next.js",
    color: "from-gray-400 to-gray-600",
    icon: "▲",
    category: "frontend",
  },
  {
    name: "Go",
    color: "from-green-400 to-emerald-600",
    icon: "🟢",
    category: "backend",
  },
  {
    name: "Azure",
    color: "from-blue-400 to-cyan-500",
    icon: "☁️",
    category: "cloud",
  },
  {
    name: "PostgreSQL",
    color: "from-green-500 to-emerald-600",
    icon: "🍃",
    category: "database",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Component Library",
    description:
      "Comprehensive component library designed to reduce development time across multiple SaaS applications with TypeScript, Storybook, and Tailwind CSS.",
    problem: "Reduce development time across multiple SaaS applications",
    solution:
      "Comprehensive component library with TypeScript, Storybook, and Tailwind CSS",
    impact: "40% reduction in frontend development time",
    features: [
      "Theme system",
      "Responsive design",
      "Accessibility compliance",
      "Automated testing",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Storybook",
      "Jest",
      "Accessibility",
    ],
    github: "https://github.com/RaquelSousa",
    demo: "https://storybook.example.com",
    status: "in-progress",
    progress: 40,
  },
  {
    title: "React 19 Migration",
    description:
      "POC migration showcasing React 19's concurrent features and performance optimization capabilities in a production-ready environment.",
    problem: "Demonstrate concurrent features and performance optimization",
    solution: "POC migration showcasing new React 19 features",
    impact: "Performance improvements and modern React patterns",
    features: [
      "Suspense boundaries",
      "Concurrent rendering",
      "Automatic batching",
      "Server components",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "Concurrent Features",
      "Performance",
    ],
    github: "https://github.com/RaquelSousa",
    demo: "https://react19-demo.example.com",
    status: "in-progress",
    progress: 30,
  },
  {
    title: "Form Management",
    description:
      "Robust form system with advanced schema validation designed for complex enterprise data validation and collection workflows.",
    problem: "Complex enterprise data validation and collection",
    solution: "Robust form system with schema validation",
    impact: "Streamlined data collection for enterprise clients",
    features: [
      "Multi-step forms",
      "Real-time validation",
      "Error handling",
      "Data persistence",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Formik",
      "Yup",
      "React Hook Form",
      "Zod",
    ],
    github: "https://github.com/RaquelSousa",
    demo: "https://forms.example.com",
    status: "in-progress",
    progress: 60,
  },
  {
    title: "Customer Portal",
    description:
      "Complete customer management portal with authentication and billing integration for service-based businesses in the RV and apartment industries.",
    problem: "Customer management for service-based businesses",
    solution: "Complete portal with authentication and billing",
    impact: "Improved customer experience and operational efficiency",
    features: [
      "User authentication",
      "Payment processing",
      "Service management",
      "Real-time updates",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "API Integration",
      "Stripe",
    ],
    github: "https://github.com/RaquelSousa",
    demo: "https://portal.example.com",
    status: "in-progress",
    progress: 80,
  },
];

export const OTHER_PROJECTS: OtherProject[] = [
  {
    title: "Task Management Dashboard",
    description:
      "Interactive task board with drag-and-drop functionality and real-time updates",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "https://task-dashboard-demo.vercel.app",
    github: "https://github.com/RaquelSousa/task-dashboard",
    type: "app",
    status: "in-progress",
    progress: 30,
  },
  {
    title: "Weather App",
    description:
      "Simple weather application with location-based forecasts to learn Angular",
    technologies: ["Angular", "OpenWeather API", "SCSS", "Bootstrap"],
    demo: "https://kel-weather-app.vercel.app/",
    github: "https://github.com/RaquelSousa/weather-app",
    type: "app",
    status: "completed",
  },
  // {
  //   title: "Landing Page Collection",
  //   description:
  //     "Collection of responsive landing pages for various business types",
  //   technologies: ["HTML5", "CSS3", "JavaScript", "SASS"],
  //   demo: "https://landing-pages-demo.vercel.app",
  //   github: "https://github.com/RaquelSousa/landing-pages",
  //   type: "website",
  //   status: "in-progress",
  //   progress: 40,
  // },
  // {
  //   title: "E-commerce Product Page",
  //   description:
  //     "Interactive product showcase with cart functionality and payment integration",
  //   technologies: ["React", "Stripe API", "Zustand", "Tailwind CSS"],
  //   demo: "https://ecommerce-demo.vercel.app",
  //   github: "https://github.com/RaquelSousa/ecommerce-demo",
  //   type: "website",
  //   status: "in-progress",
  //   progress: 50,
  // },
  {
    title: "Portfolio Website v1",
    description:
      "Previous portfolio iteration showcasing earlier projects and experiments",
    technologies: ["React", "SCSS", "TypeScript", "Tailwind CSS, Material UI"],
    demo: "https://raquelsousa-portfolio.vercel.app",
    github: "https://github.com/RaquelSousa/kel-portfolio",
    type: "website",
    status: "completed",
  },
  {
    title: "World of Warcraft Guild Website v1",
    description:
      "Website created for a World of Warcraft guild. Created in the early days of my coding journey.",
    technologies: ["React", "SCSS", "TypeScript", "Material UI"],
    demo: "https://hiraeth2.vercel.app/",
    github: "https://github.com/RaquelSousa/hiraeth2",
    type: "website",
    status: "completed",
  },
  {
    title: "World of Warcraft Guild Website v2",
    description:
      "Website created for a World of Warcraft guild, after years of Next.js and TypeScript experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "RestAPI",
    ],
    demo: "https://hiraeth2.vercel.app/",
    github: "https://github.com/lenatomas/hiraeth-guild",
    type: "website",
    status: "in-progress",
    progress: 95,
  },
  {
    title: "K&K Aquatics",
    description:
      "Website for an aquascape, aquarium and pond services company.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "RestAPI",
    ],
    demo: "https://www.kandkaquatics.com/",
    github: "https://github.com/RaquelSousa/kkaquatics",
    type: "website",
    status: "completed",
  },
];
