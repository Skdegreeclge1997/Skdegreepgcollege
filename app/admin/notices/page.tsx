"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Bell, Plus, Trash2, Calendar, FileText, Loader2 } from 'lucide-react';
import initialNotices from '@/lib/data/notices.json';

interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  isPinned: boolean;
  isNew?: boolean; // Optional for new items created in the session
}

export default function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', category: 'General' });

  useEffect(() => {
    // In a real setup, fetch from Supabase. 
    // Fallback to local data for now.
    setNotices(initialNotices);
    setIsLoading(false);
  }, []);

  const handleAddNotice = () => {
    const notice: Notice = {
      id: Date.now().toString(),
      title: newNotice.title,
      category: newNotice.category,
      content: 'New notice added via admin panel.',
      date: new Date().toISOString().split('T')[0],
      isPinned: false,
      isNew: true
    };
    setNotices([notice, ...notices]);
    setNewNotice({ title: '', category: 'General' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Notice Board Manager</h1>
          <p className="text-slate-500 font-medium">Update the college bulletin with new announcements.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl"
        >
          <Plus size={20} />
          Post New Notice
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-academic-gold/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-black text-academic-navy mb-6">Create New Announcement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Notice Title</label>
              <input 
                type="text" 
                value={newNotice.title}
                onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                placeholder="e.g., Mid-Term Examination Schedule Released"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
              <select 
                value={newNotice.category}
                onChange={(e) => setNewNotice({...newNotice, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none transition-all"
              >
                <option>General</option>
                <option>Exams</option>
                <option>Admissions</option>
                <option>Holidays</option>
                <option>Events</option>
              </select>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button 
              onClick={handleAddNotice}
              disabled={!newNotice.title}
              className="px-8 py-3 bg-academic-gold text-academic-navy font-black rounded-xl hover:shadow-xl transition-all disabled:opacity-50"
            >
              Confirm & Post
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              className="px-8 py-3 bg-slate-100 text-slate-500 font-black rounded-xl hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notice.isPinned || notice.isNew ? 'bg-academic-gold/10 text-academic-gold' : 'bg-slate-50 text-slate-400'}`}>
                <Bell size={24} />
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                   <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded">
                      {notice.category}
                   </span>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Calendar size={12} />
                      {notice.date}
                   </div>
                </div>
                <h3 className="font-black text-academic-navy">{notice.title}</h3>
             </div>
             <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-academic-navy transition-colors">
                   <FileText size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(notice.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                   <Trash2 size={20} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
