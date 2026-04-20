"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, GraduationCap, Users, Bell, ArrowRight } from 'lucide-react';
import coursesData from '@/lib/data/courses.json';
import facultyData from '@/lib/data/faculty.json';
import noticesData from '@/lib/data/notices.json';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  category: 'Course' | 'Faculty' | 'Notice';
  link: string;
  subtext: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const results: SearchResult[] = query.length < 2 
    ? [] 
    : [
        ...coursesData.filter(c => c.title.toLowerCase().includes(query.toLowerCase())).map(c => ({
          id: c.id,
          title: c.title,
          category: 'Course' as const,
          link: `/academics/${c.slug}`,
          subtext: c.department
        })),
        ...facultyData.filter(f => f.name.toLowerCase().includes(query.toLowerCase())).map(f => ({
          id: f.id,
          title: f.name,
          category: 'Faculty' as const,
          link: '/faculty',
          subtext: f.designation
        })),
        ...noticesData.filter(n => n.title.toLowerCase().includes(query.toLowerCase())).map(n => ({
          id: n.id,
          title: n.title,
          category: 'Notice' as const,
          link: '/notices',
          subtext: n.date
        }))
      ].slice(0, 6);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 bg-academic-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-top-4 duration-300">
        {/* Search Input Area */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
          <Search className="text-academic-gold" size={24} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for courses, faculty, or announcements..."
            className="flex-1 text-xl font-medium outline-none text-academic-navy placeholder:text-slate-400"
          />
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length < 2 ? (
            <div className="p-12 text-center">
              <p className="text-slate-400 font-medium">Type at least 2 characters to search…</p>
              <div className="flex justify-center gap-4 mt-6">
                {['Honours', 'Physics', 'Admissions', 'NCC'].map(tag => (
                  <button key={tag} onClick={() => setQuery(tag)} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-bold hover:bg-academic-gold/10 hover:text-academic-gold transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-1">
              {results.map((res) => (
                <Link 
                  key={`${res.category}-${res.id}`} 
                  href={res.link}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-academic-navy group-hover:text-academic-gold transition-all">
                    {res.category === 'Course' && <GraduationCap size={20} />}
                    {res.category === 'Faculty' && <Users size={20} />}
                    {res.category === 'Notice' && <Bell size={20} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-academic-navy group-hover:text-academic-gold transition-colors">{res.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">{res.category} • {res.subtext}</p>
                  </div>
                  <ArrowRight size={18} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-400 font-medium">No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-6">
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">ESC</span>
              <span>to close</span>
           </div>
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">ENTER</span>
              <span>to select</span>
           </div>
        </div>
      </div>
    </div>
  );
}
