'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseAccordion from '@/components/CourseAccordion';
import MotionSection, { StaggerContainer, StaggerItem, TextReveal } from '@/components/motion/MotionSection';
import ParticleCanvas from '@/components/ParticleCanvas';
import coursesData from '@/lib/data/courses.json';
import { Course } from '@/lib/types';
import { BookOpen, Award, FlaskConical, Users, Briefcase, Lightbulb } from 'lucide-react';

const courses = coursesData as Course[];

const highlights = [
  { icon: Award, text: 'UGC Recognized Programs' },
  { icon: Users, text: 'Experienced Faculty Members' },
  { icon: FlaskConical, text: 'State-of-the-Art Laboratories' },
  { icon: Briefcase, text: 'Strong Industry Placement Cell' },
  { icon: Lightbulb, text: 'Holistic Development Focus' },
];

export default function AcademicsContent() {
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
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section with Particle Background */}
      <section className="relative bg-academic-navy text-white pt-32 pb-28 overflow-hidden">
        <ParticleCanvas className="opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <MotionSection delay={0.1}>
              <div className="flex items-center gap-2 text-academic-gold font-bold uppercase tracking-widest mb-4">
                <BookOpen size={20} />
                <span>Programs & Courses</span>
              </div>
            </MotionSection>

            <TextReveal delay={0.2}>
              <h1 className="text-white mb-6">
                Academic <span className="text-academic-gold text-glow">Excellence</span>
              </h1>
            </TextReveal>

            <MotionSection delay={0.4}>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                We offer a diverse range of programs across Science, Commerce, and Arts, 
                fostering a culture of innovation, critical thinking, and professional growth.
              </p>
            </MotionSection>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[
                { num: '12+', label: 'Departments' },
                { num: '30+', label: 'Programs' },
                { num: '85+', label: 'Faculty' },
              ].map((stat, i) => (
                <MotionSection key={stat.label} delay={0.5 + i * 0.1}>
                  <div className="text-center">
                    <motion.p
                      className="text-3xl font-black text-academic-gold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.15, type: 'spring', stiffness: 200 }}
                    >
                      {stat.num}
                    </motion.p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                </MotionSection>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </section>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-4">
            <MotionSection delay={0.2} direction="left">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                  <h2 className="text-2xl font-bold text-academic-navy mb-6">Why S.K. Degree College?</h2>
                  <StaggerContainer className="space-y-4">
                    {highlights.map((item, i) => (
                      <StaggerItem key={i}>
                        <motion.div
                          className="flex items-start gap-3 text-slate-600 p-3 rounded-lg hover:bg-academic-gold/5 transition-colors"
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div className="mt-0.5 w-8 h-8 rounded-lg bg-academic-navy/5 flex items-center justify-center flex-shrink-0">
                            <item.icon size={16} className="text-academic-gold" />
                          </div>
                          <span className="font-medium">{item.text}</span>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
                
                <motion.div
                  className="bg-academic-gold p-8 rounded-2xl shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold text-academic-navy mb-2">Need Help Choosing?</h3>
                  <p className="text-academic-navy/70 text-sm mb-6">
                    Talk to our career counselors to find the program that best fits your goals.
                  </p>
                  <motion.button
                    className="w-full py-3 bg-academic-navy text-white font-bold rounded-lg transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Request Counseling
                  </motion.button>
                  
                  {/* Decorative circles */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20 blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-academic-navy/10 blur-lg" />
                </motion.div>
              </div>
            </MotionSection>
          </div>

          {/* Main Content - Accordions */}
          <div className="lg:col-span-8">
            <MotionSection delay={0.1}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-academic-navy mb-2">Our Departments</h2>
                <p className="text-slate-500">Select a department to view available programs.</p>
              </div>
            </MotionSection>
            
            <StaggerContainer className="space-y-4">
              {departments.map((dept) => (
                <StaggerItem key={dept}>
                  <CourseAccordion department={dept} courses={groupedCourses[dept]} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
