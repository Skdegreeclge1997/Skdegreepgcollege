"use client";
 
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Calendar, 
  FileText, 
  Loader2, 
  Edit2, 
  X, 
  Save, 
  Pin,
  Megaphone,
  Upload,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
 
interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  isPinned: boolean;
  pdf_url?: string;
  image_url?: string;
}
 
export default function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Partial<Notice> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<'pdf' | 'image' | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(type);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const bucket = type === 'pdf' ? 'notices' : 'images';
      const filePath = `notices/${fileName}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
      setEditingNotice(prev => prev ? { ...prev, [type === 'pdf' ? 'pdf_url' : 'image_url']: publicUrl } : null);
    } catch (error: unknown) {
      const err = error as { message: string };
      alert(`Error uploading ${type}: ` + err.message);
    } finally {
      setIsUploading(null);
    }
  };
 
  const fetchNotices = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('date', { ascending: false });
    
    if (!error && data) {
      setNotices(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotices();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchNotices]);
 
  const handleOpenModal = (item?: Notice) => {
    setEditingNotice(item || {
      title: '',
      category: 'General',
      content: '',
      date: new Date().toISOString().split('T')[0],
      isPinned: false
    });
    setIsModalOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNotice(null);
  };
 
  const handleSave = async () => {
    if (!editingNotice?.title || !editingNotice?.content) {
      alert('Heading and Text content are required');
      return;
    }
 
    setIsSaving(true);
    try {
      if (editingNotice.id) {
        // Update
        const { error } = await supabase
          .from('notices')
          .update(editingNotice)
          .eq('id', editingNotice.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('notices')
          .insert([editingNotice]);
        if (error) throw error;
      }
      
      await fetchNotices();
      handleCloseModal();
    } catch (error: unknown) {
      const err = error as { message: string };
      alert('Error saving notice: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };
 
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
 
    try {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchNotices();
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Notice Board Manager</h1>
          <p className="text-slate-500 font-medium">Publish official announcements and updates.</p>
        </div>
        {!isModalOpen && (
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-academic-navy/20 active:scale-95"
          >
            <Megaphone size={20} />
            New Announcement
          </button>
        )}
      </div>
 
      {!isModalOpen ? (
        /* Notices List */
        <div className="grid grid-cols-1 gap-4">
          {notices.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 text-slate-400">
               No active notices. Create your first announcement above.
            </div>
          ) : notices.map((notice) => (
            <div key={notice.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 group hover:shadow-md transition-all">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notice.isPinned ? 'bg-academic-gold text-academic-navy' : 'bg-slate-50 text-slate-400'}`}>
                  {notice.isPinned ? <Pin size={24} /> : <Bell size={24} />}
               </div>
               <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg">
                        {notice.category}
                     </span>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <Calendar size={12} />
                        {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                     </div>
                  </div>
                  <h3 className="font-black text-academic-navy text-lg leading-tight mb-2 truncate">{notice.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1">{notice.content}</p>
               </div>
               <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 justify-end">
                  <button 
                    onClick={() => handleOpenModal(notice)}
                    className="p-3 text-slate-400 hover:text-academic-navy hover:bg-slate-50 rounded-xl transition-all"
                  >
                     <Edit2 size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(notice.id)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                     <Trash2 size={20} />
                  </button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        /* Inline Editor */
        <div className="bg-white w-full rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-academic-navy p-6 md:p-8 text-white flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-academic-gold/20 border border-academic-gold/30 flex items-center justify-center text-academic-gold">
                   <Megaphone size={24} />
                </div>
                <div>
                   <h2 className="text-xl md:text-2xl font-black tracking-tight">{editingNotice?.id ? 'Update Notice' : 'New Notice'}</h2>
                   <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Official Bulletin System</p>
                </div>
             </div>
             <button onClick={handleCloseModal} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
             </button>
          </div>

          <div className="p-6 md:p-8 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Notice Heading</label>
                   <input 
                      type="text" 
                      value={editingNotice?.title || ''}
                      onChange={e => setEditingNotice(p => ({...p!, title: e.target.value}))}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all font-bold text-academic-navy" 
                      placeholder="e.g. Semester Exam Fee Last Date" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                   <select 
                      value={editingNotice?.category || 'General'}
                      onChange={e => setEditingNotice(p => ({...p!, category: e.target.value}))}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none font-bold text-slate-600 appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em_1em]"
                   >
                      <option>General</option>
                      <option>Exam</option>
                      <option>Admission</option>
                      <option>Holiday</option>
                      <option>Event</option>
                   </select>
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Notice Content (Text)</label>
                <textarea 
                   rows={6}
                   value={editingNotice?.content || ''}
                   onChange={e => setEditingNotice(p => ({...p!, content: e.target.value}))}
                   className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all font-medium resize-y" 
                   placeholder="Detailed information about the announcement..."
                />
             </div>

             {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center gap-2">
                    <ImageIcon className="text-slate-400" size={24} />
                    <label className="cursor-pointer">
                       <span className="text-[10px] font-black text-academic-navy uppercase tracking-widest hover:text-academic-gold transition-colors">
                          {isUploading === 'image' ? 'Uploading...' : editingNotice?.image_url ? 'Change Image' : 'Upload Image'}
                       </span>
                       <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'image')} disabled={!!isUploading} />
                    </label>
                    {editingNotice?.image_url && <span className="text-[8px] text-green-600 font-bold uppercase tracking-widest">Attached</span>}
                 </div>
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center gap-2">
                    <FileText className="text-slate-400" size={24} />
                    <label className="cursor-pointer">
                       <span className="text-[10px] font-black text-academic-navy uppercase tracking-widest hover:text-academic-gold transition-colors">
                          {isUploading === 'pdf' ? 'Uploading...' : editingNotice?.pdf_url ? 'Change PDF' : 'Upload PDF'}
                       </span>
                       <input type="file" className="hidden" accept=".pdf" onChange={e => handleFileUpload(e, 'pdf')} disabled={!!isUploading} />
                    </label>
                    {editingNotice?.pdf_url && <span className="text-[8px] text-green-600 font-bold uppercase tracking-widest">Attached</span>}
                 </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <input 
                    type="checkbox" 
                    id="isPinned"
                    checked={editingNotice?.isPinned || false}
                    onChange={e => setEditingNotice(p => ({...p!, isPinned: e.target.checked}))}
                    className="w-5 h-5 rounded border-slate-300 text-academic-navy focus:ring-academic-navy cursor-pointer" 
                 />
                 <label htmlFor="isPinned" className="text-sm font-bold text-slate-600 cursor-pointer">Pin this notice to the top</label>
              </div>
          </div>

          <div className="p-6 md:p-8 bg-slate-50 flex flex-col md:flex-row gap-4">
             <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-academic-navy/20 disabled:opacity-50"
             >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {editingNotice?.id ? 'Publish Changes' : 'Post Announcement'}
             </button>
             <button 
                onClick={handleCloseModal}
                className="px-8 py-4 bg-white text-slate-500 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
             >
                Discard
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
