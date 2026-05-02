export type NoticeCategory = 'Admission' | 'Exam' | 'Event' | 'Holiday' | 'General';

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  content: string;
  is_pinned: boolean;
  pdf_url?: string;
  image_url?: string;
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
  seats: number;
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
  image_url?: string;
  email: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface GalleryVideo {
  id: string;
  video_url: string;
  title: string;
  created_at?: string;
}
 
export interface News {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  image_url?: string;
  category: string;
  pdf_url?: string;
}
