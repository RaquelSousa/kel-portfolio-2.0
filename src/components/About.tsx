import { Card, CardContent } from "@kel/ui-components";
import { Badge } from "@kel/ui-components";
import { Zap, Target, Cpu, Users, Code, Database } from "lucide-react";

const achievements = [
  {
    icon: Target,
    title: "DEPLOYED 3 PRODUCTION SAAS SYSTEMS",
    description:
      "Enterprise-grade applications serving global clients with React/TypeScript architecture",
    metric: "99.9% uptime",
  },
  {
    icon: Zap,
    title: "LED REACT 19 MIGRATION PROTOCOL",
    description:
      "Successfully migrated production platform leveraging concurrent rendering features",
    metric: "40% performance boost",
  },
  {
    icon: Users,
    title: "MENTORED 3 JUNIOR DEVELOPERS",
    description:
      "Accelerated team growth through modern frontend practices and code review protocols",
    metric: "3x faster onboarding",
  },
  {
    icon: Cpu,
    title: "AUTONOMOUS INNOVATION PIPELINE",
    description:
      "Self-managed POC development using structured Jira roadmaps and experimentation",
    metric: "12+ features deployed",
  },
];

const dataPoints = [
  { label: "YEARS_ACTIVE", value: "6+", color: "text-cyan-400" },
  { label: "PROJECTS_DEPLOYED", value: "3", color: "text-purple-400" },
  { label: "PERFORMANCE_GAIN", value: "40%", color: "text-green-400" },
  { label: "TEAM_MEMBERS_MENTORED", value: "3", color: "text-orange-400" },
];

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 hologram rounded-none opacity-20" />
        <div className="absolute bottom-20 left-20 w-96 h-96 hologram rounded-none opacity-10" />

        <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
        <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Badge className="cyber-card mb-6 bg-cyan-400/10 text-cyan-400 border-cyan-400/30 font-mono">
              &gt; SYSTEM_PROFILE.exe
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 font-mono">
              PASSIONATE ABOUT{" "}
              <span className="cyber-text">EXCEPTIONAL EXPERIENCES</span>
            </h2>
            <div className="cyber-card rounded-none p-4 sm:p-6 max-w-4xl mx-auto">
              <p className="text-sm sm:text-lg lg:text-xl text-cyan-100 font-mono leading-relaxed">
                <span className="text-cyan-400">[MISSION_STATEMENT]</span>
                <br />
                I DON'T JUST WRITE CODE—I ARCHITECT DIGITAL EXPERIENCES THAT
                USERS LOVE
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>AND BUSINESSES DEPEND ON.
                TECHNICAL EXCELLENCE + INNOVATIVE THINKING = SUCCESS.
              </p>
            </div>
          </div>

          <div className="mb-12 sm:mb-16">
            <Card className="cyber-card rounded-none shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold cyber-text mb-4 sm:mb-6 font-mono">
                      &gt; EXECUTION_LOG
                    </h3>
                    <div className="space-y-3 sm:space-y-4 text-cyan-100 leading-relaxed font-mono text-xs sm:text-sm">
                      <div>
                        <span className="text-cyan-400">[INIT] </span>
                        6+ YEARS AGO: CURIOSITY ABOUT WEB ARCHITECTURE INITIATED
                      </div>
                      <div>
                        <span className="text-purple-400">[DEPLOY] </span>
                        TODAY: ARCHITECTING COMPLEX SAAS PLATFORMS FOR
                        ENTERPRISE USERS
                      </div>
                      <div>
                        <span className="text-green-400">[UNIQUE] </span>
                        SELF-MANAGED INNOVATION PIPELINE + TECHNICAL ROADMAP
                        MAINTENANCE
                      </div>
                      <div>
                        <span className="text-orange-400">[RESULT] </span>
                        POC DEVELOPMENT → PRODUCTION FEATURES + TEAM
                        ACCELERATION
                      </div>
                      <div>
                        <span className="text-pink-400">[IMPACT] </span>
                        REACT 19 CONCURRENT FEATURES + 40% DEV TIME REDUCTION
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-cyan-400/5 to-purple-600/5">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-none border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold font-mono cyber-text relative overflow-hidden">
                      RS
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 animate-pulse" />
                      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-scan" />
                    </div>

                    <div className="mt-6 sm:mt-8 space-y-2">
                      {dataPoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex justify-between font-mono text-xs"
                        >
                          <span className="text-cyan-400">
                            &gt; {point.label}:
                          </span>
                          <span className={point.color}>{point.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="cyber-card rounded-none shadow-lg hover:neon-glow transition-all duration-300 group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 sm:p-8 relative">
                  <div className="flex items-start gap-4">
                    <div className="p-2 sm:p-3 rounded-none cyber-card bg-gradient-to-br from-cyan-400/20 to-purple-600/20 group-hover:from-cyan-400/30 group-hover:to-purple-600/30 transition-all duration-300 flex-shrink-0">
                      <achievement.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-cyan-400 transition-colors font-mono tracking-wide">
                        {achievement.title}
                      </h4>
                      <p className="text-cyan-100 text-xs sm:text-sm leading-relaxed mb-3 font-mono">
                        {achievement.description}
                      </p>
                      <Badge className="bg-gradient-to-r from-cyan-400/20 to-purple-600/20 text-cyan-400 border-cyan-400/30 font-mono text-xs">
                        {achievement.metric}
                      </Badge>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="cyber-card rounded-none shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-cyan-400/10 via-purple-600/10 to-pink-500/10 p-12 text-center relative">
                <Badge className="mb-6 bg-cyan-400/20 text-cyan-400 border-cyan-400/30 font-mono">
                  &gt; INNOVATION_PROTOCOL.sys
                </Badge>
                <h3 className="text-3xl font-bold mb-6 font-mono">
                  SELF-MANAGED TECHNICAL EXCELLENCE
                </h3>
                <p className="text-lg text-cyan-100 max-w-3xl mx-auto leading-relaxed font-mono">
                  <span className="text-cyan-400">[PROTOCOL] </span>I DON'T WAIT
                  FOR REQUIREMENTS—I ANTICIPATE THEM.
                  <br />
                  <span className="text-purple-400">[PIPELINE] </span>STRUCTURED
                  INNOVATION CONSISTENTLY DELIVERS CRITICAL SOLUTIONS.
                </p>

                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                <div
                  className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              <div className="p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      phase: "01",
                      title: "PERSONAL JIRA BOARD",
                      desc: "STRUCTURED PIPELINE FOR TECHNICAL EXPERIMENTS + ROADMAP PLANNING",
                      icon: Database,
                    },
                    {
                      phase: "02",
                      title: "PROACTIVE POCS",
                      desc: "SELF-INITIATED PROTOTYPES → PRODUCTION FEATURES",
                      icon: Code,
                    },
                    {
                      phase: "03",
                      title: "STRATEGIC IMPACT",
                      desc: "MEASURABLE BUSINESS OUTCOMES THROUGH TECHNICAL INNOVATION",
                      icon: Target,
                    },
                  ].map((step, index) => (
                    <div key={index} className="text-center group">
                      <div className="cyber-card w-20 h-20 rounded-none flex items-center justify-center mx-auto mb-4 group-hover:neon-glow transition-all duration-300 relative overflow-hidden">
                        <span className="text-2xl font-bold text-cyan-400 font-mono">
                          {step.phase}
                        </span>
                        <step.icon className="absolute inset-0 m-auto w-8 h-8 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <h4 className="font-bold mb-2 font-mono text-cyan-400 tracking-wide">
                        {step.title}
                      </h4>
                      <p className="text-sm text-cyan-100 font-mono leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
