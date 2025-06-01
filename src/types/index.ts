export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WithAnimation {
  animationDelay?: string;
}

export interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  features: string[];
  technologies: string[];
  github: string;
  demo: string;
  image?: string;
  status?: "completed" | "in-progress" | "planning";
  progress?: number;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "full-time" | "contract" | "freelance";
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  icon?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  yearsOfExperience?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

export interface TechStackItem {
  name: string;
  color: string;
  icon: string;
  category?: "frontend" | "backend" | "database" | "tools" | "cloud";
}

export interface OtherProject {
  title: string;
  description: string;
  technologies: string[];
  demo: string;
  github?: string;
  type: "website" | "app" | "experiment";
  status?: "completed" | "in-progress" | "planning";
  progress?: number;
}
