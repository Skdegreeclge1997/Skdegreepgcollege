"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GalleryView from '@/components/GalleryView';
import MotionSection, { TextReveal } from '@/components/motion/MotionSection';
import ParticleCanvas from '@/components/ParticleCanvas';
import { GalleryItem } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { Loader2, Camera, ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setItems(data);
      }
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
              <span className="text-sm font-bold text-white">{items.length || '...'} Photos</span>
            </motion.div>
          </MotionSection>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Gallery Content */}
      <section className="container mx-auto px-4 -mt-8 relative z-20 pb-24">
        <MotionSection>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="text-academic-navy" size={40} />
                </motion.div>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Fetching Campus Visuals...</p>
              </div>
            ) : (
              <GalleryView items={items} />
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
