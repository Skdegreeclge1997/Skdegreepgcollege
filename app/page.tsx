'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, MapPin, Users, BookOpen, ArrowRight, CheckCircle2, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import NoticeCard from '@/components/NoticeCard';
import noticesData from '@/lib/data/notices.json';
import { Notice, GalleryItem } from '@/lib/types';
import initialGalleryData from '@/lib/data/gallery.json';
import { BrandScroller } from '@/components/ui/brand-scroller';
import NewsSection from '@/components/NewsSection';
import { ThreeBackground } from '@/components/Visuals';

const recentNotices = (noticesData as Notice[]).slice(0, 3);
const allGallery = initialGalleryData as GalleryItem[];
const photoGallery = allGallery.filter(item => !item.url.includes('youtube.com') && !item.url.includes('youtu.be')).slice(0, 6);
const videoGallery = allGallery.filter(item => item.url.includes('youtube.com') || item.url.includes('youtu.be')).slice(0, 6);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
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
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000"
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
              
              <div className="space-y-6 mb-8">
                <p className="text-base text-slate-400 leading-relaxed max-w-xl">
                  S.K. Degree College is a premier hub for National Cadet Corps (NCC) training, 
                  fostering discipline, leadership, and a spirit of selfless service.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Army Wing (Boys)', desc: 'Rigorous ground training and tactical skills.' },
                    { title: 'Naval Wing (Girls)', desc: 'Specialized naval operations and watermanship.' },
                    { title: 'Defense Placements', desc: 'Direct pathway to the Indian Armed Forces.' },
                    { title: 'Leadership Training', desc: 'Developing character and national spirit.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1">
                        <CheckCircle2 size={16} className="text-academic-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{item.title}</h4>
                        <p className="text-slate-500 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href="/ncc" 
                aria-label="View NCC Achievements and Training Details"
                className="inline-flex items-center gap-2 text-academic-gold font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest"
              >
                Explore NCC Program <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative h-[450px] grid grid-cols-2 grid-rows-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              >
                 <Image 
                    src="/images/ncc-cadets.jpeg" 
                    alt="S.K. Degree College NCC Group Photo" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-academic-navy/60 to-transparent" />
                 <span className="absolute bottom-4 left-4 text-white text-[10px] font-bold uppercase tracking-widest bg-academic-gold/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">Combined Wings</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-xl border border-white/10"
              >
                 <Image 
                    src="/images/ncc.jpeg" 
                    alt="NCC Training Drill" 
                    fill 
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-academic-navy/40 to-transparent" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-academic-gold/5 flex items-center justify-center group"
              >
                 <Image 
                    src="https://images.unsplash.com/photo-1590216087343-6ad0fc24a29c?auto=format&fit=crop&q=80&w=800" 
                    alt="Cadet Discipline" 
                    fill 
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                 />
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-academic-gold/20 border border-academic-gold/40 flex items-center justify-center mb-2">
                       <Users size={20} className="text-academic-gold" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-white tracking-tighter">100+ Cadets Placed</span>
                 </div>
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
        className="snap-section bg-slate-50 overflow-y-auto no-scrollbar"
      >
        <div className="container mx-auto px-4 pt-4 pb-20">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
            <div className="max-w-2xl">
              <div className="mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-black text-academic-navy leading-tight">
                Latest Events & <span className="text-academic-gold">Activities</span>
              </h2>
              <p className="mt-4 text-slate-500 font-medium text-sm md:text-base">
                Stay informed with the latest happenings, achievements, and events from our vibrant campus community.
              </p>
            </div>
            
            <Link 
              href="/news" 
              aria-label="Explore Events Archive"
              className="group flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-bold rounded-xl hover:bg-academic-gold hover:text-academic-navy transition-all duration-300 shadow-lg text-sm"
            >
              Explore Events Archive
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <NewsSection />
        </div>
      </motion.section>

      {/* 5. Gallery Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-slate-50 overflow-y-auto no-scrollbar"
      >
        <div className="container mx-auto px-4 pt-4 pb-20">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-black text-academic-navy">Campus Gallery</h2>
             <Link 
                href="/gallery" 
                aria-label="View full campus gallery"
                className="text-academic-gold font-bold flex items-center gap-2 text-xs uppercase tracking-widest"
             >
                View All <ArrowRight size={16} />
             </Link>
          </div>
          <div className="relative overflow-hidden py-4 -mx-4 px-4">
            <motion.div 
              animate={{ 
                x: [0, -1000],
              }}
              transition={{ 
               duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-6 w-max"
            >
              {[...photoGallery, ...photoGallery, ...photoGallery].map((item, i) => {
                const isVideo = false;
                const thumbnailUrl = item.url;

                return (
                <Link 
                  href="/gallery" 
                  key={`${item.id}-${i}`} 
                  className="w-[80vw] sm:w-[350px] aspect-[4/3] shrink-0 relative rounded-3xl overflow-hidden shadow-md group block"
                >
                  <img src={thumbnailUrl} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-academic-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                     <p className="text-white font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.caption}</p>
                     <span className="text-academic-gold text-[10px] font-black uppercase tracking-widest mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.category}</span>
                  </div>
                </Link>
              )})}
            </motion.div>
            
            {/* Edge Gradients */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-30 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-30 pointer-events-none" />
          </div>
        </div>
      </motion.section>

      {/* 5B. Video Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-slate-100 overflow-y-auto no-scrollbar"
      >
        <div className="container mx-auto px-4 pt-4 pb-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
             <h2 className="text-3xl font-black text-academic-navy text-center md:text-left">Video Gallery</h2>
             <Link 
                href="/gallery" 
                aria-label="View full campus gallery"
                className="text-academic-gold font-bold flex items-center gap-2 text-xs uppercase tracking-widest"
             >
                Watch All <ArrowRight size={16} />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {videoGallery.length > 0 ? videoGallery.slice(0, 3).map((item, i) => {
              const getYoutubeId = (url: string) => {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return (match && match[2].length === 11) ? match[2] : null;
              };
              const videoId = getYoutubeId(item.url);

              return (
                <div 
                  key={`video-${item.id}-${i}`} 
                  className="w-full aspect-video relative rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-black"
                >
                  {videoId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={item.caption}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-800 text-white">
                      <p>Invalid Video URL</p>
                    </div>
                  )}
                </div>
              )
            }) : (
              <div className="col-span-full aspect-video flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50">
                <p className="text-slate-400 font-bold mb-2">No videos available</p>
                <p className="text-slate-400 text-sm">Add videos from the admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 6. Notice Board + CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-white overflow-y-auto no-scrollbar"
      >
        <div className="container mx-auto px-4 pt-4 pb-20">
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
          <div className="relative overflow-hidden py-4 -mx-4 px-4">
            <motion.div 
              animate={{ 
                x: [0, -1000],
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-6 w-max"
            >
              {[...recentNotices, ...recentNotices, ...recentNotices].map((notice, i) => (
                <div key={`${notice.id}-${i}`} className="w-[85vw] max-w-[350px] shrink-0">
                  <NoticeCard notice={notice} />
                </div>
              ))}
            </motion.div>
            
            {/* Edge Gradients */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </motion.section>
    </main>
  );
}
