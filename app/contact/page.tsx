"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MotionSection, { StaggerContainer, StaggerItem, TextReveal } from '@/components/motion/MotionSection';
import ParticleCanvas from '@/components/ParticleCanvas';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare, Loader2 } from 'lucide-react';
import { submitContactMessage } from '@/app/actions/inquiry';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Campus',
    lines: ['Ayyannapeta Jn.,', 'Vizianagaram, AP 535003'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 94412 53163', '+91 94400 67143'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['arunodayaes@yahoo.com'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon - Sat: 9:00 AM - 5:00 PM', 'Sunday: Closed'],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const result = await submitContactMessage(formData);
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Contact form error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-academic-navy pt-32 pb-24 overflow-hidden">
        <ParticleCanvas className="opacity-40" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <MotionSection delay={0.1}>
              <div className="flex items-center justify-center gap-2 text-academic-gold font-bold uppercase tracking-widest mb-4">
                <MessageSquare size={20} />
                <span>Get in Touch</span>
              </div>
            </MotionSection>

            <TextReveal delay={0.2}>
              <h1 className="text-white">
                Contact <span className="text-academic-gold text-glow">Us</span>
              </h1>
            </TextReveal>

            <MotionSection delay={0.4}>
              <p className="text-lg md:text-xl text-slate-400 font-medium">
                Have questions? We&apos;re here to help you build your future.
              </p>
            </MotionSection>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      <main className="container mx-auto px-4 md:px-6 -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-1">
            <MotionSection delay={0.1} direction="left">
              <StaggerContainer className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-8">
                {contactInfo.map((info, i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      className="flex gap-4 p-3 rounded-xl hover:bg-academic-gold/5 transition-colors cursor-default"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-academic-navy rounded-2xl flex items-center justify-center text-academic-gold shrink-0"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <info.icon size={24} />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-academic-navy mb-1">{info.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {info.lines.map((line, j) => (
                            <React.Fragment key={j}>
                              {line}
                              {j < info.lines.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </MotionSection>
          </div>

          {/* Google Maps & Form */}
          <div className="lg:col-span-2 space-y-8">
            <MotionSection delay={0.2}>
              <motion.div
                className="w-full h-[250px] rounded-3xl overflow-hidden border-2 border-slate-100 shadow-xl relative group"
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <iframe 
                  src="https://maps.google.com/maps?q=SK+Degree+College+Exam+Centre,+Vizianagaram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <motion.div
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-white shadow-lg flex items-center gap-2 pointer-events-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-red-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Live Campus Location</span>
                </motion.div>
              </motion.div>
            </MotionSection>

            <MotionSection delay={0.3}>
              <div className="bg-academic-navy p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                {/* Subtle particle effect in form */}
                <div className="absolute inset-0 opacity-20">
                  <ParticleCanvas particleCount={20} />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6">Quick Message</h2>
                  
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-green-500/20 border border-green-500/30 p-8 rounded-2xl text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                        >
                          <CheckCircle2 className="mx-auto mb-4 text-green-400" size={48} />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-sm text-slate-300">We have received your inquiry and will get back to you soon.</p>
                        <motion.button
                          onClick={() => setStatus('idle')}
                          className="mt-6 px-6 py-2 bg-white text-academic-navy font-bold rounded-lg text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Send Another
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Name</label>
                          <motion.input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-academic-gold transition-all"
                            animate={{
                              borderColor: focusedField === 'name' ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                              boxShadow: focusedField === 'name' ? '0 0 20px rgba(212,175,55,0.1)' : '0 0 0px transparent',
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                          <motion.input 
                            required
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="yourname@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-academic-gold transition-all"
                            animate={{
                              borderColor: focusedField === 'email' ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                              boxShadow: focusedField === 'email' ? '0 0 20px rgba(212,175,55,0.1)' : '0 0 0px transparent',
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mobile Number</label>
                          <motion.input 
                            required
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="10-digit number"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-academic-gold transition-all"
                            animate={{
                              borderColor: focusedField === 'phone' ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                              boxShadow: focusedField === 'phone' ? '0 0 20px rgba(212,175,55,0.1)' : '0 0 0px transparent',
                            }}
                          />
                        </div>
                        <div className="col-span-full space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                          <motion.textarea 
                            required
                            rows={4} 
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-academic-gold transition-all"
                            animate={{
                              borderColor: focusedField === 'message' ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                              boxShadow: focusedField === 'message' ? '0 0 20px rgba(212,175,55,0.1)' : '0 0 0px transparent',
                            }}
                          />
                        </div>

                        <AnimatePresence>
                          {errorMsg && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="col-span-full flex items-center gap-2 text-red-400 text-xs font-bold"
                            >
                              <AlertCircle size={14} />
                              {errorMsg}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.button 
                          disabled={status === 'loading'}
                          className="col-span-full py-4 bg-academic-gold text-academic-navy font-black rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                          whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(212,175,55,0.3)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {status === 'loading' ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Loader2 size={18} />
                            </motion.div>
                          ) : (
                            <>
                              <Send size={18} />
                              Send Message
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </main>
    </div>
  );
}


