import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Users, BookOpen, MapPin, CheckCircle2 } from 'lucide-react';
import NoticeCard from '@/components/NoticeCard';
import noticesData from '@/lib/data/notices.json';
import { Notice } from '@/lib/types';
import { BrandScroller } from '@/components/ui/brand-scroller';
import NewsSection from '@/components/NewsSection';

const recentNotices = (noticesData as Notice[]).slice(0, 3);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000" // Campus backdrop
            alt="S.K. Degree College Campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-academic-navy/80 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-academic-gold/20 border border-academic-gold/30 text-academic-gold text-sm font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Award size={16} />
            <span>College Code: 17950</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 leading-[1.1] text-balance">
            S.K. DEGREE & <br />
            <span className="text-academic-gold">P.G. COLLEGE</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-lg md:text-2xl text-slate-300 mb-10 md:mb-12 font-medium">
            <MapPin size={20} className="text-academic-gold md:w-6 md:h-6" />
            <span>Ayyannapeta Jn., Vizianagaram</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-md mx-auto sm:max-w-none">
            <Link 
              href="/admissions" 
              className="w-full sm:w-auto px-10 py-4 bg-academic-gold text-academic-navy font-bold rounded-full hover:bg-white transition-all duration-300 text-lg shadow-xl hover:shadow-academic-gold/20 active:scale-95"
            >
              Apply Online 2026-27
            </Link>
            <Link 
              href="/academics" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 text-lg active:scale-95"
            >
              Explore Programs
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-academic-gold to-transparent" />
        </div>
      </section>

      {/* MSN Institutions Affiliation */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm mb-0">Part of</p>
          <h2 className="text-2xl md:text-3xl font-bold text-academic-navy mt-2">MSN Institutions</h2>
          <div className="flex flex-wrap justify-center gap-8 mt-6 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-semibold text-slate-600">MSN Junior College</span>
            <span className="font-semibold text-slate-600">Sri Gurudatta Degree College</span>
            <span className="font-semibold text-slate-600">Dr. PVG Rajah Saheb College</span>
          </div>
        </div>
      </section>

      {/* Stats & Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'Successful Placements', value: '123+', icon: <Users size={32} />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Experienced Faculty', value: '85+', icon: <Award size={32} />, color: 'bg-academic-gold/10 text-academic-gold' },
              { label: 'Academic Programs', value: '12', icon: <BookOpen size={32} />, color: 'bg-green-50 text-green-600' }
            ].map((stat, i) => (
              <div key={i} className="p-10 rounded-3xl border border-slate-100 hover:border-academic-gold/30 hover:shadow-xl transition-all duration-500 group">
                <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                <p className="text-4xl font-black text-academic-navy mb-2">{stat.value}</p>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections (NCC & Labs) */}
      <section className="py-20 bg-academic-navy text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-academic-gold/20 text-academic-gold rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-academic-gold/30">
                <Award size={14} />
                <span>Premier Training Hub</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Excellence in <br />
                <span className="text-academic-gold">NCC Training</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
                We take immense pride in our NCC wings (Army & Navy). Our cadets are consistently 
                placed in the Indian Defense Forces, securing top honors in RDC parades.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {['Army Wing for Boys', 'Naval Wing for Girls', 'Agniveer Selection', 'Parade Champions'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-academic-gold" />
                    <span className="text-sm font-bold text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ncc" className="inline-flex items-center gap-2 text-academic-gold font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest">
                View NCC Achievements <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative group">
              <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 p-3 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                 <Image
                    src="/images/ncc-cadets.jpeg"
                    alt="NCC Training"
                    fill
                    className="object-cover rounded-3xl"
                 />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-academic-gold p-6 rounded-2xl shadow-2xl text-academic-navy animate-bounce-slow">
                <p className="text-3xl font-black">#1</p>
                <p className="text-[10px] font-black uppercase tracking-tighter">RDC Parade Winner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Partners */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-academic-navy mb-4">Our Students Placed At</h2>
          <p className="text-slate-500 font-medium mb-12">Leading Multinational Corporations & Fast-Growing Startups</p>
        </div>
        <BrandScroller />
      </section>

      {/* Latest News Section */}
      <NewsSection />

      {/* Recent Notices */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-bold text-academic-navy">Notice Board</h2>
          <Link href="/notices" className="text-academic-gold font-bold flex items-center gap-2">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-academic-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-academic-navy mb-8">Join the Legacy of Learning</h2>
          <p className="text-xl text-academic-navy/70 mb-12 max-w-2xl mx-auto">
            Applications for the academic year 2026-27 are now open. Secure your future with the region's premier institution.
          </p>
          <Link 
            href="/admissions" 
            className="px-12 py-5 bg-academic-navy text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-2xl inline-block"
          >
            Apply Now Online
          </Link>
        </div>
      </section>
    </main>
  );
}
