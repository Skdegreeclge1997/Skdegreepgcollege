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
            <Link 
              href="/academics" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Overview Section (Trust + Stats Combined for Clean UI) */}
      <section className="snap-section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm mb-2">Part of</p>
            <h2 className="text-3xl md:text-4xl font-black text-academic-navy">Arunodaya Educational Society</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-4 opacity-60">
               <span className="font-semibold text-slate-400">MSN Junior College</span>
               <span className="font-semibold text-slate-400">Sri Gurudatta Degree</span>
               <span className="font-semibold text-slate-400">Dr. PVG Rajah Saheb</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Successful Placements', value: '123+', icon: <Users size={32} />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Experienced Faculty', value: '85+', icon: <Award size={32} />, color: 'bg-academic-gold/10 text-academic-gold' },
              { label: 'Academic Programs', value: '12', icon: <BookOpen size={32} />, color: 'bg-green-50 text-green-600' }
            ].map((stat, i) => (
              <div key={i} className="p-10 rounded-3xl border border-slate-100 hover:border-academic-gold/30 hover:shadow-xl transition-all duration-500 text-center">
                <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center mb-6 mx-auto`}>
                  {stat.icon}
                </div>
                <p className="text-4xl font-black text-academic-navy mb-2">{stat.value}</p>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NCC Section */}
      <section className="snap-section bg-academic-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-reveal">
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
              <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 p-3 shadow-2xl">
                 <Image
                    src="/images/ncc-cadets.jpeg"
                    alt="NCC Training"
                    fill
                    className="object-cover rounded-3xl"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Placement Section */}
      <section className="snap-section bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-academic-navy mb-16 tracking-tight">Our Students Placed At</h2>
          <BrandScroller />
          <div className="mt-20 flex justify-center gap-12 grayscale opacity-40">
             <div className="flex flex-col items-center">
                <p className="text-3xl font-black text-academic-navy">500+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Placements</p>
             </div>
             <div className="flex flex-col items-center">
                <p className="text-3xl font-black text-academic-navy">15.5 LPA</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Highest Package</p>
             </div>
          </div>
        </div>
      </section>

      {/* 5. College Bulletin (News + Notices) */}
      <section className="snap-section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-academic-navy">College Bulletin</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Latest News & Official Notices</p>
          </div>
          
          <div className="mb-16">
            <NewsSection />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNotices.map((notice, i) => (
              <div key={notice.id} className="animate-reveal" style={{ animationDelay: `${i * 150}ms` }}>
                <NoticeCard notice={notice} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/notices" className="inline-flex items-center gap-2 text-academic-gold font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
              Access Full Notice Board <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="snap-section bg-academic-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-academic-navy mb-8 tracking-tighter">Your Future Starts Now</h2>
          <p className="text-xl md:text-2xl text-academic-navy/70 mb-12 max-w-2xl mx-auto font-medium">
            Join the region's premier institution and secure your place in a legacy of academic excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/admissions" 
              className="px-12 py-5 bg-academic-navy text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-2xl text-lg"
            >
              Apply Now Online
            </Link>
            <Link 
              href="/contact" 
              className="px-12 py-5 bg-white text-academic-navy font-bold rounded-full hover:bg-slate-50 transition-all shadow-xl text-lg"
            >
              Contact Office
            </Link>
          </div>
        </div>
        
        {/* Footer Link Overlay */}
        <div className="absolute bottom-10 w-full text-center">
           <p className="text-xs font-bold text-academic-navy/40 uppercase tracking-[0.4em]">© 2026 S.K. Degree & P.G. College</p>
        </div>
      </section>
    </main>
  );
}
