'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div
      className="mb-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm"
      whileHover={{ scale: isOpen ? 1 : 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-academic-navy/5 flex items-center justify-center text-academic-navy"
            aria-hidden="true"
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <GraduationCap size={20} />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-academic-navy">{department} Department</h3>
            <p className="text-sm text-slate-600">{courses.length} Programs Offered</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} className="text-slate-400" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/academics/${course.slug}`}
                      className="group p-4 rounded-lg border border-slate-100 hover:border-academic-gold/50 hover:bg-academic-gold/5 transition-all duration-300 flex items-center justify-between block"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-academic-gold-dark uppercase tracking-tighter">
                            {course.degree}
                          </span>
                          <h4 className="font-bold text-academic-navy group-hover:text-academic-gold transition-colors">
                            {course.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Clock size={12} aria-hidden="true" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ x: 4, y: -4 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ArrowUpRight 
                          size={18} 
                          className="text-slate-300 group-hover:text-academic-gold transition-colors duration-300" 
                          aria-hidden="true" 
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
