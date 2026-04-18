import React from 'react';
import { BookOpen, CheckCircle, Clock, FileText, HelpCircle, PhoneCall } from 'lucide-react';
import AdmissionsForm from '@/components/AdmissionsForm';

export const metadata = {
  title: 'Admissions 2026-27 | S.K. Degree & P.G. College',
  description: 'Apply online for the academic year 2026-27. Explore our admission process, eligibility criteria, and group options.',
};

const admissionSteps = [
  { icon: <PhoneCall />, title: "Inquiry", desc: "Submit the online inquiry form or visit the campus to discuss your interests." },
  { icon: <FileText />, title: "Documentation", desc: "Submit your Intermediate (10+2) certificates and other required documents." },
  { icon: <CheckCircle />, title: "Verification", desc: "Our academic committee reviews your eligibility and group selection." },
  { icon: <Clock />, title: "Enrollment", desc: "Complete the fee formalities and secure your seat in the desired program." }
];

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Premium Hero */}
      <section className="bg-academic-navy pt-32 pb-24 text-center text-white relative">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-white">
            Admissions <span className="text-academic-gold">2026-27</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards a bright career. Our admissions are 
            open for all Honours programs in Science, Commerce, and Arts.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Admissions Process (Left) */}
          <div className="lg:col-span-1 space-y-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-academic-navy mb-8 flex items-center gap-2">
                <BookOpen className="text-academic-gold" />
                The Process
              </h2>
              <div className="space-y-8">
                {admissionSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-academic-navy flex items-center justify-center shrink-0 group-hover:bg-academic-gold transition-colors">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-academic-navy p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Contact our admissions helpdesk for any queries regarding eligibility or documentation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <PhoneCall size={18} />
                  </div>
                  <span className="font-bold">+91 94412 53163</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <HelpCircle size={18} />
                  </div>
                  <span className="font-bold">FAQs & Help</span>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Inquiry Form (Right) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-academic-navy mb-2">Inquiry Form</h2>
                <p className="text-slate-500">Please fill out the details below and we will get back to you.</p>
              </div>
              <AdmissionsForm />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
