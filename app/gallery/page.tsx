"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GalleryView from '@/components/GalleryView';
import MotionSection, { TextReveal } from '@/components/motion/MotionSection';
import ParticleCanvas from '@/components/ParticleCanvas';
import { GalleryItem, GalleryVideo } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { Loader2, Camera, ImageIcon, PlayCircle } from 'lucide-react';
import YouTubeFacade from '@/components/YouTubeFacade';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const [imagesRes, videosRes] = await Promise.all([
        supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery_videos').select('*').order('created_at', { ascending: false })
      ]);
      
      if (!imagesRes.error && imagesRes.data) setImages(imagesRes.data);
      if (!videosRes.error && videosRes.data) setVideos(videosRes.data);
      
      setLoading(false);
    };

    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero with Particles */}
      <section className="relative bg-academic-navy pt-32 pb-24 text-center overflow-hidden">
        <ParticleCanvas className="opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <MotionSection delay={0.1}>
            <div className="flex items-center justify-center gap-2 text-academic-gold font-bold uppercase tracking-widest mb-4">
              <Camera size={20} />
              <span>Visual Journey</span>
            </div>
          </MotionSection>

          <TextReveal delay={0.2}>
            <h1 className="text-white mb-6">
              Campus <span className="text-academic-gold text-glow">Gallery</span>
            </h1>
          </TextReveal>

          <MotionSection delay={0.4}>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A visual journey through our academic facilities, specialized laboratories, 
              and the energetic spirit of our student community.
            </p>
          </MotionSection>

          {/* Floating photo count badge */}
          <MotionSection delay={0.6}>
            <motion.div
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 glass rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ImageIcon size={16} className="text-academic-gold" />
              <span className="text-sm font-bold text-white">{images.length} Photos & {videos.length} Videos</span>
            </motion.div>
          </MotionSection>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Photo Gallery Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-20 pb-16">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-academic-navy text-academic-gold rounded-2xl flex items-center justify-center shadow-lg">
              <ImageIcon size={24} />
           </div>
           <div>
              <h2 className="text-3xl font-black text-academic-navy tracking-tight">Photo Gallery</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Campus & Facilities</p>
           </div>
        </div>
        
        <MotionSection>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="text-academic-navy animate-spin" size={40} />
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Fetching Photos...</p>
              </div>
            ) : (
              <GalleryView items={images} />
            )}
          </div>
        </MotionSection>
      </section>

      {/* Video Gallery Section */}
      <section className="container mx-auto px-4 py-16 relative z-20">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-academic-navy text-academic-gold rounded-2xl flex items-center justify-center shadow-lg">
              <PlayCircle size={24} />
           </div>
           <div>
              <h2 className="text-3xl font-black text-academic-navy tracking-tight">Video Gallery</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Events & Activities</p>
           </div>
        </div>

        <MotionSection>
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-200">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="text-academic-navy animate-spin" size={40} />
              </div>
            ) : videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => {
                  const getYoutubeId = (url: string) => {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                    const match = url.match(regExp);
                    return (match && match[2].length === 11) ? match[2] : null;
                  };
                  const videoId = getYoutubeId(video.video_url);

                  return (
                    <motion.div 
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="group"
                    >
                      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-black group-hover:shadow-2xl transition-all duration-500">
                        {videoId ? (
                          <YouTubeFacade videoId={videoId} title={video.title} />
                        ) : (
                          <div className="flex items-center justify-center h-full text-white text-xs">Invalid Video</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                          <PlayCircle className="text-white opacity-50 group-hover:opacity-100" size={48} />
                        </div>
                      </div>
                      <h3 className="mt-4 font-black text-academic-navy text-lg leading-tight px-2">{video.title}</h3>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p className="font-bold">No videos available yet.</p>
              </div>
            )}
          </div>
        </MotionSection>
      </section>

      {/* Info Banner */}
      <section className="container mx-auto px-4 mt-24">
        <MotionSection delay={0.2}>
          <motion.div
            className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-12 text-center border border-slate-200 relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h2 className="text-2xl font-bold text-academic-navy mb-4">Want to see our campus in person?</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              We welcome prospective students and parents for campus tours. Visit us during 
              college hours for a guided walk-through of our facilities.
            </p>
            <div className="flex justify-center gap-4">
              <motion.a 
                href="/contact" 
                className="px-8 py-3 bg-academic-navy text-white font-bold rounded-full transition-all inline-block"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,51,102,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Visit
              </motion.a>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-academic-gold/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-academic-navy/5 blur-xl" />
          </motion.div>
        </MotionSection>
      </section>
    </main>
  );
}
