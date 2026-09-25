export interface MetricItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  department: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  metrics: MetricItem[];
  technologies: string[];
  clientSector: string;
}

export interface SkillItem {
  name: string;
  category: 'servicenow' | 'governance' | 'consulting' | 'agile' | 'pricing' | 'cloud' | 'enterprise' | 'ai' | 'devops' | 'strategy';
  proficiency: number; // 0 - 100
  years: number;
  highlight: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  clientIndustry: string;
  category: 'servicenow' | 'governance' | 'pricing' | 'transformation' | 'cloud' | 'fintech' | 'healthcare';
  heroImage: string;
  headline: string;
  challenge: string;
  solution: string;
  outcomes: MetricItem[];
  architecturePoints: string[];
  techStack: string[];
  deloitteRole: string;
  deliverableLink?: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  badge: string;
  address: string;
  lat: number;
  lng: number;
  query: string;
  phone: string;
  email: string;
  timeZone: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  years: string;
}

export interface ConsultantProfile {
  name: string;
  designation: string;
  practice: string;
  firm: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  avatarUrl?: string;
  certifications: string[];
  statHighlights: MetricItem[];
  keyAchievements?: string[];
  education?: EducationItem[];
  languages?: string[];
}
