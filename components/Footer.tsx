import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, MessageSquare, Globe, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-academic-navy text-slate-50 pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-academic-gold flex items-center justify-center">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="SK Degree College Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none">SK DEGREE</span>
                <span className="text-[10px] text-academic-gold uppercase font-bold tracking-widest mt-1">& P.G. COLLEGE</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-bold">
              College Code: 17950
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Part of MSN Institutions. Empowering students through academic excellence and holistic development.
            </p>
            <div className="flex space-x-4 pt-2">
              <MessageSquare aria-hidden="true" className="w-5 h-5 text-slate-400 hover:text-academic-gold cursor-pointer transition-colors" />
              <Globe aria-hidden="true" className="w-5 h-5 text-slate-400 hover:text-academic-gold cursor-pointer transition-colors" />
              <User aria-hidden="true" className="w-5 h-5 text-slate-400 hover:text-academic-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-academic-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/academics" className="hover:text-white transition-colors">Academic Programs</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link href="/notices" className="hover:text-white transition-colors">Notice Board</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-academic-gold">Student Portal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/results" className="hover:text-white transition-colors">Exam Results</Link></li>
              <li><Link href="/library" className="hover:text-white transition-colors">E-Library</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-academic-gold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-academic-gold shrink-0" />
                <span>Ayyannapeta Jn., Vizianagaram.</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-academic-gold shrink-0" />
                <span>+91 94412 53163, 94400 67143</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-academic-gold shrink-0" />
                <span>arunodayaes@yahoo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SK Degree & P.G. College (17950). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
