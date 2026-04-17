'use client';

import React, { useState } from 'react';
import { ChevronDown, GraduationCap, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/lib/types';

interface CourseAccordionProps {
  department: string;
  courses: Course[];
}

export default function CourseAccordion({ department, courses }: CourseAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-academic-navy/5 flex items-center justify-center text-academic-navy" aria-hidden="true">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-academic-navy">{department} Department</h3>
            <p className="text-sm text-slate-500">{courses.length} Programs Offered</p>
          </div>
        </div>
        <ChevronDown 
          size={24} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          aria-hidden="true" 
        />
      </button>

      <div 
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/academics/${course.slug}`}
                  className="group p-4 rounded-lg border border-slate-100 hover:border-academic-gold/50 hover:bg-academic-gold/5 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-academic-gold uppercase tracking-tighter">
                        {course.degree}
                      </span>
                      <h4 className="font-bold text-academic-navy group-hover:text-academic-gold transition-colors">
                        {course.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock size={12} aria-hidden="true" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <ArrowUpRight 
                    size={18} 
                    className="text-slate-300 group-hover:text-academic-gold transition-colors duration-300" 
                    aria-hidden="true" 
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
