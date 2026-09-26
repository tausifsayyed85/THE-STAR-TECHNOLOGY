export interface Project {
  id: string;
  projectTitle: string;
  slug: string;
  clientName?: string;
  category: string;
  industry: string;
  year: string;
  badge: string;
  description: string;
  summary: string;
  thumbnail: string;
  heroImage?: string;
  gallery: string[];
  features: string[];
  technology: string[];
  challenge: string;
  approach: string;
  solution: string;
  outcome: string;
  services: string[];
  url?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  capabilities: string[];
  technologies: string[];
  deliverables?: string[];
  idealFor?: string;
  iconType?: string;
  faqs: ServiceFAQ[];
}

export interface Testimonial {
  id: string;
  quote: string;
  initials: string;
  clientName: string;
  company: string;
  role?: string;
  projectTag: string;
  year: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  contentSnippet: string;
  fullBody?: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
}

export interface ValuePrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface WhyUsItem {
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface TechnologyItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'AI & Automation' | 'Design & DevOps';
  description: string;
  level: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Projects' | 'Pricing' | 'Process' | 'Support' | 'Technology';
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'Open' | 'Future';
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
}
