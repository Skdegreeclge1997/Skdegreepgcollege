import React from 'react';
import CourseAccordion from '@/components/CourseAccordion';
import coursesData from '@/lib/data/courses.json';
import { Course } from '@/lib/types';

const courses = coursesData as Course[];

export const metadata = {
  title: 'Academics & Courses | S.K. Degree College',
  description: 'Explore our wide range of undergraduate and postgraduate programs designed for the modern world.',
};

export default function AcademicsPage() {
  // Group courses by department
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.department]) {
      acc[course.department] = [];
    }
    acc[course.department].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const departments = Object.keys(groupedCourses);

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      {/* Hero Section */}
      <div className="bg-academic-navy text-white py-20 mb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Academic <span className="text-academic-gold">Excellence</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We offer a diverse range of programs across Science, Commerce, and Arts, 
              fostering a culture of innovation, critical thinking, and professional growth.
            </p>
          </div>
        </div>
        
        {/* Decorative Graphic */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-academic-gold/5 -skew-x-12 transform translate-x-1/2" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-academic-navy mb-4">Why S.K. Degree College?</h2>
                <ul className="space-y-4">
                  {[
                    'UGC Recognized Programs',
                    'Experienced Faculty Members',
                    'State-of-the-Art Laboratories',
                    'Strong Industry Placement Cell',
                    'Holistic Development Focus'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-academic-gold flex-shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-academic-gold p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-academic-navy mb-2">Need Help Choosing?</h3>
                <p className="text-academic-navy/70 text-sm mb-6">
                  Talk to our career counselors to find the program that best fits your goals.
                </p>
                <button className="w-full py-3 bg-academic-navy text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                  Request Counseling
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Accordions */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-academic-navy mb-2">Our Departments</h2>
              <p className="text-slate-500">Select a department to view available programs.</p>
            </div>
            
            <div className="space-y-4">
              {departments.map((dept) => (
                <CourseAccordion key={dept} department={dept} courses={groupedCourses[dept]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
