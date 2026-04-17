"use client";

import React, { useState, useEffect } from 'react';
import GalleryView from '@/components/GalleryView';
import initialGalleryData from '@/lib/data/gallery.json';
import { GalleryItem } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        setItems(data);
      } else {
        setItems(initialGalleryData as GalleryItem[]);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header */}
      <section className="bg-academic-navy pt-32 pb-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Campus <span className="text-academic-gold">Gallery</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A visual journey through our academic facilities, specialized laboratories, 
            and the energetic spirit of our student community.
          </p>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-academic-gold/5 rounded-full blur-3xl -mr-48 -mt-48" />
      </section>

      {/* Gallery Content */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
               <Loader2 className="animate-spin text-academic-navy" size={40} />
               <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Fetching Campus Visuals...</p>
            </div>
          ) : (
            <GalleryView items={items} />
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="container mx-auto px-4 mt-24">
        <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-200">
          <h2 className="text-2xl font-bold text-academic-navy mb-4">Want to see our campus in person?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We welcome prospective students and parents for campus tours. Visit us during 
            college hours for a guided walk-through of our facilities.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/contact" 
              className="px-8 py-3 bg-academic-navy text-white font-bold rounded-full hover:bg-slate-800 transition-all"
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
