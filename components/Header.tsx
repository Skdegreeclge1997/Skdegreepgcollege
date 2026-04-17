import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full glass bg-academic-navy/90 border-b border-white/10">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-academic-gold rounded-full flex items-center justify-center text-academic-navy font-bold text-xl shadow-lg">
            SK
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">SK DEGREE</span>
            <span className="text-xs font-medium text-academic-gold tracking-[0.2em] uppercase">College</span>
          </div>
        </div>
        
        <Navbar />
      </div>
    </header>
  );
}
