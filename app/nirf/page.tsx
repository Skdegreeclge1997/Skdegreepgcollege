import { supabase } from '@/lib/supabase';
import { FileText, Download } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function NirfPage() {
  const { data: documents, error } = await supabase
    .from('nirf_documents')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching NIRF documents:', error);
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-black text-academic-navy mb-4 tracking-tight">
              NIRF <span className="text-academic-gold">Reports</span>
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              National Institutional Ranking Framework documents and reports.
            </p>
          </div>

          {documents && documents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-academic-gold/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-academic-gold group-hover:bg-academic-gold group-hover:text-white transition-colors duration-300 shadow-sm">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-academic-navy text-lg group-hover:text-academic-gold transition-colors duration-300">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-bold mt-1 bg-slate-100 inline-block px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                        Year: {doc.year}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-academic-navy transition-colors duration-300">
                    <Download className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-academic-navy mb-2">No documents found</h3>
              <p className="text-slate-500 font-medium">NIRF reports will appear here once uploaded by the administration.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
