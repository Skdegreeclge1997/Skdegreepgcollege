"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
    <nav className="flex items-center justify-between w-full px-4 py-4 md:px-8">
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
        <div className="relative group">
          <Search aria-hidden="true" className="w-5 h-5 text-white/70 group-hover:text-academic-gold cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center space-x-4">
        <button className="text-white p-1" aria-label="Search">
          <Search aria-hidden="true" className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-academic-gold rounded-md"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {isOpen ? <X aria-hidden="true" className="w-6 h-6" /> : <Menu aria-hidden="true" className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 top-[72px] bg-academic-navy/95 backdrop-blur-lg z-50 flex flex-col p-6 space-y-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-300"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-white hover:text-academic-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
