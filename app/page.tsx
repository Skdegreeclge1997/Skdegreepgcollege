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
      {/* ... previous sections ... */}
      <section className="snap-section mesh-gradient items-center justify-center relative overflow-hidden">
        {/* ... hero section content ... */}
      </section>

      {/* ... other sections ... */}

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
