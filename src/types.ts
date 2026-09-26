export type EnquiryType =
  | 'Egg Order'
  | 'Bulk Supply'
  | 'Poultry Products'
  | 'Farm Supply'
  | 'General Enquiry'
  | 'Partnership'
  | 'Other';

export interface ContactFormData {
  fullName: string;
  telephone: string;
  email: string;
  subject: string;
  enquiryType: EnquiryType;
  message: string;
  consent: boolean;
  honeypot?: string; // spam protection hidden field
}

export interface ContactFormErrors {
  fullName?: string;
  telephone?: string;
  email?: string;
  subject?: string;
  enquiryType?: string;
  message?: string;
  consent?: string;
  general?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Poultry Birds' | 'Egg Production' | 'Packaged Eggs' | 'Farm Facilities' | 'Staff & Operations';
  image: string;
  alt: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'Board of Directors' | 'Management Team';
  summary: string;
  focusArea: string;
  initials: string;
  image?: string;
}
