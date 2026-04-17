'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, GraduationCap, Briefcase } from 'lucide-react';
import { Faculty } from '@/lib/types';

interface FacultyCardProps {
  member: Faculty;
}

export default function FacultyCard({ member }: FacultyCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image Container with Premium Effects */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
        {/* Grayscale filter by default, color on hover */}
        <div className="w-full h-full relative transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0">
          <div className="absolute inset-0 bg-academic-navy/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // Since we don't have real images yet, we'll use a placeholder if it fails
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=003366&color=fff&size=512';
            }}
          />
        </div>

        {/* Hover Overlay Info */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-academic-navy/90 via-academic-navy/40 to-transparent">
          <div className="flex gap-4">
            <a 
              href={`mailto:${member.email}`} 
              className="w-10 h-10 rounded-full bg-academic-gold flex items-center justify-center text-academic-navy hover:bg-white transition-colors"
              title="Send Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 text-center relative">
        {/* Accent Border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-academic-gold rounded-full -mt-0.5" aria-hidden="true" />
        
        <h3 className="text-xl font-bold text-academic-navy mb-1 group-hover:text-academic-gold transition-colors">
          {member.name}
        </h3>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          {member.designation}
        </p>

        <div className="space-y-2 pt-4 border-t border-slate-50">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <GraduationCap size={14} className="text-academic-gold" aria-hidden="true" />
            <span className="font-medium">{member.qualification}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <Briefcase size={14} className="text-academic-gold" aria-hidden="true" />
            <span>{member.experience} Exp. | {member.department} Dept.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
