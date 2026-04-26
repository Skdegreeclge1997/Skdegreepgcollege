'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, MapPin, Users, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import NoticeCard from '@/components/NoticeCard';
import { Notice, GalleryItem } from '@/lib/types';
import { BrandScroller } from '@/components/ui/brand-scroller';
import NewsSection from '@/components/NewsSection';
import YouTubeFacade from '@/components/YouTubeFacade';
import Footer from '@/components/Footer';
import TestimonialSection from '@/components/TestimonialSection';
import dynamic from 'next/dynamic';

const ThreeBackground = dynamic(() => import('@/components/Visuals').then(mod => mod.ThreeBackground), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-academic-navy/10" />
});

import { supabase } from '@/lib/supabase';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function LandingPage() {
  const [photoGallery, setPhotoGallery] = React.useState<GalleryItem[]>([]);
  const [videoGallery, setVideoGallery] = React.useState<GalleryItem[]>([]);
  const [recentNotices, setRecentNotices] = React.useState<Notice[]>([]);
  const [activeTab, setActiveTab] = React.useState<'text' | 'video'>('text');

  React.useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setPhotoGallery(data.filter((item: GalleryItem) => item.category !== 'Video').slice(0, 6));
        setVideoGallery(data.filter((item: GalleryItem) => item.category === 'Video').slice(0, 3));
      }
    };

    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('date', { ascending: false })
        .limit(3);
      
      if (!error && data) {
        setRecentNotices(data as Notice[]);
      }
    };

    fetchGallery();
    fetchNotices();
  }, []);

  return (
    <main className="snap-container bg-academic-navy">
      {/* 1. Hero Section */}
      <section 
        className="snap-section mesh-gradient items-center justify-center relative overflow-hidden"
      >
        <ThreeBackground />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200"
            alt="S.K. Degree and P.G. College Vizianagaram Campus View"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            fetchPriority="high"
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
            className="text-4xl sm:text-5xl md:text-8xl font-body font-black mb-6 leading-tight tracking-tight"
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
            <span>Vizianagaram&apos;s Premier Institution</span>
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
      </section>

      {/* 2. Institutional Success */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        className="snap-section bg-white justify-center"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="text-center mb-6">
            <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-xs mb-1">Part of</p>
            <h2 className="text-2xl font-black text-academic-navy">Arunodaya Educational Society</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <p className="text-slate-600 font-bold uppercase tracking-wider text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
             <h3 className="text-xl font-bold text-academic-navy mb-4">Our Students Placed At</h3>
             <BrandScroller />
          </div>

          {/* Quick Navigation Links for SEO & UX */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/about" 
              className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-academic-gold/10 transition-all group"
            >
              <div>
                <h4 className="text-academic-navy font-black text-lg">About Our Institution</h4>
                <p className="text-slate-500 text-sm">Discover our history, mission, and values.</p>
              </div>
              <ArrowRight className="text-academic-gold group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              href="/faculty" 
              className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-academic-gold/10 transition-all group"
            >
              <div>
                <h4 className="text-academic-navy font-black text-lg">Meet Our Faculty</h4>
                <p className="text-slate-500 text-sm">Qualified educators dedicated to student success.</p>
              </div>
              <ArrowRight className="text-academic-gold group-hover:translate-x-2 transition-transform" />
            </Link>
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
                <p className="text-base text-slate-200 leading-relaxed max-w-xl">
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
                        <h3 className="text-white font-bold text-sm">{item.title}</h3>
                        <p className="text-slate-300 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href="/academics#ncc" 
                aria-label="Explore NCC Program - View Achievements and Training Details"
                className="inline-flex items-center gap-2 text-academic-gold font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest"
              >
                Explore NCC Program <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative h-[380px] grid grid-cols-2 grid-rows-2 gap-4">
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
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="bg-slate-50 py-16"
      >
        <div className="container mx-auto px-4 pt-4 pb-20">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
            <div className="max-w-2xl">
              <div className="mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-academic-navy leading-tight">
                Latest Events & <span className="text-academic-gold">Activities</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium text-sm md:text-base">
                Stay informed with the latest happenings, achievements, and events from our vibrant campus community.
              </p>
            </div>
          </div>
          
          <NewsSection />
        </div>
      </motion.section>

      {/* 5. Gallery Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="bg-slate-50 py-16 border-t border-slate-100 overflow-hidden"
      >
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center justify-between">
             <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-display font-black text-academic-navy">Campus Gallery</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">A Visual Journey Through S.K. Degree College</p>
             </div>
             <Link 
                href="/gallery" 
                aria-label="View All Campus Gallery Photos"
                className="px-6 py-3 bg-white border border-slate-200 text-academic-gold font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-academic-gold hover:text-white transition-all shadow-sm"
             >
                View All <ArrowRight size={16} />
             </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* Row 1: Sliding Left */}
          <div className="relative flex overflow-hidden py-2">
            <div className="flex gap-6 animate-marquee [--duration:60s] [--gap:1.5rem] hover:[animation-play-state:paused]">
              {[...photoGallery.slice(0, Math.ceil(photoGallery.length / 2)), ...photoGallery.slice(0, Math.ceil(photoGallery.length / 2)), ...photoGallery.slice(0, Math.ceil(photoGallery.length / 2)), ...photoGallery.slice(0, Math.ceil(photoGallery.length / 2))].map((item, i) => (
                <div key={`row1-${item.id}-${i}`} className="w-[300px] md:w-[400px] aspect-[4/3] shrink-0 relative rounded-[2rem] overflow-hidden shadow-lg group">
                   <Image 
                     src={item.url} 
                     alt={item.caption} 
                     fill 
                     className="object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-academic-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                      <p className="text-white font-bold text-sm">{item.caption}</p>
                      <span className="text-academic-gold text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                   </div>
                </div>
              ))}
            </div>
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />
          </div>

          {/* Row 2: Sliding Right (Reverse) */}
          <div className="relative flex overflow-hidden py-2">
            <div className="flex gap-6 animate-marquee-reverse [--duration:50s] [--gap:1.5rem] hover:[animation-play-state:paused]">
              {[...photoGallery.slice(Math.ceil(photoGallery.length / 2)), ...photoGallery.slice(Math.ceil(photoGallery.length / 2)), ...photoGallery.slice(Math.ceil(photoGallery.length / 2)), ...photoGallery.slice(Math.ceil(photoGallery.length / 2))].map((item, i) => (
                <div key={`row2-${item.id}-${i}`} className="w-[300px] md:w-[400px] aspect-[4/3] shrink-0 relative rounded-[2rem] overflow-hidden shadow-lg group">
                   <Image 
                     src={item.url} 
                     alt={item.caption} 
                     fill 
                     className="object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-academic-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                      <p className="text-white font-bold text-sm">{item.caption}</p>
                      <span className="text-academic-gold text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                   </div>
                </div>
              ))}
            </div>
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />
          </div>
        </div>
      </motion.section>

      {/* 5B. Video Gallery Section (Improved Style) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="bg-slate-100 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
             <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-academic-navy">Campus Life Videos</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Experience S.K. Degree College in Motion</p>
             </div>
             <Link 
                href="/gallery" 
                className="px-6 py-3 bg-white border border-slate-200 text-academic-gold font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-academic-gold hover:text-white transition-all shadow-sm"
             >
                Watch All <ArrowRight size={16} />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  className="group relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-black transform transition-all duration-500 hover:-translate-y-2 hover:shadow-academic-navy/20"
                >
                  {videoId ? (
                    <>
                       <YouTubeFacade videoId={videoId} title={item.caption} />
                       {/* Custom Play Button Overlay */}
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-500">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl">
                             <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                          </div>
                       </div>
                       <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                          <span className="px-3 py-1 bg-academic-gold text-academic-navy text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                             {item.caption}
                          </span>
                       </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-800 text-white">
                      <p>Invalid Video URL</p>
                    </div>
                  )}
                </div>
              )
            }) : (
              <div className="col-span-full aspect-video flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-300 bg-slate-50">
                <p className="text-slate-600 font-bold mb-2">No videos available</p>
                <p className="text-slate-600 text-sm">Add videos from the admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 5C. Testimonials Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="text-academic-gold text-xs font-black uppercase tracking-[0.3em] mb-4">Student Voices</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-academic-navy mb-6">What Our Alumni Say</h2>
            <p className="text-slate-500 text-sm md:text-base">Thousands of graduates are out there making a difference. Here&apos;s what some of them have to say about their journey.</p>
          </div>
          <TestimonialSection />
        </div>
      </motion.section>

      {/* 6. Notice Board + CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="bg-white py-16"
      >
        <div className="container mx-auto px-4 pt-4 pb-8">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-display font-bold text-academic-navy flex items-center gap-3">
                Notice Board
             </h2>
             <Link 
                href="/notices" 
                aria-label="View All Official Notices and Board Updates"
                className="text-academic-gold font-bold flex items-center gap-2 text-xs uppercase tracking-widest"
             >
                View All <ArrowRight size={16} />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Notices Column */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-academic-navy text-white px-6 py-4 flex justify-between items-center">
                <span className="font-display font-bold">Academic Notices</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Recent Updates</span>
              </div>
              <div className="h-[400px] relative overflow-hidden bg-slate-50">
                <div className="animate-marquee-vertical hover:[animation-play-state:paused] flex flex-col gap-4 p-4 [--duration:15s]">
                  {[...recentNotices.filter(n => ['Exam', 'General'].includes(n.category) || n.is_pinned), ...recentNotices.filter(n => ['Exam', 'General'].includes(n.category) || n.is_pinned)].map((notice, i) => (
                    <Link key={`${notice.id}-${i}`} href={`/notices#${notice.id}`}>
                      <NoticeCard notice={notice} />
                    </Link>
                  ))}
                </div>
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
              </div>
            </div>

            {/* Admission & Events Column */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-academic-navy text-white px-6 py-4 flex justify-between items-center">
                <span className="font-display font-bold">Admission & Events</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Campus Life</span>
              </div>
              <div className="h-[400px] relative overflow-hidden bg-slate-50">
                <div className="animate-marquee-vertical hover:[animation-play-state:paused] flex flex-col gap-4 p-4 [--duration:20s]">
                  {[...recentNotices.filter(n => ['Admission', 'Event', 'Holiday'].includes(n.category)), ...recentNotices.filter(n => ['Admission', 'Event', 'Holiday'].includes(n.category))].map((notice, i) => (
                    <Link key={`${notice.id}-${i}`} href={`/notices#${notice.id}`}>
                      <NoticeCard notice={notice} />
                    </Link>
                  ))}
                </div>
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

      </motion.section>

      {/* 7. CTA + Footer Section */}
      <section className="bg-slate-50 pt-16 pb-0 flex flex-col justify-between">
        <div className="container mx-auto px-4 mb-10">
           <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-academic-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="text-center md:text-left relative z-10">
                 <h3 className="text-2xl font-black text-academic-navy mb-1">Your Future Starts Now</h3>
                 <p className="text-sm text-slate-600 font-bold uppercase tracking-widest opacity-80">Admissions Open 2026-27</p>
              </div>
              <Link 
                 href="/admissions"
                 className="relative z-10 whitespace-nowrap px-10 py-4 bg-academic-gold text-academic-navy font-black rounded-2xl hover:bg-academic-navy hover:text-white transition-all shadow-xl active:scale-95 group"
              >
                 Apply Online Now
              </Link>
           </div>
        </div>
        <Footer />
      </section>
    </main>
  );
}
