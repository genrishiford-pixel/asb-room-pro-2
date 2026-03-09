// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  category: string;
}

// Portfolio types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'architecture' | 'repair';
  images: string[];
  year: number;
  area?: string;
  location?: string;
  client?: string;
  completionDate?: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  project?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  service?: string;
}

export interface ContactInquiry extends ContactFormData {
  id: string;
  date: string;
  read: boolean;
}

// Admin types
export interface AdminState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Stats types
export interface CompanyStats {
  projectsCompleted: number;
  yearsExperience: number;
  teamMembers: number;
  happyClients: number;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}
