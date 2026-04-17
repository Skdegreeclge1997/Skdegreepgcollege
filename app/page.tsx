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
    <main className="min-h-screen bg-white selection:bg-academic-gold/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mesh-gradient">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000" // Campus backdrop
            alt="S.K. Degree College Campus"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          {/* Animated Mesh Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-academic-navy/20 to-academic-navy/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-dark border border-white/20 text-academic-gold text-xs font-black uppercase tracking-[0.3em] mb-10 animate-reveal">
            <Award size={16} />
            <span>Academic Excellence Since 2005</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-9xl font-black mb-8 leading-[0.95] tracking-tighter animate-reveal [animation-delay:200ms] opacity-0 fill-mode-forwards text-white">
            S.K. DEGREE & <br />
            <span className="text-academic-gold text-glow">P.G. COLLEGE</span>
          </h1>

          <div className="flex items-center justify-center gap-3 text-lg md:text-2xl text-slate-300 mb-12 font-medium animate-reveal [animation-delay:400ms] opacity-0 fill-mode-forwards">
            <div className="w-12 h-[1px] bg-academic-gold/50" />
            <MapPin size={22} className="text-academic-gold" />
            <span className="tracking-tight">Vizianagaram's Premier Institution</span>
            <div className="w-12 h-[1px] bg-academic-gold/50" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg mx-auto sm:max-w-none animate-reveal [animation-delay:600ms] opacity-0 fill-mode-forwards">
            <Link
              href="/admissions"
              className="group w-full sm:w-auto px-12 py-5 bg-academic-gold text-academic-navy font-black rounded-2xl hover:bg-white transition-all duration-500 text-lg shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              Apply Online 2026-27
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/academics"
              className="w-full sm:w-auto px-12 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all duration-500 text-lg hover:-translate-y-1 active:scale-95"
            >
              Explore Programs
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 rotate-180 [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-academic-gold to-transparent" />
        </div>

        {/* Floating Admissions Badge */}
        <div className="absolute top-32 right-10 hidden xl:flex flex-col items-center gap-4 animate-bounce-slow">
          <div className="w-24 h-24 rounded-full glass-dark border border-academic-gold/30 flex items-center justify-center p-4 text-center">
            <span className="text-[10px] font-black text-academic-gold leading-none uppercase tracking-tighter">Admissions<br /><span className="text-lg">Open</span></span>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/3 text-center lg:text-left">
              <p className="text-academic-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2">Our Network</p>
              <h2 className="text-3xl font-black text-academic-navy">Arunodaya Educational Society</h2>
            </div>
            <div className="lg:w-2/3 flex flex-wrap justify-center lg:justify-end gap-10 items-center">
              {[
                'MSN Junior College',
                'Sri Gurudatta Degree',
                'Dr. PVG Rajah Saheb'
              ].map((inst) => (
                <div key={inst} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-academic-gold group-hover:scale-150 transition-transform" />
                  <span className="font-black text-sm text-slate-400 group-hover:text-academic-navy transition-colors">{inst}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="py-32 bg-[#FDFDFF] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Placements 2024', value: '123+', icon: <Users size={32} />, color: 'text-blue-600' },
              { label: 'Expert Faculty', value: '85+', icon: <Award size={32} />, color: 'text-academic-gold' },
              { label: 'Academic Tracks', value: '12', icon: <BookOpen size={32} />, color: 'text-emerald-600' }
            ].map((stat, i) => (
              <div
                key={i}
                className="p-12 rounded-[3rem] glass border border-white hover:-translate-y-2 transition-all duration-500 group animate-reveal"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform duration-500 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-5xl font-black text-academic-navy mb-3 tracking-tighter">{stat.value}</p>
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NCC Section (Already Refined, adding subtle Polish) */}
      <section className="py-24 bg-academic-navy text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-academic-gold/10 text-academic-gold rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-academic-gold/20">
                <Award size={16} />
                <span>Defense Excellence</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-white">
                Forge Your <br />
                <span className="text-academic-gold">Character</span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl font-medium">
                Our elite NCC wings represent the pinnacle of discipline and patriotism. We don't just train cadets; we build the future leaders of the Indian Armed Forces.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { t: 'Army Wing (Boys)', d: '78 cadets commissioned' },
                  { t: 'Naval Wing (Girls)', d: 'State-of-the-art prep' },
                  { t: 'Agniveer Success', d: '95% selection rate' },
                  { t: 'RDC Excellence', d: 'National level honors' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-academic-gold/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-academic-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white uppercase tracking-wider">{item.t}</p>
                      <p className="text-xs text-slate-500 font-bold">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/ncc" className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-academic-gold hover:text-academic-navy text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-white/10">
                View NCC Hall of Fame
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="relative group animate-reveal [animation-delay:300ms]">
              <div className="aspect-video rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 p-4 shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-[1.03]">
                <Image
                  src="/images/ncc-cadets.jpeg"
                  alt="NCC Training"
                  fill
                  className="object-cover rounded-[2.5rem] brightness-90 group-hover:brightness-110 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-academic-gold p-10 rounded-3xl shadow-[0_30px_60px_rgba(212,175,55,0.4)] text-academic-navy">
                <p className="text-5xl font-black tracking-tighter">#1</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">NCC Unit in Vizag</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-academic-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4">Our Partners</p>
          <h2 className="text-4xl font-black text-academic-navy mb-16 tracking-tight">Legacy of Placements</h2>
          <BrandScroller />
        </div>
      </section>

      <NewsSection />

      <section className="py-32 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <p className="text-academic-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4">Official Updates</p>
            <h2 className="text-5xl font-black text-academic-navy tracking-tight">Notice Board</h2>
          </div>
          <Link href="/notices" className="group flex items-center gap-3 px-8 py-4 bg-slate-50 hover:bg-academic-navy hover:text-white text-slate-500 font-black rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] border border-slate-100">
            Access Full Board
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {recentNotices.map((notice, i) => (
            <div key={notice.id} className="animate-reveal" style={{ animationDelay: `${i * 150}ms` }}>
              <NoticeCard notice={notice} />
            </div>
          ))}
        </div>
      </section>

      {/* High-Impact CTA */}
      <section className="py-32 bg-white px-4">
        <div className="container mx-auto max-w-6xl rounded-[4rem] bg-academic-navy p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-academic-gold/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 translate-y-1/2 -translate-x-1/2 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              Your Future <br />
              <span className="text-academic-gold">Starts Now</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
              Enroll in S.K. Degree & P.G. College and join a legacy of academic excellence, discipline, and unparalleled success.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/admissions"
                className="px-12 py-5 bg-academic-gold text-academic-navy font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-academic-gold/20"
              >
                Start Admission Process
              </Link>
              <Link
                href="/contact"
                className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all"
              >
                Request Counseling
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
