export type ProjectCategory = 'all' | 'web' | 'mobile' | 'other';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  role?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  proficiency: number; // percentage
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  iconName: string;
}
