'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, MapPin, Users, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import NoticeCard from '@/components/NoticeCard';
import noticesData from '@/lib/data/notices.json';
import { Notice } from '@/lib/types';
import { BrandScroller } from '@/components/ui/brand-scroller';
import NewsSection from '@/components/NewsSection';
import { ThreeBackground } from '@/components/Visuals';

const recentNotices = (noticesData as Notice[]).slice(0, 3);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function LandingPage() {
  return (
    <main className="snap-container bg-academic-navy">
      {/* 1. Hero Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="snap-section mesh-gradient items-center justify-center pt-0"
      >
        <ThreeBackground />
        <div className="absolute inset-0 z-0">
          <Image
            alt="S.K. Degree and P.G. College Vizianagaram Campus View"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-academic-navy/20 to-academic-navy/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-academic-gold/20 border border-academic-gold/30 text-academic-gold text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Award size={16} />
            <span>Academic Excellence Since 2005</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight"
            variants={fadeIn}
          >
            <span className="text-white">S.K. DEGREE</span> <span className="text-academic-gold">&</span> <br />
            <span className="text-academic-gold">P.G. COLLEGE</span>
          </motion.h1>
          
          <motion.div 
            className="flex items-center justify-center gap-2 text-lg md:text-2xl text-slate-300 mb-10 md:mb-12 font-medium"
            variants={fadeIn}
          >
            <MapPin size={20} className="text-academic-gold" />
            <span>Vizianagaram's Premier Institution</span>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-md mx-auto sm:max-w-none"
            variants={fadeIn}
          >
            <Link 
              href="/admissions" 
              aria-label="Apply Now Online for Admissions 2026-27"
              className="w-full sm:w-auto px-10 py-4 bg-academic-gold text-academic-navy font-bold rounded-full hover:bg-white transition-all duration-300 text-lg shadow-xl"
            >
              Apply Online 2026-27
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Institutional Success */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-white justify-center pt-0"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs mb-1">Part of</p>
            <h2 className="text-2xl font-black text-academic-navy">Arunodaya Educational Society</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Placements', value: '123+', icon: <Users size={24} />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Faculty', value: '85+', icon: <Award size={24} />, color: 'bg-academic-gold/10 text-academic-gold' },
              { label: 'Programs', value: '12', icon: <BookOpen size={24} />, color: 'bg-green-50 text-green-600' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-slate-100 text-center bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-black text-academic-navy">{stat.value}</p>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
             <h3 className="text-xl font-bold text-academic-navy mb-8">Our Students Placed At</h3>
             <BrandScroller />
          </div>
        </div>
      </motion.section>

      {/* 3. NCC Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-academic-navy text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-academic-gold/20 text-academic-gold rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-academic-gold/30">
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
              <Link 
                href="/ncc" 
                aria-label="View NCC Achievements and Training Details"
                className="inline-flex items-center gap-2 text-academic-gold font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest"
              >
                View Achievements <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2 shadow-2xl"
              >
                 <Image 
                    src="/images/ncc-cadets.jpeg" 
                    alt="S.K. Degree College NCC Cadets Training" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-2xl" 
                 />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. News Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-slate-50"
      >
        <div className="container mx-auto px-4 pt-10">
          <div className="text-center mb-10">
             <p className="text-academic-gold font-black uppercase tracking-[0.4em] text-xs mb-2">Official Updates</p>
             <h2 className="text-4xl font-black text-academic-navy tracking-tight">Latest News</h2>
          </div>
          <NewsSection />
        </div>
      </motion.section>

      {/* 5. Notice Board + CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-white"
      >
        <div className="container mx-auto px-4 pt-10">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-black text-academic-navy">Notice Board</h2>
             <Link 
                href="/notices" 
                aria-label="View all official notices and board updates"
                className="text-academic-gold font-bold flex items-center gap-2 text-xs uppercase tracking-widest"
             >
                View All <ArrowRight size={16} />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {recentNotices.map((notice) => (
              <motion.div 
                key={notice.id} 
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <NoticeCard notice={notice} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-academic-navy rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden"
          >
             <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tighter">Your Future Starts Now</h3>
                <Link 
                  href="/admissions" 
                  aria-label="Start Admission Process for 2026-27"
                  className="px-10 py-4 bg-academic-gold text-academic-navy font-bold rounded-full hover:scale-105 transition-all shadow-xl inline-block"
                >
                   Apply Now 2026-27
                </Link>
             </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
