import { Card, CardContent } from "@kel/ui-components";
import { Badge } from "@kel/ui-components";
import { useState } from "react";

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: "⚛️",
    color: "from-blue-500 to-cyan-500",
    skills: [
      {
        name: "React",
        level: 95,
        description: "Component architecture & hooks",
      },
      { name: "TypeScript", level: 90, description: "Type-safe development" },
      { name: "Next.js", level: 88, description: "Full-stack React framework" },
      { name: "Tailwind CSS", level: 90, description: "Utility-first styling" },
    ],
  },
  {
    title: "State & Testing",
    icon: "🧪",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Redux/Zustand", level: 85, description: "State management" },
      { name: "Jest", level: 75, description: "Unit & integration testing" },
      { name: "Cypress", level: 80, description: "E2E testing" },
      { name: "Storybook", level: 90, description: "Component documentation" },
    ],
  },
  {
    title: "Backend & Cloud",
    icon: "☁️",
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "Node.js", level: 60, description: "Server-side JavaScript" },
      { name: "Azure", level: 60, description: "Cloud infrastructure" },
      { name: "Go", level: 50, description: "Server-side Golang" },
      { name: "API Design", level: 70, description: "RESTful services" },
    ],
  },
  {
    title: "Leadership",
    icon: "🚀",
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Mentoring", level: 90, description: "Team development" },
      { name: "Architecture", level: 70, description: "System design" },
      { name: "Innovation", level: 95, description: "Self-managed POCs" },
      {
        name: "Collaboration",
        level: 100,
        description: "Cross-functional teams",
      },
    ],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Badge className="mb-6 bg-violet-500/20 text-violet-400 border-violet-500/30">
              Technical Skills
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Crafted through{" "}
              <span className="text-gradient">years of experience</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Every skill represents real projects, solved problems, and
              delivered value.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base touch-target ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span className="mr-1 sm:mr-2">{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">
                  {category.title.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          <Card className="glass border-white/20 shadow-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <div
                className={`bg-gradient-to-r ${skillCategories[activeCategory].color} bg-opacity-10 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8`}
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-2">
                  {skillCategories[activeCategory].icon}{" "}
                  {skillCategories[activeCategory].title}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {skillCategories[activeCategory].skills.map(
                  (skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group p-4 sm:p-6 rounded-xl glass border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base sm:text-lg font-bold">
                          {skill.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className="bg-white/5 text-xs sm:text-sm"
                        >
                          {skill.level}%
                        </Badge>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                        {skill.description}
                      </p>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${skillIndex * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { number: "6+", label: "Years Experience", icon: "📅" },
              { number: "3", label: "SaaS Platforms Built", icon: "🏗️" },
              { number: "40%", label: "Dev Time Reduction", icon: "⚡" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="glass border-white/20 text-center group hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-2xl sm:text-4xl mb-4">{stat.icon}</div>
                  <div className="text-2xl sm:text-4xl font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
