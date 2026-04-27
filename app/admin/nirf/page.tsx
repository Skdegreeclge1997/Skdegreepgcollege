"use client";
 
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  FileText, 
  Trash2, 
  Loader2, 
  UploadCloud, 
  X, 
  Save,
  Grid,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
 
interface NirfDocument {
  id: string;
  title: string;
  year: string;
  file_url: string;
  created_at: string;
}

interface PendingUpload {
  id: string;
  file: File;
  title: string;
  year: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}
 
export default function NirfManager() {
  const [documents, setDocuments] = useState<NirfDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [isSaving, setIsSaving] = useState(false);
 
  const fetchDocuments = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('nirf_documents')
      .select('*')
      .order('year', { ascending: false });
    
    if (!error && data) {
      setDocuments(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchDocuments();
    }
    return () => { isMounted = false; };
  }, [fetchDocuments]);
 
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPending = files.map(file => ({
      id: Math.random().toString(36).slice(2),
      file,
      title: file.name.split('.')[0], // Default title as filename
      year: new Date().getFullYear().toString(), // Default to current year
      status: 'pending' as const
    }));

    setPendingUploads(prev => [...prev, ...newPending]);
    setIsAdding(true);
    e.target.value = ''; // Reset input
  };

  const removePending = (id: string) => {
    setPendingUploads(prev => prev.filter(p => p.id !== id));
  };

  const updatePending = (id: string, updates: Partial<PendingUpload>) => {
    setPendingUploads(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };
  
  const handleSaveAll = async () => {
    if (pendingUploads.length === 0) return;
    setIsSaving(true);

    try {
      for (const upload of pendingUploads) {
        if (upload.status === 'success') continue;

        updatePending(upload.id, { status: 'uploading' });

        try {
          // 1. Upload to Storage ('documents' bucket)
          const fileExt = upload.file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `nirf/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, upload.file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

          // 2. Save to Database ('nirf_documents' table)
          const { error: dbError } = await supabase
            .from('nirf_documents')
            .insert([{
              file_url: publicUrl,
              title: upload.title,
              year: upload.year
            }]);

          if (dbError) throw dbError;

          updatePending(upload.id, { status: 'success' });
        } catch (err: unknown) {
          const error = err as Error;
          updatePending(upload.id, { status: 'error', error: error.message });
        }
      }

      // Check if all succeeded
      const hasErrors = pendingUploads.some(p => p.status === 'error');
      if (!hasErrors) {
        setTimeout(() => {
          setIsAdding(false);
          setPendingUploads([]);
          fetchDocuments();
        }, 1000);
      } else {
        fetchDocuments();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this document?')) return;

    try {
      await supabase.from('nirf_documents').delete().eq('id', id);
      await fetchDocuments();
    } catch (error: unknown) {
      const err = error as Error;
      alert('Error deleting: ' + err.message);
    }
  };
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-academic-navy" size={40} />
      </div>
    );
  }
 
  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">NIRF Documents</h1>
          <p className="text-slate-500 font-medium">Upload and manage NIRF PDF reports.</p>
        </div>
        <label className="flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl active:opacity-80 active:translate-y-[1px] cursor-pointer">
          <UploadCloud size={20} />
          Upload PDF
          <input type="file" multiple accept=".pdf" className="hidden" onChange={handleFilesSelected} />
        </label>
      </div>
 
      {isAdding && (
         <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-academic-navy flex items-center gap-3">
                  <FileText className="text-blue-500" />
                  Upload Queue ({pendingUploads.length} items)
               </h2>
               <div className="flex gap-3">
                  <button 
                    onClick={handleSaveAll}
                    disabled={isSaving || pendingUploads.length === 0}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-black rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
                  >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save All
                  </button>
                  <button onClick={() => { setIsAdding(false); setPendingUploads([]); }} className="p-2 hover:bg-slate-50 rounded-full transition-all">
                    <X size={20} className="text-slate-400" />
                  </button>
               </div>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {pendingUploads.map((upload) => (
                <div key={upload.id} className={`flex flex-col md:flex-row gap-6 p-4 rounded-3xl border transition-all ${
                  upload.status === 'success' ? 'bg-green-50 border-green-100' : 
                  upload.status === 'error' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shrink-0">
                    {upload.status === 'success' ? (
                      <CheckCircle2 className="text-green-500" size={32} />
                    ) : upload.status === 'uploading' ? (
                      <Loader2 className="animate-spin text-blue-500" size={32} />
                    ) : (
                      <FileText className="text-slate-400" size={32} />
                    )}
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Title</label>
                      <input 
                        type="text" 
                        value={upload.title}
                        onChange={(e) => updatePending(upload.id, { title: e.target.value })}
                        disabled={upload.status === 'success' || upload.status === 'uploading'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-academic-navy text-sm transition-all" 
                        placeholder="e.g. NIRF 2025 Report"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Year</label>
                      <input 
                        type="text" 
                        value={upload.year}
                        onChange={(e) => updatePending(upload.id, { year: e.target.value })}
                        disabled={upload.status === 'success' || upload.status === 'uploading'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-academic-navy text-sm transition-all" 
                        placeholder="e.g. 2024-2025"
                      />
                    </div>
                    {upload.status === 'error' && (
                      <div className="col-span-full flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-tight">
                        <AlertCircle size={14} />
                        {upload.error}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center px-2">
                    <button 
                      onClick={() => removePending(upload.id)}
                      disabled={upload.status === 'uploading'}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
         </div>
      )}
  
      {/* Documents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents.length === 0 ? (
          <div className="col-span-full bg-white p-20 text-center rounded-[3rem] border border-slate-100 text-slate-400">
             <Grid size={48} className="mx-auto mb-4 opacity-10" />
             <p className="font-bold text-lg">No NIRF documents found.</p>
             <p className="text-sm">Start by uploading PDF reports.</p>
          </div>
        ) : documents.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-academic-navy text-lg">{doc.title}</h3>
                <p className="text-sm text-slate-500 font-medium">Year: {doc.year}</p>
                <a 
                  href={doc.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-500 hover:underline mt-1 inline-block"
                >
                  View PDF
                </a>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(doc.id)}
              className="p-3 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
              title="Delete Document"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
