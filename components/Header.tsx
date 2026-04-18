"use client";

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SearchModal from './SearchModal';
import { Search } from 'lucide-react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();

  // Keyboard shortcut for search (Cmd+K or Ctrl+K) & Custom Event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    const handleOpenSearch = () => setIsSearchOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search', handleOpenSearch);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search', handleOpenSearch);
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-academic-navy/90 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white border-2 border-academic-gold transition-transform group-hover:scale-110">
            <Image 
              src="/images/logo.jpeg" 
              alt="S.K. Degree College Logo" 
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white leading-none">S.K. DEGREE</span>
            <span className="text-[10px] font-bold text-academic-gold tracking-[0.2em] uppercase"> & P.G. COLLEGE</span>
          </div>
        </Link>
        
        {/* Navigation & Actions */}
        <div className="flex items-center gap-8">
          <Navbar />
          
          <div className="hidden lg:flex items-center gap-4 pl-8 border-l border-white/10">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white/70 hover:text-academic-gold transition-colors relative group"
              aria-label="Search"
            >
              <Search size={20} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-academic-navy text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                Search (⌘K)
              </span>
            </button>
            
            <Link 
              href="/admin/login" 
              className="px-6 py-2 bg-academic-gold text-academic-navy text-sm font-bold rounded-full hover:shadow-xl hover:shadow-academic-gold/20 transition-all"
            >
              Admin Console
            </Link>
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
