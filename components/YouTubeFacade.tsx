'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
}

export default function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      ></iframe>
    );
  }

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-pointer group"
      onClick={() => setIsLoaded(true)}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 bg-academic-gold rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
          <Play size={32} className="text-academic-navy fill-academic-navy ml-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-xs font-bold truncate">{title}</p>
      </div>
    </div>
  );
}
