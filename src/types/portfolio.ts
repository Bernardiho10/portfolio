export interface JourneyStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  vehicle: 'bicycle' | 'car' | 'tesla' | 'plane';
  year: string;
  icon: string;
  iconDirection?: 'left' | 'right';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  badgeUrl: string;
  credentialUrl: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  type: 'work' | 'freelance' | 'hackathon' | 'opensource';
  technologies?: string[];
  award?: string;
  website?: string;
  responsibilities?: string[];
  keyAchievements?: string[];
  companyDescription?: string;
  logoUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  pricing?: {
    basic: string;
    pro?: string;
    enterprise?: string;
  };
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  twitter: string;
  linkedin: string;
  github: string;
  calendly?: string;
  profileImage?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'ai' | 'other';
  proficiency: number;
  icon: string;
}