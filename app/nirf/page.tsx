import { supabase } from '@/lib/supabase';
import { FileText, ExternalLink, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default async function NirfPage() {
  const { data: documents, error } = await supabase
    .from('nirf_documents')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching NIRF documents:', error);
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-display font-black text-academic-navy tracking-tight">
              NIRF <span className="text-academic-gold">Rankings</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-slate-700">
              National Institutional Ranking Framework
            </h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-3xl mx-auto">
              S.K. Degree & P.G. College participates in the National Institutional Ranking Framework (NIRF) — an initiative by the Ministry of Education, Government of India, to rank higher education institutions across the country.
            </p>
            
            <a 
              href="https://www.nirfindia.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-academic-navy text-white px-8 py-4 rounded-full font-bold hover:bg-academic-gold transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Visit Official NIRF Website
              <ExternalLink size={20} />
            </a>
          </div>

          {/* What is NIRF Section */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-3xl font-display font-black text-academic-navy mb-6">What is NIRF?</h3>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                The National Institutional Ranking Framework (NIRF) was launched on 29th September 2015 by the Ministry of Education, Government of India. It ranks colleges and universities across the country based on five key parameters — Teaching & Learning Resources, Research & Professional Practice, Graduation Outcomes, Outreach & Inclusivity, and Perception.
              </p>
              <p>
                Participation in NIRF reflects our institution&apos;s commitment to transparency, accountability, and continuous improvement in the quality of education we provide to our students.
              </p>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-academic-gold rounded-full"></div>
              <h3 className="text-3xl font-display font-black text-academic-navy">NIRF Data & Reports</h3>
            </div>

            {documents && documents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-start gap-5 mb-6 flex-grow">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-academic-gold shadow-sm shrink-0">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-bold bg-slate-100 inline-block px-3 py-1 rounded-full uppercase tracking-wider text-[10px] mb-2">
                          Year: {doc.year}
                        </p>
                        <h4 className="font-bold text-academic-navy text-xl leading-tight">
                          {doc.title}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-academic-navy/5 hover:bg-academic-navy text-academic-navy hover:text-white font-bold rounded-2xl transition-colors duration-300 text-sm"
                      >
                        <Eye size={18} />
                        View PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-academic-navy mb-2">No documents uploaded yet</h3>
                <p className="text-slate-500 font-medium">Documents will appear here once uploaded from the admin panel.</p>
              </div>
            )}
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-16 pt-8 border-t border-slate-200 space-y-2">
            <p className="text-slate-500 font-medium">
              Data submitted annually to Ministry of Education, Govt. of India
            </p>
            <a 
              href="https://www.nirfindia.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-academic-gold font-bold hover:underline"
            >
              For more information visit nirfindia.org <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
