'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, MapPin, Users, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import NoticeCard from '@/components/NoticeCard';
import { Notice, GalleryItem, GalleryVideo } from '@/lib/types';
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
      const [imagesRes, videosRes] = await Promise.all([
        supabase.from('gallery_images').select('*').order('created_at', { ascending: false }).limit(30),
        supabase.from('gallery_videos').select('*').order('created_at', { ascending: false }).limit(3)
      ]);
      
      if (!imagesRes.error && imagesRes.data) {
        setPhotoGallery(imagesRes.data);
      }
      if (!videosRes.error && videosRes.data) {
        // Map gallery_videos structure to GalleryItem expected by the video grid
        const mappedVideos = videosRes.data.map((v: any) => ({
          id: v.id,
          url: v.video_url,
          caption: v.title,
          category: 'Video'
        }));
        setVideoGallery(mappedVideos);
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

  // Split gallery for non-overlapping marquee rows
  const midPoint = Math.ceil(photoGallery.length / 2);
  const row1Images = photoGallery.slice(0, midPoint);
  const row2Images = photoGallery.slice(midPoint);

  return (
    <main className="snap-container bg-academic-navy">
      {/* 1. Hero Section */}
      <section className="snap-section mesh-gradient flex items-center justify-center relative overflow-hidden">
        <ThreeBackground />
        
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-academic-gold text-xs font-black uppercase tracking-[0.4em] mb-8 shadow-2xl">
              <Award size={14} className="animate-pulse" />
              <span>Established 1997</span>
            </div>
            
            <h1 className="text-white mb-8 drop-shadow-2xl leading-[1.1] tracking-tight">
              Empowering Minds, <br />
              <span className="text-academic-gold text-glow italic">Building Futures</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
              Welcome to S.K. Degree & P.G. College – where academic excellence meets 
              holistic development in the heart of Vizianagaram.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                href="/admissions" 
                className="group relative px-10 py-5 bg-academic-gold text-academic-navy font-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply Online Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
              </Link>
              <Link 
                href="/academics" 
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all active:scale-95 shadow-xl"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Stats & Trust Section */}
      <section className="snap-section bg-white py-12 md:py-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Successful Students', value: '15,000+', icon: <Users className="text-blue-500" /> },
              { label: 'Academic Courses', value: '25+', icon: <BookOpen className="text-academic-gold" /> },
              { label: 'Expert Faculty', value: '80+', icon: <Award className="text-purple-500" /> },
              { label: 'Placement Partners', value: '120+', icon: <MapPin className="text-green-500" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-academic-navy mb-2">{stat.value}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section className="snap-section bg-slate-50 py-24 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <div className="text-academic-gold text-xs font-black uppercase tracking-[0.3em] mb-4">Why S.K. College?</div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-academic-navy mb-8 leading-tight">
                   Where Tradition Meets <br />
                   <span className="text-blue-600">Modern Education</span>
                </h2>
                <div className="space-y-6">
                   {[
                      { title: 'Industry-Aligned Curriculum', desc: 'Our courses are updated annually to match corporate demands.' },
                      { title: 'NCC & Defense Training', desc: 'Active Army and Naval wings building future leaders of the nation.' },
                      { title: 'State-of-the-art Labs', desc: 'Modern scientific and computer laboratories for practical learning.' }
                   ].map((feature, i) => (
                      <div key={i} className="flex gap-4 group">
                         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <CheckCircle2 size={20} />
                         </div>
                         <div>
                            <h4 className="font-bold text-academic-navy text-lg">{feature.title}</h4>
                            <p className="text-slate-500 text-sm">{feature.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
                <Link href="/about" className="inline-flex items-center gap-2 mt-10 text-academic-navy font-black border-b-2 border-academic-gold pb-1 hover:gap-4 transition-all group">
                   Learn More About Us <ArrowRight size={18} />
                </Link>
             </div>
             <div className="relative">
                <div className="aspect-square bg-academic-gold/20 rounded-[3rem] absolute -top-10 -right-10 w-full h-full -z-10 animate-pulse" />
                <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                   <Image src="https://images.unsplash.com/photo-1523050853064-8038a3ef6409?auto=format&fit=crop&q=80" alt="Students on Campus" fill className="object-cover" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Scroller */}
      <section className="bg-white py-12 border-y border-slate-100 overflow-hidden">
        <BrandScroller />
      </section>
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
          {/* Row 1: Sliding Left (Top Half of Gallery) */}
          <div className="relative flex overflow-hidden py-2">
            <div className="flex gap-6 animate-marquee [--duration:60s] [--gap:1.5rem] hover:[animation-play-state:paused]">
              {[...row1Images, ...row1Images, ...row1Images, ...row1Images].map((item, i) => (
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

          {/* Row 2: Sliding Right (Bottom Half of Gallery) */}
          <div className="relative flex overflow-hidden py-2">
            <div className="flex gap-6 animate-marquee-reverse [--duration:50s] [--gap:1.5rem] hover:[animation-play-state:paused]">
              {[...row2Images, ...row2Images, ...row2Images, ...row2Images].map((item, i) => (
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
