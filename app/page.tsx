import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Users, BookOpen, MapPin, CheckCircle2 } from 'lucide-react';
import NoticeCard from '@/components/NoticeCard';
import noticesData from '@/lib/data/notices.json';
import { Notice } from '@/lib/types';

const recentNotices = (noticesData as Notice[]).slice(0, 3);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000" // Campus backdrop
            alt="SK Degree College Campus"
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
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight text-balance">
            SK DEGREE & <br />
            <span className="text-academic-gold">P.G. COLLEGE</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-slate-300 mb-12 font-medium">
            <MapPin size={24} className="text-academic-gold" />
            <span>Ayyannapeta Jn., Vizianagaram</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/admissions" 
              className="px-10 py-4 bg-academic-gold text-academic-navy font-bold rounded-full hover:bg-white transition-all duration-300 text-lg shadow-xl hover:shadow-academic-gold/20"
            >
              Apply Online 2026-27
            </Link>
            <Link 
              href="/academics" 
              className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 text-lg"
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
      <section className="py-24 bg-academic-navy text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Excellence in <br />
                <span className="text-academic-gold">NCC Training</span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                We take immense pride in our NCC wings (Army & Navy). Our cadets are consistently 
                placed in the Indian Defense Forces, securing top honors in RDC parades.
              </p>
              <ul className="space-y-4 mb-12">
                {['Army Wing for Boys', 'Naval Wing for Girls', 'Agniveer Selection Success', 'State-level Parade Champions'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-academic-gold" />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ncc" className="inline-flex items-center gap-2 text-academic-gold font-bold hover:gap-4 transition-all">
                View NCC Achievements <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-4">
                 <Image
                    src="https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=1000" // NCC/Defense placeholder
                    alt="NCC Training"
                    fill
                    className="object-cover rounded-2xl"
                 />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-academic-gold p-8 rounded-2xl shadow-2xl text-academic-navy">
                <p className="text-4xl font-black">#1</p>
                <p className="text-sm font-bold uppercase">RDC Parade Winner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Partners */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-academic-navy mb-16">Our Students Placed At</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {['TCS', 'Cognizant', 'Wipro', 'Aurobindo', 'Hetero', 'Laurus Labs'].map((partner) => (
              <span key={partner} className="text-2xl md:text-3xl font-black text-slate-400 tracking-tighter">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

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
