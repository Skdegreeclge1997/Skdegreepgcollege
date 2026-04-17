import React from 'react';
import { notFound } from 'next/navigation';
import { Clock, BookOpen, Briefcase, ChevronLeft, GraduationCap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import coursesData from '@/lib/data/courses.json';
import { Course } from '@/lib/types';

const courses = coursesData as Course[];

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CoursePageProps) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) return { title: 'Course Not Found' };

  return {
    title: `${course.title} | S.K. Degree College`,
    description: course.description,
  };
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs / Back Link */}
        <Link 
          href="/academics" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-academic-navy font-medium mb-12 transition-colors"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          <span>Back to All Programs</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-academic-gold/20 text-academic-navy text-xs font-bold uppercase tracking-wider rounded-full">
                {course.degree} Program
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600 font-medium">{course.department} Department</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-academic-navy mb-8 leading-tight">
              {course.title}
            </h1>

            <div className="prose prose-lg max-w-none text-slate-600 mb-12">
              <p className="text-xl text-slate-700 leading-relaxed mb-8">
                {course.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 text-academic-navy mb-4 font-bold text-xl">
                    <BookOpen className="text-academic-gold" aria-hidden="true" />
                    <h2>Eligibility Criteria</h2>
                  </div>
                  <p>{course.eligibility}</p>
                </div>
                
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 text-academic-navy mb-4 font-bold text-xl">
                    <Briefcase className="text-academic-gold" aria-hidden="true" />
                    <h2>Career Prospects</h2>
                  </div>
                  <p>{course.careerProspects}</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-academic-navy mb-6">Program Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                {[
                  'Industry-aligned curriculum',
                  'Regular guest lectures',
                  'Practical workshop sessions',
                  'Digital resource access',
                  'Seminars & conferences',
                  'Placement assistance'
                ].map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" aria-hidden="true" />
                    <span className="font-medium text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Fast Facts */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-academic-navy text-white p-10 rounded-3xl relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-8 relative z-10">Fast Facts</h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Clock size={20} className="text-academic-gold" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Duration</p>
                      <p className="text-lg font-bold">{course.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <GraduationCap size={20} className="text-academic-gold" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Degree Awarded</p>
                      <p className="text-lg font-bold">{course.title.split(' ').slice(0, 2).join(' ')}</p>
                    </div>
                  </div>
                </div>
                
                <hr className="my-8 border-white/10 relative z-10" />
                
                <div className="relative z-10">
                  <p className="text-sm text-slate-300 mb-6">Ready to take the next step in your career?</p>
                  <button className="w-full py-4 bg-academic-gold text-academic-navy font-bold rounded-xl hover:bg-white transition-colors duration-300">
                    Apply Now for 2026
                  </button>
                </div>

                {/* Decorative Background */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-academic-gold/10 rounded-full blur-3xl" aria-hidden="true" />
              </div>
              
              <div className="p-8 border border-slate-200 rounded-3xl">
                <h4 className="font-bold text-academic-navy mb-4">Contact Admissions</h4>
                <p className="text-slate-500 text-sm mb-4">Have questions about this program? Our counselors are here to help.</p>
                <p className="font-bold text-academic-navy mb-1">+91 (080) 1234-5678</p>
                <p className="text-slate-600 text-sm">admissions@skdegreecollege.edu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
