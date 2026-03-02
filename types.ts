
export type Language = 'ar' | 'en';

export interface NavLink {
  id: string;
  label: {
    ar: string;
    en: string;
  };
  path: string;
}

export interface Service {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: string;
}

export interface Project {
  id: string;
  title: { ar: string; en: string };
  category: string;
  image: string;
  description: { ar: string; en: string };
  technologies: string[];
}

export interface Testimonial {
  id: number;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  content: { ar: string; en: string };
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface StoreProduct {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  price: number;
  features: { ar: string[]; en: string[] };
  category: 'hosting' | 'templates' | 'support';
  popular?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}
