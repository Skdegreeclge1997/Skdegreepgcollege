import React from 'react';
import Link from 'next/link';
import { Search, Home, GraduationCap, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 pt-32 pb-20">
      <div className="max-w-3xl w-full text-center">
        {/* Large 404 Header */}
        <div className="relative inline-block mb-12">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-50 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-black text-academic-navy mb-2 tracking-tight">Lost on Campus?</h2>
                <p className="text-lg text-slate-500 font-medium">The page you're looking for has moved or graduated.</p>
             </div>
          </div>
        </div>

        {/* Suggestion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/" className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-academic-gold hover:shadow-xl transition-all group">
            <Home className="mx-auto mb-4 text-academic-navy group-hover:text-academic-gold" size={32} />
            <h3 className="font-bold text-academic-navy">Back to Home</h3>
            <p className="text-xs text-slate-500 mt-2">Start your journey from the main gate.</p>
          </Link>
          <Link href="/academics" className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-academic-gold hover:shadow-xl transition-all group">
            <GraduationCap className="mx-auto mb-4 text-academic-navy group-hover:text-academic-gold" size={32} />
            <h3 className="font-bold text-academic-navy">Our Courses</h3>
            <p className="text-xs text-slate-500 mt-2">Explore our Honours programs.</p>
          </Link>
          <Link href="/contact" className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-academic-gold hover:shadow-xl transition-all group">
            <Phone className="mx-auto mb-4 text-academic-navy group-hover:text-academic-gold" size={32} />
            <h3 className="font-bold text-academic-navy">Get Help</h3>
            <p className="text-xs text-slate-500 mt-2">Contact the admin helpdesk.</p>
          </Link>
        </div>

        {/* Search Placeholder */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for faculty, courses, or news…" 
            className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="mt-16 text-slate-400 text-sm font-medium">
          S.K. Degree & P.G. College • Vizianagaram
        </div>
      </div>
    </main>
  );
}
