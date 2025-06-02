import {
  Download,
  Github,
  Linkedin,
  Mail,
  Terminal,
  FileText,
} from "lucide-react";
import { Button } from "kel-ui-components";
import { ChevronDown } from "lucide-react";
import { useClickTracking, useFeatureTracking } from "@/hooks/useAnalytics";
import TrackingWrapper from "@/components/analytics/TrackingWrapper";

interface CyberActionButtonsProps {
  onViewProjects: () => void;
  onContact: () => void;
}

export function CyberActionButtons({
  onViewProjects,
  onContact,
}: CyberActionButtonsProps) {
  const trackProjectsClick = useClickTracking(
    "view_projects_button",
    "hero_section"
  );
  const trackContactClick = useClickTracking("contact_button", "hero_section");
  const trackCVClick = useClickTracking("cv_button", "hero_section");
  const trackFeature = useFeatureTracking("hero_actions");

  const handleViewProjectsClick = () => {
    trackProjectsClick();
    trackFeature("button_clicked", {
      button: "view_projects",
      section: "hero",
      timestamp: Date.now(),
    });
    onViewProjects();
  };

  const handleContactClick = () => {
    trackContactClick();
    trackFeature("button_clicked", {
      button: "contact",
      section: "hero",
      timestamp: Date.now(),
    });
    onContact();
  };

  const handleCVClick = () => {
    trackCVClick();
    trackFeature("button_clicked", {
      button: "view_cv",
      section: "hero",
      timestamp: Date.now(),
    });
    window.open(
      "https://docs.google.com/document/d/1t82n3E9je6DkGVWS-vznq8o7x5gZwT3-CvJkcL0GRt8/edit?tab=t.0",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <TrackingWrapper
      componentName="HeroActionButtons"
      trackScrollView={true}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
    >
      <div className="flex flex-wrap gap-4 justify-center mb-16">
        <Button
          size="lg"
          onClick={handleViewProjectsClick}
          className="cyber-btn group bg-cyan-600 hover:bg-cyan-700 text-black font-bold py-3 px-8 rounded-none border-2 border-cyan-400 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25"
        >
          <span className="relative z-10 flex items-center gap-2">
            VIEW PROJECTS
            <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>

        <Button
          onClick={handleCVClick}
          className="cyber-btn group bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-8 rounded-none border-2 border-green-400 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25"
          size="lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            VIEW CV
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>

        <Button
          onClick={handleContactClick}
          variant="outline"
          className="cyber-btn-outline group border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black font-bold py-3 px-8 rounded-none relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/25"
          size="lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            GET IN TOUCH
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </div>

      <div className="flex gap-4 justify-center mb-16">
        <Button className="cyber-button w-12 h-12 rounded-none group" asChild>
          <a
            href="https://github.com/RaquelSousa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 group-hover:animate-pulse" />
          </a>
        </Button>
        <Button className="cyber-button w-12 h-12 rounded-none group" asChild>
          <a
            href="https://www.linkedin.com/in/raquel-sousa-frontend-developer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5 group-hover:animate-pulse" />
          </a>
        </Button>
      </div>
    </TrackingWrapper>
  );
}
