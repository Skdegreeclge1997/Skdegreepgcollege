"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, ExternalLink, Calendar, Bell, Pin } from 'lucide-react';
import NoticeCard from './NoticeCard';
import { Notice } from '@/lib/types';
import Image from 'next/image';

interface NoticeViewerProps {
  notices: Notice[];
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function NoticeViewer({ notices, title, subtitle, icon }: NoticeViewerProps) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const found = notices.find(n => n.id === hash);
        if (found) setSelectedNotice(found);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [notices]);

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
  };

  const handleClose = () => {
    setSelectedNotice(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-academic-navy rounded-xl flex items-center justify-center text-academic-gold shadow-lg shadow-academic-navy/10">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-black text-academic-navy leading-none">{title}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>
          </div>
        </div>
        <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
          {notices.length} Items
        </span>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <NoticeCard notice={notice} onClick={handleNoticeClick} />
          </div>
        ))}
        {notices.length === 0 && (
          <div className="p-10 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold italic">
            No recent notices in this category.
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-academic-navy/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-academic-navy p-6 md:p-8 text-white shrink-0">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-academic-gold text-academic-navy rounded-full">
                        {selectedNotice.category}
                      </span>
                      {selectedNotice.is_pinned && (
                        <div className="flex items-center gap-1.5 text-academic-gold text-[10px] font-black uppercase tracking-widest">
                          <Pin size={12} fill="currentColor" />
                          Pinned Notice
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">
                      {selectedNotice.title}
                    </h2>
                    <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(selectedNotice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bell size={14} />
                        Official Announcement
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-white group active:scale-90"
                  >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left: Content Text */}
                  <div className={selectedNotice.image_url ? 'lg:col-span-7' : 'lg:col-span-12'}>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                        {selectedNotice.content}
                      </p>
                    </div>

                    {/* Attachments Section */}
                    {(selectedNotice.pdf_url || selectedNotice.image_url) && (
                      <div className="mt-12 space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Official Documents</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedNotice.pdf_url && (
                            <a 
                              href={selectedNotice.pdf_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-5 bg-emerald-50 border border-emerald-100 rounded-2xl group hover:bg-emerald-600 transition-all duration-300"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                  <FileText size={24} />
                                </div>
                                <div>
                                  <p className="text-xs font-black text-emerald-600 group-hover:text-white uppercase tracking-widest">Document File</p>
                                  <p className="text-sm font-bold text-slate-700 group-hover:text-white/90">Admission Form / PDF</p>
                                </div>
                              </div>
                              <Download className="text-emerald-400 group-hover:text-white" size={20} />
                            </a>
                          )}
                          
                          {selectedNotice.image_url && (
                            <a 
                              href={selectedNotice.image_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-5 bg-academic-gold/10 border border-academic-gold/20 rounded-2xl group hover:bg-academic-gold transition-all duration-300"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-academic-gold shadow-sm group-hover:scale-110 transition-transform">
                                  <ExternalLink size={24} />
                                </div>
                                <div>
                                  <p className="text-xs font-black text-academic-gold group-hover:text-white uppercase tracking-widest">Visual Notice</p>
                                  <p className="text-sm font-bold text-slate-700 group-hover:text-white/90">View Full Image</p>
                                </div>
                              </div>
                              <Download className="text-academic-gold/50 group-hover:text-white" size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Image Preview (if exists) */}
                  {selectedNotice.image_url && (
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border-8 border-slate-100 shadow-2xl group">
                        <Image 
                          src={selectedNotice.image_url} 
                          alt={selectedNotice.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <a 
                            href={selectedNotice.image_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-4 bg-white text-academic-navy rounded-full shadow-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                          >
                            <ExternalLink size={24} />
                          </a>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                        Click image to view in full resolution
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  © 2026 S.K. Degree & P.G. College • Vizianagaram
                </p>
                <button 
                  onClick={handleClose}
                  className="px-8 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-academic-navy/20"
                >
                  Close Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
