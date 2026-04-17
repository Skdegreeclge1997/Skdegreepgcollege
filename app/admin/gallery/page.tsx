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
  Calendar
} from 'lucide-react';
import Image from 'next/image';
 
interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}
 
export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({ caption: '', category: 'Campus' });
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
 
  useEffect(() => {
    fetchImages();
  }, []);
 
  const fetchImages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setImages(data);
    }
    setIsLoading(false);
  };
 
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
 
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;
 
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);
 
      if (uploadError) throw uploadError;
 
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
 
      setNewImage(prev => ({ ...prev, url: publicUrl }));
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
 
  const handleSave = async () => {
    if (!newImage.url || !newImage.caption) {
      alert('Image and Caption are required');
      return;
    }
 
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('gallery')
        .insert([newImage]);
      
      if (error) throw error;
      
      await fetchImages();
      setIsAdding(false);
      setNewImage({ caption: '', category: 'Campus' });
    } catch (error: any) {
      alert('Error saving to gallery: ' + error.message);
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
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Gallery Manager</h1>
          <p className="text-slate-500 font-medium">Curate the visual legacy of S.K. Degree College.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl active:scale-95"
        >
          <Camera size={20} />
          Upload New Photo
        </button>
      </div>
 
      {isAdding && (
         <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-academic-gold/20 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-academic-navy flex items-center gap-3">
                  <UploadCloud className="text-academic-gold" />
                  Media Upload
               </h2>
               <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-50 rounded-full transition-all">
                  <X size={20} className="text-slate-400" />
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Upload Area */}
               <div className="relative aspect-video bg-slate-50 rounded-[2rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden group/upload">
                  {newImage.url ? (
                     <>
                        <Image src={newImage.url} alt="Preview" fill className="object-cover" />
                        <button 
                           onClick={() => setNewImage(p => ({...p, url: undefined}))}
                           className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
                        >
                           <Trash2 size={16} />
                        </button>
                     </>
                  ) : (
                     <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all">
                        {uploading ? <Loader2 className="animate-spin text-academic-gold mb-2" size={32} /> : <ImageIcon size={48} className="mb-2 opacity-20" />}
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                           {uploading ? 'Processing File...' : 'Click to Upload Photo'}
                        </p>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                     </label>
                  )}
               </div>
 
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Photo Caption</label>
                     <input 
                        type="text" 
                        value={newImage.caption}
                        onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-academic-navy transition-all" 
                        placeholder="e.g. Inauguration of New Computer Lab" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                     <select 
                        value={newImage.category}
                        onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-slate-600 appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em_1em]"
                     >
                        <option>Campus</option>
                        <option>Events</option>
                        <option>Facilities</option>
                        <option>Students</option>
                        <option>NCC</option>
                     </select>
                  </div>
                  <div className="pt-4 flex gap-4">
                     <button 
                        onClick={handleSave}
                        disabled={isSaving || !newImage.url || !newImage.caption}
                        className="flex-1 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-academic-navy/20 disabled:opacity-50"
                     >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save to Gallery
                     </button>
                  </div>
               </div>
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
                    title="Delete Photo"
                  >
                     <Trash2 size={24} />
                  </button>
                  <button 
                    className="p-4 bg-white text-academic-navy rounded-2xl shadow-xl hover:scale-110 active:scale-90 transition-all"
                    title="View Fullscreen"
                  >
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
