"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Image as ImageIcon, Plus, Trash2, Maximize2, Loader2, UploadCloud } from 'lucide-react';
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
  const [newImage, setNewImage] = useState({ url: '', caption: '', category: 'Campus' });

  useEffect(() => {
    // Mock data for initial state
    const mockImages: GalleryImage[] = [
      { id: '1', url: '/images/college.jpeg', caption: 'Main Campus Building', category: 'Campus' },
      { id: '2', url: '/images/college2.jpeg', caption: 'Student Activity Center', category: 'Facilities' },
    ];
    setImages(mockImages);
    setIsLoading(false);
  }, []);

  const handleAddImage = () => {
    if (!newImage.url) return;
    const img: GalleryImage = {
      id: Date.now().toString(),
      url: newImage.url,
      caption: newImage.caption || 'Untitled Image',
      category: newImage.category
    };
    setImages([img, ...images]);
    setNewImage({ url: '', caption: '', category: 'Campus' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this image from the gallery?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Gallery Manager</h1>
          <p className="text-slate-500 font-medium">Manage campus photos and event highlights.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl"
        >
          <Plus size={20} />
          Add New Photo
        </button>
      </div>

      {isAdding && (
         <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-academic-gold/20 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-black text-academic-navy mb-6">Upload New Gallery Photo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Preview Area */}
               <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative">
                  {newImage.url ? (
                     <Image src={newImage.url} alt="Preview" fill className="object-cover" />
                  ) : (
                     <>
                        <UploadCloud size={48} className="mb-2 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">Image Preview</p>
                     </>
                  )}
               </div>

               {/* Inputs Area */}
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image URL</label>
                     <input 
                        type="text" 
                        value={newImage.url}
                        onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none" 
                        placeholder="https://example.com/photo.jpg" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Caption</label>
                     <input 
                        type="text" 
                        value={newImage.caption}
                        onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none" 
                        placeholder="e.g. Science Lab 2024" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                     <select 
                        value={newImage.category}
                        onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none"
                     >
                        <option>Campus</option>
                        <option>Events</option>
                        <option>Facilities</option>
                        <option>Students</option>
                     </select>
                  </div>
               </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
               <button 
                  onClick={handleAddImage}
                  disabled={!newImage.url}
                  className="px-8 py-3 bg-academic-gold text-academic-navy font-black rounded-xl hover:shadow-xl transition-all disabled:opacity-50"
               >
                  Add to Gallery
               </button>
               <button onClick={() => setIsAdding(false)} className="px-8 py-3 bg-slate-100 text-slate-500 font-black rounded-xl">
                  Cancel
               </button>
            </div>
         </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
            <div className="aspect-video relative overflow-hidden">
               <Image src={img.url} alt={img.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => handleDelete(img.id)} className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all">
                     <Trash2 size={16} />
                  </button>
               </div>
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-academic-navy/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                     {img.category}
                  </span>
               </div>
            </div>
            <div className="p-5 flex items-center justify-between">
               <div>
                  <h3 className="font-black text-academic-navy truncate max-w-[150px]">{img.caption}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uploaded Today</p>
               </div>
               <button className="p-2 text-slate-400 hover:text-academic-gold transition-colors">
                  <Maximize2 size={18} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
