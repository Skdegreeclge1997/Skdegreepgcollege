"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Download, Search, Filter, Mail, Phone, Calendar, User, GraduationCap, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: string;
  created_at: string;
}

export default function AdmissionsAdmin() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchInquiries(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchInquiries = async (searchQuery: string = '') => {
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
      
      if (!error && data) {
        setInquiries(data);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inquiries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
    XLSX.writeFile(workbook, "Student_Inquiries_SK_College.xlsx");
  };

  // Client-side filter removed; using server-side 'inquiries' directly
  const filteredInquiries = inquiries;

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Student Inquiries</h1>
          <p className="text-slate-500 font-medium">Manage and track new admission applications.</p>
        </div>
        <button 
          onClick={exportToExcel}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-academic-gold text-academic-navy font-black rounded-xl hover:shadow-xl hover:shadow-academic-gold/20 transition-all"
        >
          <Download size={20} />
          Export to Excel
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or course…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2">
           <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
              <Filter size={18} />
              Filter
           </button>
           <button onClick={() => fetchInquiries(searchTerm)} className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
              Refresh
           </button>
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
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
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
                              {inq.name[0]}
                           </div>
                           <div>
                              <p className="font-black text-academic-navy leading-none mb-1">{inq.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID: #INQ-{inq.id.slice(0, 4)}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase">
                          {inq.course}
                        </span>
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
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                           <Calendar size={14} className="text-slate-300" />
                           {new Date(inq.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className={`
                           inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
                           ${inq.status === 'New' || !inq.status ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'}
                        `}>
                           <div className={`w-1 h-1 rounded-full ${(inq.status === 'New' || !inq.status) ? 'bg-white' : 'bg-slate-400'}`} />
                           {inq.status || 'New'}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button className="px-4 py-2 bg-slate-50 text-academic-navy font-bold text-xs rounded-lg hover:bg-academic-navy hover:text-white transition-all shadow-sm">
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
                        {inq.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-academic-navy leading-none mb-1">{inq.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID: #INQ-{inq.id.slice(0, 4)}</p>
                      </div>
                    </div>
                    <div className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
                      ${inq.status === 'New' || !inq.status ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'}
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
                        <a href={`mailto:${inq.email}`} className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs">
                           <Mail size={14} /> Email
                        </a>
                     </div>
                  </div>
                  
                  <button className="w-full py-3 bg-slate-50 text-academic-navy font-bold text-xs rounded-xl border border-slate-100">
                    View Application Details
                  </button>
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
    </div>
  );
}
