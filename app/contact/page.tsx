import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us | SK Degree & P.G. College',
  description: 'Get in touch with SK Degree & P.G. College, Vizianagaram. Find campus location, contact numbers, and email addresses.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <h1 className="text-5xl font-black text-academic-navy tracking-tight">Contact Us</h1>
            <p className="text-xl text-slate-500 font-medium">Have questions? We're here to help you build your future.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Contact Details */}
            <div className="lg:col-span-1 space-y-8">
               <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-8">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-academic-navy rounded-2xl flex items-center justify-center text-academic-gold shrink-0">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-academic-navy mb-1">Our Campus</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                           Ayyannapeta Jn., <br />
                           Vizianagaram, AP 535003
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-academic-navy rounded-2xl flex items-center justify-center text-academic-gold shrink-0">
                        <Phone size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-academic-navy mb-1">Call Us</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                           +91 94412 53163 <br />
                           +91 94400 67143
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-academic-navy rounded-2xl flex items-center justify-center text-academic-gold shrink-0">
                        <Mail size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-academic-navy mb-1">Email</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                           arunodayaes@yahoo.com
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-academic-navy rounded-2xl flex items-center justify-center text-academic-gold shrink-0">
                        <Clock size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-academic-navy mb-1">Office Hours</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                           Mon - Sat: 9:00 AM - 5:00 PM <br />
                           Sunday: Closed
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Google Maps & Form */}
            <div className="lg:col-span-2 space-y-8">
               <div className="w-full h-[400px] rounded-3xl overflow-hidden border-2 border-slate-100 shadow-xl relative group">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3791.954201389279!2d83.4158!3d18.1251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bee186368d49f%3A0x6d90a887034c5147!2sSK%20DEGREE%20COLLEGE!5e0!3m2!1sen!2sin!4v1713331200000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-white shadow-lg flex items-center gap-2 pointer-events-none">
                     <div className="w-2 h-2 rounded-full bg-red-500" />
                     <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Live Campus Location</span>
                  </div>
               </div>

               <div className="bg-academic-navy p-10 rounded-3xl text-white shadow-2xl">
                  <h2 className="text-2xl font-bold mb-6">Quick Message</h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-academic-gold transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-academic-gold transition-all" />
                     </div>
                     <div className="col-span-full space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-academic-gold transition-all" />
                     </div>
                     <button className="col-span-full py-4 bg-academic-gold text-academic-navy font-black rounded-xl hover:shadow-xl hover:shadow-academic-gold/20 transition-all flex items-center justify-center gap-2">
                        <Send size={18} />
                        Send Message
                     </button>
                  </form>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
