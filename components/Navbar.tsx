"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Notice Board', href: '/notices' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center">
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-medium transition-colors hover:text-academic-gold text-white"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-xl transition-all active:scale-90"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        className={`
          fixed inset-0 bg-academic-navy/98 backdrop-blur-xl z-[100] transition-all duration-500 md:hidden
          ${isOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-2">
                <Image src="/images/logo.jpeg" alt="Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-black text-white tracking-tight">S.K. COLLEGE</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  text-3xl font-black text-white hover:text-academic-gold transition-all
                  ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('open-search'));
              }}
              className={`
                flex items-center gap-4 text-3xl font-black text-academic-gold transition-all
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ transitionDelay: `${navLinks.length * 50}ms` }}
            >
              <Search size={32} />
              Search
            </button>
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10">
            <p className="text-academic-gold font-bold uppercase tracking-widest text-xs mb-4">Admissions 2026-27</p>
            <Link 
              href="/admissions"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 bg-academic-gold text-academic-navy text-center font-black rounded-2xl"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
