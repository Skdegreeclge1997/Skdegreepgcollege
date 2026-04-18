"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, Maximize2, ZoomIn } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GalleryViewProps {
  items: GalleryItem[];
}

const categories = ['All', 'Campus', 'Labs', 'NCC', 'Placements'];

export default function GalleryView({ items }: GalleryViewProps) {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className="space-y-12">
      {/* Category Tabs with animated indicator */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`relative px-6 py-2.5 rounded-full font-bold transition-colors duration-300 ${
              filter === cat 
                ? 'text-academic-navy' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter === cat && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-academic-gold rounded-full shadow-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        ))}
      </div>

      {/* Animated Grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isVideo = item.url.includes('youtube.com') || item.url.includes('youtu.be');
              const getYoutubeId = (url: string) => {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return (match && match[2].length === 11) ? match[2] : null;
              };
              const videoId = isVideo ? getYoutubeId(item.url) : null;
              const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : item.url;

              return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-md hover:shadow-2xl aspect-[4/3]"
                onClick={() => setSelectedImage(item)}
                whileHover={{ y: -4 }}
              >
                <img
                  src={thumbnailUrl}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-academic-navy/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                  <motion.div
                    className="hidden md:flex absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <ZoomIn className="text-white/80" size={18} />
                  </motion.div>
                  
                  <p className="text-white text-xs md:text-base font-bold leading-tight transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                    {item.caption}
                  </p>
                  <span className="text-academic-gold text-[8px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-2 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.category}
                  </span>
                </div>

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform shadow-2xl">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                )}

                {/* Gold accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-academic-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Lightbox Modal with Motion */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-academic-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <X size={32} />
            </motion.button>
            
            <motion.div
              className="relative w-full max-w-5xl aspect-video md:aspect-[16/10]"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.url.includes('youtube.com') || selectedImage.url.includes('youtu.be') ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${(() => {
                    const match = selectedImage.url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                    return match && match[2].length === 11 ? match[2] : '';
                  })()}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-2xl shadow-2xl bg-black"
                ></iframe>
              ) : (
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  fill
                  className="object-contain rounded-2xl"
                />
              )}
              <motion.div
                className="absolute -bottom-16 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white text-xl font-bold">{selectedImage.caption}</h3>
                <p className="text-academic-gold font-medium uppercase tracking-widest text-sm mt-2">
                  {selectedImage.category}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
