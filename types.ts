
export interface Project {
  title: string;
  problem: string;
  points: string[];
  tech: string[];
  githubUrl: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}
