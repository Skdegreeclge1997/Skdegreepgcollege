import React from 'react';
import { Scale, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Scale size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
              <p className="text-slate-500">Last Updated: April 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen size={20} className="text-indigo-600" />
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using the S.K. Degree & P.G. College website, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle size={20} className="text-indigo-600" />
                2. Use of Content
              </h2>
              <p className="text-slate-600 leading-relaxed">
                All content provided on this website, including text, graphics, logos, and academic notices, is the property of S.K. Degree & P.G. College. You may view and download content for personal, non-commercial educational use only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <AlertCircle size={20} className="text-indigo-600" />
                3. User Conduct
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Users are prohibited from:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Providing false information in admission inquiry forms.</li>
                <li>Attempting to bypass security measures or access restricted administrative panels.</li>
                <li>Using the website to distribute spam or malicious content.</li>
                <li>Interfering with the website&apos;s performance or accessibility for other users.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Scale size={20} className="text-indigo-600" />
                4. Disclaimer
              </h2>
              <p className="text-slate-600 leading-relaxed">
                While we strive for accuracy, the information on this website (including fees and schedules) is subject to change without notice. Official notices posted on the college physical notice board take precedence over website content in case of discrepancies.
              </p>
            </section>

            <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Governing Law</h2>
              <p className="text-slate-600">
                These terms are governed by the laws of India and the jurisdiction of the courts in Andhra Pradesh.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
