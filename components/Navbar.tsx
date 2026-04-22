"use client";

import React from 'react';
import Link from 'next/link';

import { Search } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Events', href: '/news' },
  { name: 'Notice Board', href: '/notices' },
  { name: 'Contact', href: '/contact' },
];

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  return (
    <nav className="flex items-center">
      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-[13px] font-bold tracking-tight transition-colors hover:text-academic-gold text-white whitespace-nowrap"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        className={`
          fixed inset-0 bg-academic-navy z-[100] transition-all duration-500 md:hidden
          ${isOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  text-xl font-bold text-white hover:text-academic-gold transition-all
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
                flex items-center gap-4 text-xl font-bold text-academic-gold transition-all
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
