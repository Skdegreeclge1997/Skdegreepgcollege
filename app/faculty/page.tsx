"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FacultyCard from '@/components/FacultyCard';
import MotionSection, { StaggerContainer, StaggerItem, TextReveal } from '@/components/motion/MotionSection';
import ParticleCanvas from '@/components/ParticleCanvas';
import initialFacultyData from '@/lib/data/faculty.json';
import { Faculty } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { Users, Filter, Sparkles, Loader2 } from 'lucide-react';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All Departments');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data && data.length > 0) {
      setFaculty(data);
    } else {
      setFaculty(initialFacultyData as Faculty[]);
    }
    setLoading(false);
  };

  const departments = [
    'All Departments',
    'Administration',
    ...new Set(faculty
      .map(m => m.department)
      .filter(d => d !== 'Administration')
      .sort()
    )
  ];

  const filteredFaculty = selectedDept === 'All Departments'
    ? faculty
    : faculty.filter(m => {
      if (selectedDept === 'Administration') {
        const isAdminRole =
          m.designation?.toLowerCase().includes('principal') ||
          m.designation?.toLowerCase().includes('founder of the society') ||
          m.designation?.toLowerCase().includes('head of department') ||
          // m.designation?.toLowerCase().includes('hod') ||
          m.department === 'Administration';
        return isAdminRole;
      }
      return m.department === selectedDept;
    });

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section with 3D Particle Background */}
      <section className="relative bg-academic-navy pt-32 pb-24 overflow-hidden">
        <ParticleCanvas className="opacity-60" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <MotionSection delay={0.1}>
                <div className="flex items-center gap-2 text-academic-gold font-bold uppercase tracking-widest mb-4">
                  <Users size={20} aria-hidden="true" />
                  <span>Our Educators</span>
                </div>
              </MotionSection>

              <TextReveal delay={0.2}>
                <h1 className="text-white mb-6">
                  Shaping Futures with <br />
                  <span className="text-academic-gold text-glow">Expertise & Dedication</span>
                </h1>
              </TextReveal>

              <MotionSection delay={0.4}>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Our faculty members are not just teachers, but mentors and researchers
                  committed to academic excellence and the holistic development of every student.
                </p>
              </MotionSection>
            </div>

            <MotionSection delay={0.5} direction="right">
              <div className="hidden lg:flex items-center gap-4 p-3 glass rounded-xl">
                <div className="flex -space-x-3 overflow-hidden px-2">
                  {faculty.slice(0, 5).map((m, i) => (
                    <motion.div
                      key={i}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white/30 bg-slate-200 overflow-hidden"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 200 }}
                    >
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=003366&color=fff`} alt="" />
                    </motion.div>
                  ))}
                </div>
                <div className="pr-4 border-l border-white/20 pl-4">
                  <p className="text-sm font-bold text-white">85+ Educators</p>
                  <p className="text-xs text-slate-300">Across 12 Departments</p>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>

        {/* Gradient fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </section>

      {/* Directory Layout */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3">
            <MotionSection delay={0.2} direction="left">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-academic-navy mb-6">
                    <Filter size={18} className="text-academic-gold" aria-hidden="true" />
                    <h2>Departments</h2>
                  </div>

                  <nav className="space-y-1.5">
                    {departments.map((dept, i) => {
                      const count = dept === 'All Departments'
                        ? faculty.length
                        : faculty.filter(m => {
                          if (dept === 'Administration') {
                            return m.designation?.toLowerCase().includes('principal') ||
                              m.designation?.toLowerCase().includes('founder') ||
                              m.designation?.toLowerCase().includes('hod') ||
                              m.department === 'Administration';
                          }
                          return m.department === dept;
                        }).length;

                      if (count === 0 && dept !== 'All Departments') return null;

                      return (
                        <motion.button
                          key={i}
                          onClick={() => setSelectedDept(dept)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedDept === dept
                            ? 'bg-academic-navy text-white shadow-xl shadow-academic-navy/20'
                            : 'text-slate-500 hover:text-academic-navy hover:bg-slate-50 border border-transparent hover:border-slate-100'
                            }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex-1 text-left">{dept}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedDept === dept ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                            {count}
                          </span>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>

                <div className="bg-gradient-to-br from-academic-navy to-slate-900 p-8 rounded-2xl text-white relative overflow-hidden group shadow-xl">
                  <div className="relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Sparkles size={32} className="text-academic-gold mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Want to Join Us?</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      We are always looking for passionate educators to join our growing family.
                    </p>
                    <motion.button
                      className="text-academic-gold font-bold text-sm flex items-center gap-2"
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      View Career Openings →
                    </motion.button>
                  </div>

                  {/* Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-academic-gold/10 rounded-full blur-xl -ml-12 -mb-12" aria-hidden="true" />
                </div>
              </div>
            </MotionSection>
          </aside>

          {/* Faculty Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="text-academic-navy" size={40} />
                </motion.div>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Loading Directory...</p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDept}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredFaculty.map((member) => (
                        <StaggerItem key={member.id}>
                          <FacultyCard member={member} />
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </motion.div>
                </AnimatePresence>

                {filteredFaculty.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200"
                  >
                    <p className="text-slate-400 font-medium">No faculty members found in this department.</p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
