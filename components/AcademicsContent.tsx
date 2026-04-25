'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MotionSection, { StaggerContainer, StaggerItem, TextReveal } from '@/components/motion/MotionSection';
import ParticleCanvas from '@/components/ParticleCanvas';
import coursesData from '@/lib/data/courses.json';
import { Course } from '@/lib/types';
import { BookOpen, Award, FlaskConical, Users, Briefcase, Lightbulb, Shield, Heart, GraduationCap, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const courses = coursesData as Course[];

export default function AcademicsContent() {
  // Group courses by department
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.department]) {
      acc[course.department] = [];
    }
    acc[course.department].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  // Define custom sort order for departments
  const departmentOrder = ['Science', 'Commerce', 'Arts'];
  
  const departments = Object.keys(groupedCourses).sort((a, b) => {
    const indexA = departmentOrder.indexOf(a);
    const indexB = departmentOrder.indexOf(b);
    
    // If both departments are in our custom order list
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only 'a' is in the list, it comes first
    if (indexA !== -1) return -1;
    // If only 'b' is in the list, it comes first
    if (indexB !== -1) return 1;
    // Otherwise alphabetical
    return a.localeCompare(b);
  });

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative bg-academic-navy text-white pt-32 pb-28 overflow-hidden">
        <ParticleCanvas className="opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <MotionSection delay={0.1}>
                <div className="flex items-center gap-2 text-academic-gold font-bold uppercase tracking-widest mb-4">
                  <BookOpen size={20} />
                  <span>Your Academic Journey Starts Here</span>
                </div>
              </MotionSection>

              <TextReveal delay={0.2}>
                <h1 className="text-white mb-6">
                  Education that <span className="text-academic-gold text-glow">Transforms</span>
                </h1>
              </TextReveal>

              <MotionSection delay={0.4}>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  We don&apos;t just hand out degrees. At S.K. Degree College, we focus on building 
                  the critical thinking skills and professional discipline you need to excel in your chosen career path.
                </p>
              </MotionSection>

              <div className="flex flex-wrap gap-8 mt-10">
                {[
                  { num: '12+', label: 'Departments' },
                  { num: '30+', label: 'Programs' },
                  { num: '25+', label: 'Years of Legacy' },
                ].map((stat, i) => (
                  <MotionSection key={stat.label} delay={0.5 + i * 0.1}>
                    <div className="text-left border-l-2 border-academic-gold/30 pl-4">
                      <p className="text-3xl font-black text-academic-gold">{stat.num}</p>
                      <p className="text-xs text-slate-200 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  </MotionSection>
                ))}
              </div>
            </div>

            {/* Why SK College - Premium Card */}
            <div className="lg:col-span-5">
              <MotionSection delay={0.6} direction="right">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                   <div className="relative z-10">
                      <h2 className="text-xl font-bold text-academic-gold mb-4">Why Choose S.K. College?</h2>
                      <ul className="space-y-4">
                         {[
                           { icon: Award, text: "UGC Recognized Excellence", desc: "Our programs meet the highest national standards." },
                           { icon: Users, text: "Mentors, Not Just Teachers", desc: "Faculty with decades of industry & academic wisdom." },
                           { icon: Briefcase, text: "Career-Ready Placement", desc: "Dedicated cell to help you land your dream job." }
                         ].map((item, i) => (
                           <li key={i} className="flex gap-4">
                              <div className="w-10 h-10 rounded-xl bg-academic-gold/10 flex items-center justify-center shrink-0">
                                 <item.icon className="text-academic-gold" size={20} />
                              </div>
                              <div>
                                 <p className="font-bold text-sm text-white">{item.text}</p>
                                 <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                              </div>
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="absolute -top-12 -right-12 w-48 h-48 bg-academic-gold/5 rounded-full blur-3xl group-hover:bg-academic-gold/10 transition-all duration-700" />
                </div>
              </MotionSection>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </section>

      {/* Program Directory */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
         <div className="mb-12">
            <h2 className="text-3xl font-black text-academic-navy mb-2">Our Academic Departments</h2>
            <p className="text-slate-600 font-medium">Explore our wide range of professional undergraduate programs.</p>
         </div>

         <div className="space-y-20">
            {departments.map((dept, deptIdx) => (
               <MotionSection key={dept} delay={deptIdx * 0.1}>
                  <div className="border-b border-slate-200 pb-4 mb-8 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-academic-navy text-white flex items-center justify-center font-black text-xl">
                           {dept[0]}
                        </div>
                        <h3 className="text-2xl font-black text-academic-navy">{dept} Department</h3>
                     </div>
                     <span className="text-xs font-black uppercase tracking-widest text-slate-600">{groupedCourses[dept].length} Programs</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {groupedCourses[dept].map((course, courseIdx) => (
                        <motion.div
                           key={course.id}
                           whileHover={{ y: -8 }}
                           className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                           <Link href={`/academics/${course.slug}`}>
                              <div className="text-academic-gold-dark font-black text-[10px] uppercase tracking-tighter mb-2">{course.degree}</div>
                              <h4 className="text-lg font-black text-academic-navy group-hover:text-academic-gold transition-colors mb-4 leading-tight">
                                 {course.title}
                              </h4>
                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                 <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                                       <Clock size={14} className="text-academic-gold" />
                                       {course.duration}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                                       <Users size={12} className="text-academic-navy/30" />
                                       {course.seats} Seats
                                    </div>
                                 </div>
                                 <ArrowRight size={18} className="text-slate-200 group-hover:text-academic-gold group-hover:translate-x-2 transition-all" />
                              </div>
                           </Link>
                        </motion.div>
                     ))}
                  </div>
               </MotionSection>
            ))}
         </div>
      </section>

      {/* NCC & NSS Section */}
      <section id="ncc" className="bg-white py-24 mt-20 border-y border-slate-100 relative overflow-hidden">
         <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <MotionSection direction="left">
                  <div className="flex items-center gap-2 text-academic-gold-dark font-bold uppercase tracking-widest mb-4">
                     <Shield size={20} />
                     <span>Beyond Academics</span>
                  </div>
                  <h2 className="text-4xl font-black text-academic-navy mb-6">Discipline & Service: <br /><span className="text-academic-gold">NCC & NSS Units</span></h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                     At S.K. Degree College, we believe that education is incomplete without discipline and social responsibility. 
                     Our active NCC and NSS wings provide students with the opportunity to serve the nation and build a strong character.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {[
                        { title: 'Naval NCC (ANO)', icon: Shield, desc: 'Maritime training & discipline at our specialized Naval wing.' },
                        { title: 'Army NCC (ANO)', icon: Shield, desc: 'Building leadership through rigorous Army-style training.' },
                        { title: 'NSS Units', icon: Heart, desc: 'Engaging with the community through social service projects.' },
                        { title: 'Physical Education', icon: GraduationCap, desc: 'Competitive sports and athletic excellence for all.' }
                     ].map((item, i) => (
                         <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <h3 className="font-bold text-academic-navy mb-1 flex items-center gap-2">
                               <item.icon size={16} className="text-academic-gold-dark" />
                               {item.title}
                            </h3>
                            <p className="text-[11px] text-slate-600 leading-tight">{item.desc}</p>
                         </div>
                     ))}
                  </div>
               </MotionSection>

               <MotionSection direction="right" delay={0.2}>
                  <div className="relative">
                     <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                        <Image 
                           src="/images/ncc-nss.jpg" 
                           alt="S.K. Degree College NCC and NSS Units Training" 
                           fill
                           className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-academic-navy/80 to-transparent" />
                        <div className="absolute bottom-8 left-8">
                           <p className="text-white font-black text-2xl uppercase tracking-widest">Unity & Discipline</p>
                           <p className="text-academic-gold font-bold text-sm">Empowering the youth of Vizianagaram</p>
                        </div>
                     </div>
                     {/* Decorative Elements */}
                     <div className="absolute -top-8 -right-8 w-32 h-32 bg-academic-gold/10 rounded-full blur-3xl" />
                     <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-academic-navy/10 rounded-full blur-3xl" />
                  </div>
               </MotionSection>
            </div>
         </div>
      </section>
    </main>
  );
}
