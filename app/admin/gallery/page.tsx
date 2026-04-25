"use client";
 
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Maximize2, 
  Loader2, 
  UploadCloud, 
  X, 
  Camera, 
  Save,
  Grid,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
 
interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

interface PendingUpload {
  id: string;
  file: File;
  preview: string;
  caption: string;
  category: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}
 
export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [isSaving, setIsSaving] = useState(false);
 
  const fetchImages = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setImages(data.filter((img: GalleryImage) => !img.url.includes('youtube.com') && !img.url.includes('youtu.be')));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);
 
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPending = files.map(file => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
      caption: file.name.split('.')[0], // Default caption as filename
      category: 'Campus',
      status: 'pending' as const
    }));

    setPendingUploads(prev => [...prev, ...newPending]);
    setIsAdding(true);
    e.target.value = ''; // Reset input
  };

  const removePending = (id: string) => {
    setPendingUploads(prev => {
      const filtered = prev.filter(p => p.id !== id);
      const item = prev.find(p => p.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return filtered;
    });
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
          // 1. Upload to Storage
          const fileExt = upload.file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `gallery/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, upload.file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

          // 2. Save to Database
          const { error: dbError } = await supabase
            .from('gallery')
            .insert([{
              url: publicUrl,
              caption: upload.caption,
              category: upload.category
            }]);

          if (dbError) throw dbError;

          updatePending(upload.id, { status: 'success' });
        } catch (err: any) {
          updatePending(upload.id, { status: 'error', error: err.message });
        }
      }

      // Check if all succeeded
      const hasErrors = pendingUploads.some(p => p.status === 'error');
      if (!hasErrors) {
        setTimeout(() => {
          setIsAdding(false);
          setPendingUploads([]);
          fetchImages();
        }, 1000);
      } else {
        fetchImages();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) return;

    try {
      await supabase.from('gallery').delete().eq('id', id);
      await fetchImages();
    } catch (error: any) {
      alert('Error deleting: ' + error.message);
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
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Photo Gallery Manager</h1>
          <p className="text-slate-500 font-medium">Bulk upload and manage campus imagery.</p>
        </div>
        <label className="flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl active:opacity-80 active:translate-y-[1px] cursor-pointer">
          <Camera size={20} />
          Bulk Upload Photos
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFilesSelected} />
        </label>
      </div>
 
      {isAdding && (
         <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-academic-navy flex items-center gap-3">
                  <UploadCloud className="text-blue-500" />
                  Batch Upload Queue ({pendingUploads.length} items)
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
                  <div className="w-full md:w-32 aspect-square relative rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <Image src={upload.preview} alt="Preview" fill className="object-cover" />
                    {upload.status === 'success' && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="text-white fill-green-500" size={32} />
                      </div>
                    )}
                    {upload.status === 'uploading' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Loader2 className="animate-spin text-white" size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Caption</label>
                      <input 
                        type="text" 
                        value={upload.caption}
                        onChange={(e) => updatePending(upload.id, { caption: e.target.value })}
                        disabled={upload.status === 'success' || upload.status === 'uploading'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-academic-navy text-sm transition-all" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                      <select 
                        value={upload.category}
                        onChange={(e) => updatePending(upload.id, { category: e.target.value })}
                        disabled={upload.status === 'success' || upload.status === 'uploading'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-slate-600 text-sm appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]"
                      >
                        <option>Campus</option>
                        <option>Events</option>
                        <option>Facilities</option>
                        <option>Students</option>
                        <option>NCC</option>
                      </select>
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
  
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.length === 0 ? (
          <div className="col-span-full bg-white p-20 text-center rounded-[3rem] border border-slate-100 text-slate-400">
             <Grid size={48} className="mx-auto mb-4 opacity-10" />
             <p className="font-bold text-lg">Your gallery is empty.</p>
             <p className="text-sm">Start building your visual library by uploading photos.</p>
          </div>
        ) : images.map((img) => (
          <div key={img.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[4/3] relative overflow-hidden">
                <Image src={img.url} alt={img.caption} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="p-4 bg-red-500 text-white rounded-2xl shadow-xl hover:scale-110 active:scale-90 transition-all"
                  >
                     <Trash2 size={24} />
                  </button>
                  <button className="p-4 bg-white text-academic-navy rounded-2xl shadow-xl hover:scale-110 active:scale-90 transition-all">
                     <Maximize2 size={24} />
                  </button>
               </div>
               <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-academic-navy text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                     {img.category}
                  </span>
               </div>
            </div>
            <div className="p-8">
               <h3 className="font-black text-academic-navy text-lg leading-tight mb-2 truncate">{img.caption}</h3>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar size={12} className="text-academic-gold" />
                  Media Asset #{img.id.slice(-4)}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

