import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500">Last Updated: April 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                1. Information We Collect
              </h2>
              <p className="text-slate-600 leading-relaxed">
                S.K. Degree & P.G. College collects information that you provide directly to us through our online admission inquiry forms. This includes your name, email address, phone number, and academic interests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Eye size={20} className="text-blue-600" />
                2. How We Use Your Information
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Process your admission inquiries and applications.</li>
                <li>Communicate with you about college news, events, and updates.</li>
                <li>Improve our website and educational services.</li>
                <li>Comply with legal and educational regulatory requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Lock size={20} className="text-blue-600" />
                3. Data Protection
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We implement industry-standard security measures (SSL Encryption) to protect your personal information. Access to student data is restricted to authorized administrative staff only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                4. Third-Party Sharing
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted partners who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Contact Us</h2>
              <p className="text-slate-600">
                If you have any questions regarding this privacy policy, you may contact the college administration at:
                <br />
                <strong>Email:</strong> admin@skdegreecollege.com
                <br />
                <strong>Address:</strong> Vizianagaram, Andhra Pradesh, India
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
