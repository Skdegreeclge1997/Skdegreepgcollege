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
import Image from 'next/image';

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
      .filter(d => d !== 'Administration' && d !== 'All Departments')
      .sort()
    )
  ];

  const filteredFaculty = selectedDept === 'All Departments'
    ? faculty
    : faculty.filter(m => {
      if (selectedDept === 'Administration') {
        return m.designation?.toLowerCase().includes('principal') ||
          m.designation?.toLowerCase().includes('founder of the society') ||
          //  m.designation?.toLowerCase().includes('hod') ||
          m.designation?.toLowerCase().includes('head of department') ||
          m.department === 'Administration';
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
                      <Image 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=003366&color=fff`} 
                        alt={m.name}
                        width={40}
                        height={40}
                        className="object-cover"
                        unoptimized
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="pr-4 border-l border-white/20 pl-4">
                  <p className="text-sm font-bold text-white">{faculty.length}+ Educators</p>
                  <p className="text-xs text-slate-300">Across {departments.length - 1} Departments</p>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>

        {/* Gradient fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </section>

      {/* Search & Filter Bar */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or department..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-academic-gold transition-all text-sm font-medium"
              onChange={(e) => {
                const term = e.target.value.toLowerCase();
                if (term === '') {
                  fetchFaculty();
                } else {
                  setFaculty(faculty.filter(f =>
                    f.name.toLowerCase().includes(term) ||
                    f.department.toLowerCase().includes(term)
                  ));
                }
              }}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {departments.slice(0, 6).map((dept, i) => (
              <button
                key={i}
                onClick={() => setSelectedDept(dept)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${selectedDept === dept
                  ? 'bg-academic-navy text-white shadow-lg'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="mt-12 pb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-academic-navy" size={40} />
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
                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredFaculty.map((member) => (
                      <StaggerItem key={member.id}>
                        <FacultyCard member={member} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </motion.div>
              </AnimatePresence>

              {filteredFaculty.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No faculty members found matching your search.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
