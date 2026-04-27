"use client";
 
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Newspaper, 
  Plus, 
  Trash2, 
  Calendar, 
  Image as ImageIcon, 
  FileText, 
  Loader2, 
  Edit2, 
  X, 
  Save,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
 
interface News {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image_url: string;
  pdf_url?: string;
}
 
export default function NewsManager() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<Partial<News> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<'image' | 'pdf' | null>(null);
 
  const fetchNews = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
    
    if (!error && data) {
      setNews(data);
    }
    setIsLoading(false);
  }, []);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchNews]);
 
  const handleOpenModal = (item?: News) => {
    setEditingNews(item || {
      title: '',
      description: '',
      category: 'Campus',
      date: new Date().toISOString().split('T')[0],
      image_url: 'https://images.unsplash.com/photo-1523240715181-310f9d7a573f?auto=format&fit=crop&q=80&w=1000'
    });
    setIsModalOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };
 
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;
 
    setIsUploading(type);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const bucket = type === 'image' ? 'images' : 'notices';
      const filePath = `news/${fileName}`;
 
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
 
      if (uploadError) throw uploadError;
 
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
 
      setEditingNews(prev => prev ? { 
        ...prev, 
        [type === 'image' ? 'image_url' : 'pdf_url']: publicUrl 
      } : null);
    } catch (error: unknown) {
      const err = error as { message: string };
      alert(`Error uploading ${type}: ` + err.message);
    } finally {
      setIsUploading(null);
    }
  };
 
  const handleSave = async () => {
    if (!editingNews?.title || !editingNews?.description) {
      alert('Title and Description are required');
      return;
    }
 
    setIsSaving(true);
    try {
      if (editingNews.id) {
        const { error } = await supabase.from('news').update(editingNews).eq('id', editingNews.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news').insert([editingNews]);
        if (error) throw error;
      }
      await fetchNews();
      handleCloseModal();
    } catch (error: unknown) {
      const err = error as { message: string };
      alert('Error saving news: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };
 
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    try {
      await supabase.from('news').delete().eq('id', id);
      await fetchNews();
    } catch (error: unknown) {
      const err = error as { message: string };
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
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight flex items-center gap-3">
            News Management
            <span className={`text-xs px-3 py-1 rounded-full ${news.length >= 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              {news.length}/10 Stories Used
            </span>
          </h1>
          <p className="text-slate-500 font-medium">Create and manage college news. Limited to 10 latest events.</p>
        </div>
        <button 
          onClick={() => {
            if (news.length >= 10) {
              alert('Events limit reached (10). Please remove an old event before adding a new one.');
              return;
            }
            handleOpenModal();
          }}
          className={`flex items-center gap-2 px-6 py-3 font-black rounded-xl transition-all shadow-xl active:translate-y-[1px] ${
            news.length >= 10 
            ? 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-70' 
            : 'bg-academic-navy text-white hover:bg-slate-800'
          }`}
        >
          <Plus size={20} />
          {news.length >= 10 ? 'Limit Reached' : 'Create News Story'}
        </button>
      </div>
 
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-100 text-slate-400">
             No news stories found. Publish your first story.
          </div>
        ) : news.map((item, index) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col relative">
             {index === news.length - 1 && news.length >= 10 && (
               <div className="absolute top-4 right-4 z-10 animate-pulse">
                 <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                   Oldest - Consider Removing
                 </span>
               </div>
             )}
             <div className="relative h-48">
                <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                   <span className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-full text-[10px] font-black uppercase tracking-widest text-academic-navy">
                      {item.category}
                   </span>
                </div>
             </div>
             <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
                   <Calendar size={12} className="text-academic-gold" />
                   {new Date(item.date).toLocaleDateString()}
                </div>
                <h3 className="font-black text-academic-navy mb-3 line-clamp-2 leading-tight">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-6">{item.description}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex gap-1">
                      <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-academic-navy hover:bg-slate-50 rounded-lg transition-all">
                         <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                         <Trash2 size={16} />
                      </button>
                   </div>
                   {item.pdf_url && (
                      <a href={item.pdf_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-black text-academic-gold uppercase hover:underline">
                         View PDF <ExternalLink size={12} />
                      </a>
                   )}
                </div>
             </div>
          </div>
        ))}
      </div>
 
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-academic-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
              <div className="bg-academic-navy p-8 text-white flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                       <Newspaper size={24} className="text-academic-gold" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">{editingNews?.id ? 'Edit Story' : 'New Story'}</h2>
                 </div>
                 <button onClick={handleCloseModal} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} />
                 </button>
              </div>
 
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">News Headline</label>
                    <input 
                       type="text" 
                       value={editingNews?.title}
                       onChange={e => setEditingNews(p => ({...p!, title: e.target.value}))}
                       className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none transition-all font-bold text-academic-navy" 
                       placeholder="e.g. S.K. Degree College Ranks Top in State Rankings" 
                    />
                 </div>
 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                       <select 
                          value={editingNews?.category}
                          onChange={e => setEditingNews(p => ({...p!, category: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-slate-600 appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em_1em]"
                       >
                          <option>Campus</option>
                          <option>Placements</option>
                          <option>NCC</option>
                          <option>Academics</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Publish Date</label>
                       <input 
                          type="date" 
                          value={editingNews?.date}
                          onChange={e => setEditingNews(p => ({...p!, date: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-slate-600" 
                       />
                    </div>
                 </div>
 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Story Content (Text)</label>
                    <textarea 
                       rows={4}
                       value={editingNews?.description}
                       onChange={e => setEditingNews(p => ({...p!, description: e.target.value}))}
                       className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none transition-all font-medium resize-none" 
                       placeholder="Brief summary of the news story..."
                    />
                 </div>
 
                 <div className="grid grid-cols-2 gap-4">
                     <label className="cursor-pointer p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 hover:border-academic-gold hover:bg-academic-gold/5 flex flex-col items-center justify-center text-center gap-3 transition-all">
                        {isUploading === 'image' ? (
                           <Loader2 className="animate-spin text-academic-gold" size={32} />
                        ) : (
                           <ImageIcon className="text-blue-400" size={32} />
                        )}
                        <span className="text-sm font-black text-academic-navy uppercase tracking-wider">
                           {isUploading === 'image' ? 'Uploading...' : editingNews?.image_url ? 'Change Image' : 'Upload Image'}
                        </span>
                        <span className="text-[10px] text-slate-400">JPG, PNG up to 5MB</span>
                        <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'image')} disabled={!!isUploading} />
                        {editingNews?.image_url && <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">Image Ready</span>}
                     </label>
                     <label className="cursor-pointer p-6 bg-red-50 rounded-2xl border-2 border-dashed border-red-200 hover:border-academic-gold hover:bg-academic-gold/5 flex flex-col items-center justify-center text-center gap-3 transition-all">
                        {isUploading === 'pdf' ? (
                           <Loader2 className="animate-spin text-academic-gold" size={32} />
                        ) : (
                           <FileText className="text-red-400" size={32} />
                        )}
                        <span className="text-sm font-black text-academic-navy uppercase tracking-wider">
                           {isUploading === 'pdf' ? 'Uploading...' : editingNews?.pdf_url ? 'Change PDF' : 'Upload PDF'}
                        </span>
                        <span className="text-[10px] text-slate-400">PDF files (Optional)</span>
                        <input type="file" className="hidden" accept=".pdf" onChange={e => handleFileUpload(e, 'pdf')} disabled={!!isUploading} />
                        {editingNews?.pdf_url && <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">PDF Attached</span>}
                     </label>
                  </div></div>
 
              <div className="p-8 bg-slate-50 flex gap-4">
                 <button 
                    onClick={handleSave}
                    disabled={isSaving || !!isUploading}
                    className="flex-1 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                 >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {editingNews?.id ? 'Update Story' : 'Publish Story'}
                 </button>
                 <button 
                    onClick={handleCloseModal}
                    className="px-8 py-4 bg-white text-slate-500 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
                 >
                    Cancel
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
