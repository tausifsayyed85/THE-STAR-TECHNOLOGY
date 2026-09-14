export interface Project {
  id: string;
  projectTitle: string;
  clientName?: string;
  category: string;
  badge: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  features: string[];
  technology: string[];
  challenge: string;
  approach: string;
  solution: string;
  outcome: string;
  url?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  iconType?: string;
  deliverables?: string[];
  idealFor?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  initials: string;
  clientName: string;
  company: string;
  projectTag: string;
  year: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  contentSnippet: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
}

export interface WhyUsItem {
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface TechnologyItem {
  name: string;
  category: 'Frontend' | 'Backend & Tools' | 'Architecture';
  description: string;
  level: string;
}

export interface ContactFormData {
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
