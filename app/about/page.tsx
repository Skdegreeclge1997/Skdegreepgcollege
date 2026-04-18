import React from 'react';
import Image from 'next/image';
import { Target, Eye, History, Award, Users, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'About Us | S.K. Degree & P.G. College',
  description: 'Learn about our history, mission, and the legacy of Arunodaya Educational Society at S.K. Degree & P.G. College.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" // Campus placeholder
            alt="College Campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-academic-navy/70 mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="mb-6">
            Excellence Since <span className="text-academic-gold italic">1995</span>
          </h1>
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 bg-academic-gold text-academic-navy font-bold rounded-lg text-sm uppercase tracking-widest">
              Arunodaya Educational Society
            </span>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Empowering minds and shaping futures through quality education 
            and ethical leadership for over three decades.
          </p>
        </div>
      </section>

      {/* Mission & Vision - Glassmorphism */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group p-10 bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-academic-navy/5 flex items-center justify-center text-academic-navy mb-8 group-hover:bg-academic-navy group-hover:text-white transition-all duration-500">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-bold text-academic-navy mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed text-balance">
                To provide accessible, high-quality higher education that fosters 
                intellectual growth, professional skills, and moral values among 
                students from all walks of life.
              </p>
            </div>

            <div className="group p-10 bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-academic-gold/10 flex items-center justify-center text-academic-gold mb-8 group-hover:bg-academic-gold group-hover:text-academic-navy transition-all duration-500">
                <Eye size={32} />
              </div>
              <h2 className="text-3xl font-bold text-academic-navy mb-6">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed text-balance">
                To be a premier institution of academic excellence, recognized 
                for producing socially responsible citizens who contribute 
                meaningfully to the global community.
              </p>
            </div>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-academic-gold/5 rounded-full blur-3xl -mr-48 -mt-48" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-academic-navy/5 rounded-full blur-3xl -ml-48 -mb-48" aria-hidden="true" />
      </section>

      {/* History / Timeline */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 text-academic-gold font-bold uppercase tracking-widest mb-4">
            <History size={20} aria-hidden="true" />
            <span>Our Journey</span>
          </div>
          <h2 className="text-4xl font-bold text-academic-navy mb-6">Legacy of Knowledge</h2>
          <p className="text-lg text-slate-600">
            From humble beginnings to a leading degree college, explore the 
            milestones that define our history.
          </p>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {[
            { year: '1995', title: 'Foundation', desc: 'S.K. Degree & P.G. College was founded by Sri M. Sanyasi Naidu under the Arunodaya Educational Society to provide quality education in Vizianagaram.', icon: <Award size={28} /> },
            { year: '2005', title: 'Science Wing Expansion', desc: 'Inaugurated state-of-the-art laboratories for Physics, Chemistry, and Zoology departments.', icon: <BookOpen size={28} /> },
            { year: '2015', title: 'NCC Excellence', desc: 'Established dedicated Army and Naval wings, producing defense leaders for the nation.', icon: <Users size={28} /> },
            { year: '2023', title: 'Digital Campus', desc: 'Implemented high-speed computing labs and smart classroom infrastructure.', icon: <Target size={28} /> }
          ].map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 text-center md:text-left">
                <span className="text-5xl font-black text-slate-100 mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-bold text-academic-navy mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              
              <div className="w-20 h-20 rounded-full bg-white border-4 border-academic-gold flex items-center justify-center text-academic-navy shadow-lg relative z-10 shrink-0">
                {item.icon}
                {i < 3 && <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-16 bg-slate-100 hidden md:block" aria-hidden="true" />}
              </div>
              
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-academic-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Students', value: '2500+' },
              { label: 'Faculty', value: '85+' },
              { label: 'Programs', value: '12' },
              { label: 'Years', value: '29' }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-academic-gold mb-2">{stat.value}</p>
                <p className="text-slate-400 uppercase tracking-widest text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
