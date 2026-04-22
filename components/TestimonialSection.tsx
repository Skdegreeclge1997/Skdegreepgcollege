"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Army officier· B.A. Batch 2014",
    initials: "RK",
    content: "SK College gave me not just a degree but the confidence to chase bigger dreams. The faculty truly invests in each student. I'm now an Army officer and I owe this foundation to SK."
  },
  {
    name: "Priya Sharma",
    role: "Software Engineer, TCS · BCA Batch 2020",
    initials: "PS",
    content: "The placement cell at SK was phenomenal. Within weeks of my final exam I had three job offers. The mock interviews and industry visits made all the difference in my career."
  },
  {
    name: "Arjun Verma",
    role: "Indian Air Force Officer · B.Sc. Batch 2017",
    initials: "AV",
    content: "NCC at SK was a life-changing experience. Discipline, teamwork, leadership — I carried everything I learnt into the Army. Proudest cadet of the SK Air Wing battalion."
  }
];

export default function TestimonialSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testi, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="testimonial-card"
        >
          <div className="flex gap-1 mb-4 text-academic-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <p className="text-slate-600 font-medium italic mb-8 relative z-10 leading-relaxed">
            {testi.content}
          </p>
          <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
            <div className="w-12 h-12 bg-academic-navy text-academic-gold rounded-full flex items-center justify-center font-display font-bold text-lg shadow-inner">
              {testi.initials}
            </div>
            <div>
              <h4 className="text-academic-navy font-bold text-sm">{testi.name}</h4>
              <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">{testi.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
