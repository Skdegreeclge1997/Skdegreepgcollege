'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, GraduationCap, Briefcase } from 'lucide-react';
import { Faculty } from '@/lib/types';

interface FacultyCardProps {
  member: Faculty;
}

export default function FacultyCard({ member }: FacultyCardProps) {
  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Image Container - Square Aspect Ratio Edge-to-Edge */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-200">
        <div className="w-full h-full relative transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 bg-academic-navy/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <Image
            src={member.image || member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=003366&color=fff&size=512`}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=003366&color=fff&size=512';
            }}
          />
        </div>

        {/* Floating Email Button over the image */}
        <div className="absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <a 
            href={`mailto:${member.email}`} 
            className="w-10 h-10 rounded-full bg-academic-gold flex items-center justify-center text-academic-navy hover:bg-white shadow-lg transition-colors"
            title="Send Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 py-6 text-center relative flex-1 flex flex-col z-10 bg-white">
        <h3 className="text-xl font-bold text-academic-navy mb-1 group-hover:text-academic-gold transition-colors">
          {member.name}
        </h3>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          {member.designation}
        </p>

        <div className="space-y-2 pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <GraduationCap size={14} className="text-academic-gold" aria-hidden="true" />
            <span className="font-medium line-clamp-1">{member.qualification}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <Briefcase size={14} className="text-academic-gold" aria-hidden="true" />
            <span className="line-clamp-1">{member.experience} Exp. | {member.department}</span>
          </div>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-academic-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
    </motion.div>
  );
}
