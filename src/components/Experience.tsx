import { Card, CardContent } from "kel-ui-components";
import { Badge } from "kel-ui-components";

const experiences = [
  {
    title: "Co-CEO",
    company: "Hiraeth Infinite",
    period: "October 2024 - Present",
    location: "Remote",
    type: "Current Role",
    description:
      "Co-founded technology consultancy specializing in modern web applications and digital transformation solutions",
    achievements: [
      "Lead technical architecture and development for 3+ client projects using React, TypeScript, Next.js, and cloud technologies",
      "Manage full project lifecycle from client requirements gathering to deployment",
      "Architect scalable solutions leveraging microservices, serverless functions, and modern CI/CD pipelines",
      "Drive business development, securing contracts through technical demonstrations",
      "Implement agile methodologies for distributed team collaboration",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Next.js 14",
      "Tailwind CSS",
      "Azure",
      "Vercel",
      "Node.js",
      "PostgreSQL",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Workstream",
    period: "July 2024 - Present",
    location: "Hybrid, Belfast, Northern Ireland",
    type: "Current Role",
    description:
      "Frontend development of enterprise SaaS platform with focus on self-managed development of multiple proof-of-concept features leading to production implementations.",
    achievements: [
      "Frontend development of enterprise SaaS platform",
      "Self-managed development of multiple proof-of-concept features, leading to production implementations",
      "Translated complex Figma designs into pixel-perfect React components with full responsiveness",
      "Architected and developed comprehensive component library using Next.js, TypeScript, and Tailwind CSS, reducing development time",
      "Led React 19 migration initiative, implementing new concurrent features and optimizing application performance",
      "Implemented robust form validation using Formik and Yup schemas for enterprise data collection",
      "Mentored 3 junior developers on React best practices and TypeScript implementation",
      "Participated in full software development lifecycle including code reviews and Azure DevOps workflows",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Formik",
      "Yup",
      "Zustand",
      "Go",
      "PostgreSQL",
      "Azure",
      "Azure DevOps",
    ],
  },
  {
    title: "Software Engineer",
    company: "Safety NetAccess",
    period: "April 2024 - February 2025",
    location: "Hybrid, Belfast, Northern Ireland",
    type: "Full-time",
    description:
      "Led full-stack development of customer portal for RV park internet services using vanilla HTML, JavaScript, and Node.js (Express).",
    achievements: [
      "Architected and spearheaded apartment management platform development, managing user authentication and database management, and billing integration",
      "Collaborated with backend teams to design MongoDB database architecture for Sage ERP integration and Salesforce connectivity",
      "Utilized Vite for optimized development workflows and production builds",
      "Managed cross-functional stakeholder communications and technical requirement gathering",
      "Delivered end-to-end solutions from concept to deployment across multiple client projects",
    ],
    technologies: [
      "HTML",
      "JavaScript",
      "TypeScript",
      "CSS",
      "Node.js",
      "Express",
      "Next.js",
      "MongoDB",
      "Vite",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Edison365",
    period: "August 2021 - April 2024",
    location: "Remote",
    type: "Full-time",
    description:
      "Built enterprise SaaS application from ground up using React, TypeScript, Redux, and microservices architecture.",
    achievements: [
      "Developed scalable component library with Storybook and Material UI",
      "Collaborated closely with UI/UX designers, converting Figma prototypes into production-ready components",
      "Participated in full software development lifecycle including code reviews and Azure DevOps workflows",
      "Managed application state using Redux for optimal performance",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "Storybook",
      "Material UI",
      "Figma",
      "Azure DevOps",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey of growth, leadership, and technical excellence in
              building scalable frontend solutions for enterprise clients.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-purple-500 hidden md:block" />

            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up relative"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute left-4 sm:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                  <Card className="md:ml-16 lg:ml-20 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-base sm:text-lg text-primary font-semibold">
                            {exp.company}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {exp.location}
                          </p>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2 mt-2 md:mt-0">
                          <Badge
                            variant={
                              exp.type === "Current Role"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {exp.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-medium">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {achievement}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs hover:bg-primary/10 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
