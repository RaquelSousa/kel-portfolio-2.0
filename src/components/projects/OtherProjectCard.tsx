import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@kel/ui-components";
import { Badge } from "@kel/ui-components";
import { Button } from "@kel/ui-components";
import { Github, ExternalLink, Globe, Beaker, Smartphone } from "lucide-react";
import { OtherProject } from "@/types";
import { ComingSoonOverlay } from "./ComingSoonOverlay";

interface OtherProjectCardProps {
  project: OtherProject;
  index: number;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "website":
      return Globe;
    case "app":
      return Smartphone;
    case "experiment":
      return Beaker;
    default:
      return Globe;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "website":
      return "text-blue-500";
    case "app":
      return "text-green-500";
    case "experiment":
      return "text-purple-500";
    default:
      return "text-blue-500";
  }
};

export function OtherProjectCard({ project, index }: OtherProjectCardProps) {
  const TypeIcon = getTypeIcon(project.type);
  const typeColor = getTypeColor(project.type);
  const isInProgress = project.status === "in-progress";

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="h-full border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group bg-background/50 backdrop-blur-sm relative overflow-hidden">
        {isInProgress && project.progress && (
          <ComingSoonOverlay
            progress={project.progress}
            title={project.title}
          />
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
              <TypeIcon className={`h-4 w-4 ${typeColor}`} />
              <Badge
                variant="outline"
                className="text-xs capitalize px-2 py-0.5"
              >
                {project.type}
              </Badge>
            </div>
          </div>

          <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          <div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-muted/50 hover:bg-muted transition-colors"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-muted/50"
                >
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild={!isInProgress}
              disabled={isInProgress}
              className={`flex-1 h-8 text-xs ${
                isInProgress ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isInProgress ? (
                <div className="flex items-center justify-center gap-1.5">
                  <ExternalLink className="h-3 w-3" />
                  <span>Demo</span>
                </div>
              ) : (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Demo</span>
                </a>
              )}
            </Button>

            {project.github && (
              <Button
                variant="outline"
                size="sm"
                asChild={!isInProgress}
                disabled={isInProgress}
                className={`flex-1 h-8 text-xs ${
                  isInProgress ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isInProgress ? (
                  <div className="flex items-center justify-center gap-1.5">
                    <Github className="h-3 w-3" />
                    <span>Code</span>
                  </div>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Github className="h-3 w-3" />
                    <span>Code</span>
                  </a>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
