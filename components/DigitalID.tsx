"use client";

import React from 'react';
import Image from 'next/image';
import { QrCode, ShieldCheck } from 'lucide-react';

interface DigitalIDProps {
  student: {
    name: string;
    id: string;
    course: string;
    batch: string;
    photo?: string;
  };
}

export default function DigitalID({ student }: DigitalIDProps) {
  return (
    <div className="relative group w-full max-w-sm mx-auto">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-academic-gold to-academic-navy rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Top Header */}
        <div className="bg-academic-navy p-6 flex items-center justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <h3 className="text-lg font-bold leading-tight">SK DEGREE & <br />P.G. COLLEGE</h3>
            <p className="text-[10px] uppercase tracking-widest text-academic-gold font-bold mt-1">Student Identity Card</p>
          </div>
          <div className="relative w-12 h-12 bg-white rounded-full overflow-hidden border border-white/20 z-10">
            <Image 
              src="/images/logo.jpeg" 
              alt="Logo" 
              fill
              className="object-contain p-0.5"
            />
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-academic-gold/10 rounded-full -mr-16 -mt-16" />
        </div>

        {/* Card Content */}
        <div className="p-8 flex flex-col items-center text-center">
          {/* Photo Placeholder */}
          <div className="w-32 h-40 bg-slate-100 rounded-xl mb-6 relative border-4 border-slate-50 shadow-inner overflow-hidden flex items-center justify-center">
             <div className="text-slate-300 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-200 mb-2" />
                <div className="w-20 h-4 bg-slate-200 rounded" />
             </div>
             {/* Authentic Stamp */}
             <div className="absolute -bottom-2 -right-2 bg-academic-gold/90 text-academic-navy p-2 rounded-full shadow-lg rotate-12">
                <ShieldCheck size={16} />
             </div>
          </div>

          <div className="space-y-1 mb-8">
            <h4 className="text-2xl font-black text-academic-navy uppercase tracking-tight">{student.name}</h4>
            <p className="text-sm font-bold text-academic-gold uppercase tracking-widest">{student.course}</p>
          </div>

          {/* Details Grid */}
          <div className="w-full grid grid-cols-2 gap-4 text-left border-t border-slate-100 pt-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student ID</p>
              <p className="text-sm font-black text-academic-navy">{student.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valid Thru</p>
              <p className="text-sm font-black text-academic-navy">MAY 2027</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batch</p>
              <p className="text-sm font-black text-academic-navy">{student.batch}</p>
            </div>
            <div className="flex justify-end">
              <QrCode size={40} className="text-academic-navy opacity-20" />
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Secure Digital ID</span>
        </div>
      </div>
    </div>
  );
}
