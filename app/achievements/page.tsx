import React from 'react';
import { Award, Briefcase, Ship, ShieldCheck, Target } from 'lucide-react';
import placementsData from '@/lib/data/placements.json';

export const metadata = {
  title: 'Placements & NCC Achievements | S.K. Degree & P.G. College',
  description: 'Celebrating our student success stories in corporate placements and NCC defense training.',
};

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-academic-navy pt-32 pb-24 text-center text-white relative">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Legacy of <span className="text-academic-gold">Success</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            At S.K. Degree & P.G. College, we measure our success by the achievements 
            of our students in the corporate world and their service to the nation.
          </p>
        </div>
      </section>

      {/* Placements Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <Briefcase size={16} />
              <span>Career Excellence</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-academic-navy mb-6">
              123+ Candidates Placed <br /> in Top MNCs
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our dedicated placement cell works tirelessly to bridge the gap between 
              academia and industry. Through regular CRT (Campus Recruitment Training) 
              sessions, we ensure our students are industry-ready.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-academic-gold mb-1">95%</p>
                <p className="text-sm font-bold text-slate-500 uppercase">Placement Rate</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-academic-gold mb-1">6 LPA</p>
                <p className="text-sm font-bold text-slate-500 uppercase">Highest Package</p>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {placementsData.map((company) => (
              <div key={company.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center hover:shadow-xl transition-all group">
                <div className="relative w-full aspect-[3/2] opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                  {/* Since I don't have actual SVG files, I'll use a stylized text for now to avoid broken images */}
                   <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-black text-academic-navy">{company.name}</span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{company.industry}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NCC Section */}
      <section className="py-24 bg-academic-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-academic-gold/20 text-academic-gold rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-academic-gold/30">
              <ShieldCheck size={16} />
              <span>Nation First</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">NCC Excellence</h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Our NCC wings are the pride of Vizianagaram, consistently producing 
              disciplined leaders for the Indian Armed Forces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Army Wing */}
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-academic-gold/50 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-green-600/20 text-green-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Army Wing</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Led by <strong>Sri V. Sanyasi Naidu (ANO Army)</strong>, the Army wing 
                focuses on developing character, discipline, and a secular outlook 
                among the youth.
              </p>
              <ul className="space-y-4">
                {['B & C Certificate Training', 'Agniveer Selection Prep', 'Annual Training Camps (ATC)', 'Community Service Initiatives'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-academic-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Naval Wing */}
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-academic-gold/50 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Ship size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Naval Wing</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Led by <strong>Sri M. Vishnu Sankar (ANO Navel)</strong>, our Naval wing 
                provides unique maritime training and opportunities to join the Indian Navy.
              </p>
              <ul className="space-y-4">
                {['Boat Pulling & Sailing', 'Naval RDC Parade Prep', 'Specialized Ship Modeling', 'Sea Training Camps'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-academic-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Special Highlight */}
          <div className="mt-20 p-12 bg-academic-gold rounded-3xl text-academic-navy text-center">
            <Award size={48} className="mx-auto mb-6" />
            <h3 className="text-3xl font-black mb-4">RDC Parade Honors</h3>
            <p className="text-xl font-medium max-w-2xl mx-auto opacity-80">
              Our cadets have represented the college at the Republic Day Camp (RDC) in New Delhi, 
              securing top honors among all colleges in the region.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-academic-navy mb-8">Ready to Start Your Success Story?</h2>
        <div className="flex justify-center gap-6">
          <a href="/admissions" className="px-10 py-4 bg-academic-gold text-academic-navy font-bold rounded-full hover:shadow-xl transition-all">
            Join S.K. College
          </a>
          <a href="/faculty" className="px-10 py-4 bg-white text-academic-navy border border-slate-200 font-bold rounded-full hover:bg-slate-50 transition-all">
            Meet Mentors
          </a>
        </div>
      </section>
    </main>
  );
}
