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
    <main className="snap-container">
      {/* 1. Hero Section */}
      <section className="snap-section mesh-gradient">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000"
            alt="Campus backdrop"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-academic-navy/20 to-academic-navy/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-academic-gold/20 border border-academic-gold/30 text-academic-gold text-sm font-bold uppercase tracking-widest mb-8 animate-reveal">
            <Award size={16} />
            <span>Academic Excellence Since 2005</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight animate-reveal [animation-delay:200ms] opacity-0 fill-mode-forwards">
            <span className="text-white">S.K. DEGREE</span> <span className="text-academic-gold">&</span> <br />
            <span className="text-academic-gold">P.G. COLLEGE</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-lg md:text-2xl text-slate-300 mb-10 md:mb-12 font-medium animate-reveal [animation-delay:400ms] opacity-0 fill-mode-forwards">
            <MapPin size={20} className="text-academic-gold" />
            <span>Vizianagaram's Premier Institution</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-md mx-auto sm:max-w-none animate-reveal [animation-delay:600ms] opacity-0 fill-mode-forwards">
            <Link 
              href="/admissions" 
              className="w-full sm:w-auto px-10 py-4 bg-academic-gold text-academic-navy font-bold rounded-full hover:bg-white transition-all duration-300 text-lg shadow-xl"
            >
              Apply Online 2026-27
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Institutional Success (Trust + Stats + Placements) */}
      <section className="snap-section bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Part of</p>
            <h2 className="text-2xl font-black text-academic-navy">Arunodaya Educational Society</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Placements', value: '123+', icon: <Users size={24} />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Faculty', value: '85+', icon: <Award size={24} />, color: 'bg-academic-gold/10 text-academic-gold' },
              { label: 'Programs', value: '12', icon: <BookOpen size={24} />, color: 'bg-green-50 text-green-600' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-100 text-center">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-black text-academic-navy">{stat.value}</p>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
             <h3 className="text-xl font-bold text-academic-navy mb-8">Our Students Placed At</h3>
             <BrandScroller />
          </div>
        </div>
      </section>

      {/* 3. NCC Section */}
      <section className="snap-section bg-academic-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                placed in the Indian Defense Forces.
              </p>
              <Link href="/ncc" className="inline-flex items-center gap-2 text-academic-gold font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest">
                View Achievements <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative group">
              <div className="aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2 shadow-2xl">
                 <Image src="/images/ncc-cadets.jpeg" alt="NCC Training" fill className="object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. News Section (Single Slide with Heading) */}
      <section className="snap-section bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <p className="text-academic-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4">Official Updates</p>
             <h2 className="text-4xl font-black text-academic-navy tracking-tight">Latest News</h2>
          </div>
          <NewsSection />
        </div>
      </section>

      {/* 5. Notice Board + CTA */}
      <section className="snap-section bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
             <h2 className="text-3xl font-black text-academic-navy">Notice Board</h2>
             <Link href="/notices" className="text-academic-gold font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                View All <ArrowRight size={16} />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {recentNotices.map((notice, i) => (
              <div key={notice.id} className="animate-reveal" style={{ animationDelay: `${i * 150}ms` }}>
                <NoticeCard notice={notice} />
              </div>
            ))}
          </div>

          <div className="bg-academic-navy rounded-[3rem] p-12 text-center relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Your Future Starts Now</h3>
                <Link href="/admissions" className="px-10 py-4 bg-academic-gold text-academic-navy font-bold rounded-full hover:scale-105 transition-all shadow-xl inline-block">
                   Apply Now 2026-27
                </Link>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
