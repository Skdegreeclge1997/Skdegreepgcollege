"use client";

import React, { useState, useEffect } from 'react';
import FacultyCard from '@/components/FacultyCard';
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

  const departments = ['All Departments', ...new Set((faculty.length > 0 ? faculty : (initialFacultyData as Faculty[])).map(m => m.department))];

  const filteredFaculty = selectedDept === 'All Departments' 
    ? faculty 
    : faculty.filter(m => m.department === selectedDept);
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-academic-gold font-bold uppercase tracking-widest mb-4">
              <Users size={20} aria-hidden="true" />
              <span>Our Educators</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-academic-navy mb-6 leading-tight">
              Shaping Futures with <br />
              <span className="text-academic-gold">Expertise & Dedication</span>
            </h1>
            <p className="text-lg text-slate-600">
              Our faculty members are not just teachers, but mentors and researchers 
              committed to academic excellence and the holistic development of every student.
            </p>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 p-2 bg-white rounded-xl shadow-sm border border-slate-100">
             <div className="flex -space-x-3 overflow-hidden px-2">
                {faculty.slice(0, 5).map((m, i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=003366&color=fff`} alt="" />
                  </div>
                ))}
             </div>
             <div className="pr-4 border-l border-slate-100 pl-4">
                <p className="text-sm font-bold text-academic-navy">85+ Educators</p>
                <p className="text-xs text-slate-500">Across 12 Departments</p>
             </div>
          </div>
        </div>

        {/* Directory Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Filters Sidebar (Mobile: Horizontal Scroll, Desktop: Sidebar) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 font-bold text-academic-navy mb-6">
                  <Filter size={18} className="text-academic-gold" aria-hidden="true" />
                  <h2>Departments</h2>
                </div>
                
                <nav className="space-y-2">
                  {departments.map((dept, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedDept(dept)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedDept === dept ? 'bg-academic-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {dept}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-gradient-to-br from-academic-navy to-slate-900 p-8 rounded-2xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <Sparkles size={32} className="text-academic-gold mb-4 group-hover:rotate-12 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">Want to Join Us?</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    We are always looking for passionate educators to join our growing family.
                  </p>
                  <button className="text-academic-gold font-bold text-sm flex items-center gap-2 hover:translate-x-2 transition-transform">
                    View Career Openings →
                  </button>
                </div>
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" aria-hidden="true" />
              </div>
            </div>
          </aside>

          {/* Faculty Grid */}
          <div className="lg:col-span-9">
             {loading ? (
               <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="animate-spin text-academic-navy" size={40} />
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Loading Directory...</p>
               </div>
             ) : (
               <>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredFaculty.map((member) => (
                      <FacultyCard key={member.id} member={member} />
                    ))}
                 </div>
                 
                 {filteredFaculty.length === 0 && (
                   <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                     <p className="text-slate-400 font-medium">No faculty members found in this department.</p>
                   </div>
                 )}
               </>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}
