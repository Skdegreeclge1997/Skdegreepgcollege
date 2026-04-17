export type NoticeCategory = 'Admission' | 'Exam' | 'Event' | 'Holiday' | 'General';

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  content: string;
  isPinned: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  department: string;
  degree: 'UG' | 'PG' | 'Diploma';
  duration: string;
  description: string;
  eligibility: string;
  careerProspects: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  specialization: string;
  image: string;
  email: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'Campus' | 'Labs' | 'NCC' | 'Placements' | 'All';
}
