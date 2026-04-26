'use client';

import Image from 'next/image';

export const metadata = {
  title: 'About Us | S.K. Degree & P.G. College',
  description: 'Detailed information about S.K. Degree & P.G. College, its campus, infrastructure, and academic excellence.',
};

const leadershipTeam = [
  {
    name: 'Sri. K. Srinivasa Rao',
    designation: 'Founder & President',
    organization: 'Arunodaya Educational Society',
    qualification: 'M.A., Ph.D. (Education)',
    image: '/images/founder.jpg',
    initials: 'KS',
    message:
      'Our vision is to cultivate a generation of thinkers, innovators, and leaders rooted in values and empowered by knowledge.',
    color: '#1a3a5c',
  },
  {
    name: 'Dr. V. Lakshmi Devi',
    designation: 'Principal',
    organization: 'S.K. Degree & P.G. College',
    qualification: 'M.Sc., M.Phil., Ph.D.',
    image: '/images/principal.jpg',
    initials: 'VL',
    message:
      'We nurture every student with academic rigor and personal guidance, preparing them for a dynamic and competitive world.',
    color: '#7c4a03',
  },
];

const highlights = [
  { icon: '🌿', label: 'Eco-friendly Green Campus' },
  { icon: '🔬', label: 'State-of-the-art Science Laboratories' },
  { icon: '💻', label: 'Modern Computing Facilities' },
  { icon: '📚', label: 'Well-stocked Central Library' },
  { icon: '🏆', label: 'Record Placement Track Record' },
  { icon: '👨‍🏫', label: 'Experienced & Trained Faculty' },
  { icon: '🎯', label: 'Campus Placement Training' },
  { icon: '🎗️', label: 'Active NCC & NSS Units' },
  { icon: '🛠️', label: 'Project & Activity Clubs' },
  { icon: '🍽️', label: 'Hygienic Canteen Facilities' },
  { icon: '🚌', label: 'Transportation Facility Available' },
  { icon: '🗣️', label: 'Regular Career Guidance Seminars' },
];

const infrastructure = [
  {
    no: '01',
    name: 'Main Academic Block',
    dept: 'Administrative Office, Admission Cell, Principal\'s Office',
    icon: '🏛️',
  },
  {
    no: '02',
    name: 'Science Block',
    dept: 'Physics, Chemistry, Botany, and Zoology Labs',
    icon: '🔭',
  },
  {
    no: '03',
    name: 'Commerce & Arts Wing',
    dept: 'Commerce, Arts, and Management Classrooms',
    icon: '📊',
  },
  {
    no: '04',
    name: 'Computer Lab Block',
    dept: 'IT & Computer Science Laboratories, Digital Library',
    icon: '🖥️',
  },
];

const stats = [
  { value: '1995', label: 'Est. Year' },
  { value: '2000+', label: 'Alumni' },
  { value: '50+', label: 'Faculty' },
  { value: '20+', label: 'Courses' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] pt-28 pb-24 relative overflow-hidden">

      {/* ── Watermark ── */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 opacity-[0.05]">
        <Image src="/images/logo.jpeg" alt="Watermark" width={900} height={900} className="w-full max-w-3xl object-contain" priority />
      </div>

      {/* ── Decorative top rule ── */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1a3a5c] via-[#c9a84c] to-[#1a3a5c] fixed top-0 z-50" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10 space-y-24">

        {/* ════════════════════════════════════
            HERO / OVERVIEW
        ════════════════════════════════════ */}
        <section className="text-center pt-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c9a84c] font-semibold mb-3">
            Vizianagaram · Andhra Pradesh · Est. 1995
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a3a5c] leading-tight mb-6 font-serif">
            S.K. Degree &amp; P.G. College
          </h1>
          <div className="w-16 h-[3px] bg-[#c9a84c] mx-auto mb-8 rounded-full" />
          <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto text-lg mb-10">
            Nestled in a serene, eco-friendly environment, our institution has been shaping
            futures since 1995 — blending academic rigour with holistic development to produce
            graduates ready for a dynamic world.
          </p>

          {/* Stat bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-2xl py-5 px-4 shadow-sm">
                <p className="text-3xl font-extrabold text-[#1a3a5c] font-serif">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            LEGACY
        ════════════════════════════════════ */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-3">Our Legacy</span>
            <h2 className="text-3xl font-bold text-[#1a3a5c] font-serif mb-5 leading-snug">
              Three Decades of<br />Academic Excellence
            </h2>
            <div className="w-10 h-[2px] bg-[#c9a84c] mb-6" />
            <p className="text-slate-600 leading-relaxed mb-4">
              The dreams of our founding fathers took shape in <strong>1995</strong> with the establishment of
              S.K. Degree &amp; P.G. College under the aegis of the <strong>Arunodaya Educational Society</strong>.
              Over three decades, we have grown into a premier institution permanently affiliated to the
              university and backed by all necessary government recognitions.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We offer a broad spectrum of undergraduate and postgraduate programmes in Science, Commerce,
              and Management — supported by state-of-the-art laboratories, a well-stocked library, and
              among the finest computing infrastructure in the district.
            </p>
          </div>
          {/* Decorative card */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-[#c9a84c]/30" />
            <div className="bg-[#1a3a5c] rounded-2xl p-8 text-white relative z-10">
              <p className="text-4xl font-extrabold font-serif text-[#c9a84c] mb-2">30+</p>
              <p className="uppercase tracking-widest text-xs text-blue-200 mb-6">Years of Trust</p>
              <ul className="space-y-3 text-sm text-blue-100">
                {['Permanently University Affiliated', 'Govt. of Andhra Pradesh Approved', 'UGC Recognised Institution', 'NAAC Assessed College'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            LEADERSHIP — FOUNDER & PRINCIPAL
        ════════════════════════════════════ */}
        <section>
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-3">Leadership</span>
            <h2 className="text-3xl font-bold text-[#1a3a5c] font-serif mb-4">
              The Faces Behind Our Vision
            </h2>
            <div className="w-12 h-[2px] bg-[#c9a84c] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leadershipTeam.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
              >
                {/* Top accent strip */}
                <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${person.color}, #c9a84c)` }} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-5 mb-6">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white flex-shrink-0 relative overflow-hidden"
                      style={{ background: person.color }}
                    >
                      {/* Try to load real image, fallback to initials */}
                      <span className="z-10 select-none">{person.initials}</span>
                      {/* Uncomment below & remove span if real photos are available */}
                      {/* <Image src={person.image} alt={person.name} fill className="object-cover object-top" /> */}
                    </div>
                    <div>
                      <p className="text-[#1a3a5c] font-bold text-lg font-serif leading-tight">{person.name}</p>
                      <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-wide mt-0.5">{person.designation}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{person.organization}</p>
                    </div>
                  </div>

                  {/* Qualification badge */}
                  <div className="inline-flex items-center gap-2 bg-[#f7f5f0] rounded-lg px-3 py-1.5 mb-5 self-start">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Qualification</span>
                    <span className="text-xs text-[#1a3a5c] font-semibold">{person.qualification}</span>
                  </div>

                  {/* Message quote */}
                  <blockquote className="border-l-4 border-[#c9a84c] pl-4 mt-auto">
                    <p className="text-slate-600 italic text-sm leading-relaxed">&ldquo;{person.message}&rdquo;</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            CAMPUS INFRASTRUCTURE
        ════════════════════════════════════ */}
        <section>
          <div className="text-center mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-3">Facilities</span>
            <h2 className="text-3xl font-bold text-[#1a3a5c] font-serif mb-4">Campus Infrastructure</h2>
            <div className="w-12 h-[2px] bg-[#c9a84c] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {infrastructure.map((block) => (
              <div
                key={block.no}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-5 items-start hover:shadow-md transition-shadow"
              >
                <div className="text-3xl leading-none flex-shrink-0">{block.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] text-[#c9a84c] font-bold tracking-widest">{block.no}</span>
                    <p className="text-[#1a3a5c] font-bold text-base font-serif">{block.name}</p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{block.dept}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            SPECIAL HIGHLIGHTS
        ════════════════════════════════════ */}
        <section className="bg-[#1a3a5c] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border-2 border-[#c9a84c]/20" />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full border-2 border-[#c9a84c]/10" />

          <div className="relative z-10">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-3">Why S.K. College</span>
            <h2 className="text-3xl font-bold font-serif mb-8 text-white">What Makes Us Special</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                  <span className="text-lg">{h.icon}</span>
                  <span className="text-sm text-blue-100">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            APPROVALS
        ════════════════════════════════════ */}
        <section className="text-center">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-3">Accreditations</span>
          <h2 className="text-3xl font-bold text-[#1a3a5c] font-serif mb-4">Approvals &amp; Recognitions</h2>
          <div className="w-12 h-[2px] bg-[#c9a84c] mx-auto mb-8" />
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-base">
            The college is approved by the <strong>Government of Andhra Pradesh</strong> and permanently affiliated
            to the University. We maintain rigorous academic standards and are widely recognised for our
            contribution to the educational landscape of Vizianagaram district.
          </p>
        </section>

      </div>
    </main>
  );
}
