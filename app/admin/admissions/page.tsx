"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Download, Search, Filter, Mail, Phone, Calendar, User, GraduationCap, Loader2, X, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: string;
  message: string;
  created_at: string;
}

export default function AdmissionsAdmin() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  async function fetchInquiries(searchQuery: string = '') {
    setIsLoading(true);
    try {

      let query = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
        
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,course.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase query error:', error);
        return;
      }

      if (data) {
        setInquiries(data);
      }
    } catch (err: any) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    setIsUpdating(id);
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setIsUpdating(null);
    }
  }

  async function deleteInquiry(id: string) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      setSelectedInquiry(null);
    } catch (err: any) {
      alert(`Failed to delete inquiry: ${err.message}`);
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchInquiries(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inquiries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
    XLSX.writeFile(workbook, "Student_Inquiries_SK_College.xlsx");
  };

  const [activeTab, setActiveTab] = useState<'All' | 'Admissions' | 'Contact'>('All');

  const filteredInquiries = inquiries.filter(inq => {
    if (activeTab === 'Admissions') return inq.course !== 'Contact Inquiry';
    if (activeTab === 'Contact') return inq.course === 'Contact Inquiry';
    return true;
  });

  return (
    <div className="space-y-8 relative">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-academic-navy tracking-tight">Student Inquiries</h1>
          </div>
          <p className="text-slate-500 font-medium">Manage applications and contact messages.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={exportToExcel}
             className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-academic-navy font-black rounded-xl hover:bg-slate-50 transition-all active:scale-95"
           >
             <Download size={20} />
             Export
           </button>
           <button 
             onClick={() => fetchInquiries(searchTerm)}
             className="flex items-center justify-center gap-2 px-6 py-3 bg-academic-gold text-academic-navy font-black rounded-xl hover:shadow-xl hover:shadow-academic-gold/20 transition-all active:scale-95"
           >
             <Loader2 className={isLoading ? 'animate-spin' : ''} size={20} />
             Refresh
           </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex bg-slate-100 p-1 rounded-2xl md:w-fit">
          {(['All', 'Admissions', 'Contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                ${activeTab === tab 
                  ? 'bg-white text-academic-navy shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }
              `}
            >
              {tab === 'Admissions' ? 'Applications' : tab === 'Contact' ? 'Messages' : 'All Entries'}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, course, or content…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none transition-all shadow-sm text-sm"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-academic-navy" size={48} />
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Synchronizing Applications...</p>
          </div>
        ) : (
          <div className="w-full">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Applied Course</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Details (Group/Addr)</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-academic-navy text-white flex items-center justify-center text-sm font-black">
                              {inq.name ? inq.name[0] : '?'}
                           </div>
                           <div>
                              <p className="font-black text-academic-navy leading-none mb-1">{inq.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(inq.created_at).toLocaleDateString()}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase">
                          {inq.course}
                        </span>
                      </td>
                      <td className="px-6 py-6 max-w-[250px]">
                        <p className="text-xs text-slate-500 line-clamp-2 font-medium">
                          {inq.message || '---'}
                        </p>
                      </td>
                      <td className="px-6 py-6 space-y-1">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                           <Mail size={14} className="text-slate-300" />
                           {inq.email}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                           <Phone size={14} className="text-slate-300" />
                           {inq.phone}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className={`
                           inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
                           ${inq.status === 'Processed' ? 'bg-slate-100 text-slate-600' : 'bg-green-500 text-white'}
                        `}>
                           {inq.status || 'New'}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button 
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-4 py-2 bg-slate-50 text-academic-navy font-bold text-xs rounded-lg hover:bg-academic-navy hover:text-white transition-all shadow-sm"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredInquiries.map((inq) => (
                <div key={inq.id} className="p-6 space-y-4 active:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-academic-navy text-white flex items-center justify-center text-sm font-black">
                        {inq.name ? inq.name[0] : '?'}
                      </div>
                      <div>
                        <p className="font-black text-academic-navy leading-none mb-1">{inq.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(inq.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
                      ${inq.status === 'Processed' ? 'bg-slate-100 text-slate-600' : 'bg-green-500 text-white'}
                    `}>
                      {inq.status || 'New'}
                    </div>
                  </div>

                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-slate-50 p-2 rounded-lg">
                        <GraduationCap size={16} className="text-academic-gold" />
                        {inq.course}
                     </div>
                     <div className="grid grid-cols-2 gap-2 mt-4">
                        <a href={`tel:${inq.phone}`} className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs">
                           <Phone size={14} /> Call
                        </a>
                        <button 
                          onClick={() => setSelectedInquiry(inq)}
                          className="flex items-center justify-center gap-2 p-3 bg-academic-navy text-white rounded-xl font-bold text-xs"
                        >
                           Details
                        </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && filteredInquiries.length === 0 && (
          <div className="p-12 text-center">
            <User className="mx-auto mb-4 text-slate-200" size={48} />
            <p className="text-slate-400 font-medium">No inquiries found matching your search.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-academic-navy/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-academic-navy p-8 text-white flex justify-between items-start">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-academic-gold/20 border border-academic-gold/30 flex items-center justify-center text-academic-gold text-2xl font-black">
                       {selectedInquiry.name ? selectedInquiry.name[0] : '?'}
                    </div>
                    <div>
                       <h2 className="text-2xl font-black tracking-tight">{selectedInquiry.name}</h2>
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Application Details</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedInquiry(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Details</p>
                          <div className="space-y-2">
                             <div className="flex items-center gap-3 text-slate-600 font-bold">
                                <Mail size={16} className="text-academic-gold" />
                                {selectedInquiry.email}
                             </div>
                             <div className="flex items-center gap-3 text-slate-600 font-bold">
                                <Phone size={16} className="text-academic-gold" />
                                {selectedInquiry.phone}
                             </div>
                          </div>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Interested Course</p>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-black text-sm uppercase">
                             <GraduationCap size={16} />
                             {selectedInquiry.course}
                          </div>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Submission Date</p>
                          <div className="flex items-center gap-3 text-slate-600 font-bold">
                             <Calendar size={16} className="text-academic-gold" />
                             {new Date(selectedInquiry.created_at).toLocaleString()}
                          </div>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                          <div className="flex items-center gap-2">
                             <select 
                                value={selectedInquiry.status || 'New'} 
                                onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                                disabled={isUpdating === selectedInquiry.id}
                                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-academic-gold"
                             >
                                <option value="New">New Application</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Processed">Processed</option>
                                <option value="Rejected">Rejected</option>
                             </select>
                             {isUpdating === selectedInquiry.id && <Loader2 size={16} className="animate-spin text-academic-gold" />}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Additional Information (Group & Address)</p>
                    <p className="text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                       {selectedInquiry.message || 'No additional details provided.'}
                    </p>
                 </div>

                 <div className="flex gap-4">
                    <button 
                       onClick={() => deleteInquiry(selectedInquiry.id)}
                       className="px-6 py-4 bg-red-50 text-red-600 font-black rounded-2xl border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2"
                    >
                       <Trash2 size={20} />
                       Delete Inquiry
                    </button>
                    <button 
                       onClick={() => setSelectedInquiry(null)}
                       className="flex-1 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-academic-navy/20"
                    >
                       Close Details
                    </button>
                 </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
