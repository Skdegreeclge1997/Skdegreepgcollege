"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';
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
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
              filter === cat 
                ? 'bg-academic-gold text-academic-navy shadow-lg' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            onClick={() => setSelectedImage(item)}
          >
            <Image
              src={item.url}
              alt={item.caption}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-academic-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <Maximize2 className="absolute top-4 right-4 text-white/70" size={20} />
              <p className="text-white font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.caption}
              </p>
              <span className="text-academic-gold text-xs font-bold uppercase tracking-widest mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-academic-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video md:aspect-[16/10]">
            <Image
              src={selectedImage.url}
              alt={selectedImage.caption}
              fill
              className="object-contain"
            />
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <h3 className="text-white text-xl font-bold">{selectedImage.caption}</h3>
              <p className="text-academic-gold font-medium uppercase tracking-widest text-sm mt-2">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
