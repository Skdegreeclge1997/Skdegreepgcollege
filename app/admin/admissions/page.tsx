"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Download, Search, Filter, Mail, Phone, Calendar, User } from 'lucide-react';
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
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    // In a real setup, we would fetch from Supabase
    // const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    
    // Mock data for now until the user connects Supabase
    const mockInquiries: Inquiry[] = [
      { id: '1', name: 'Ravi Kumar', email: 'ravi@example.com', phone: '9876543210', course: 'B.Sc. Computer Science', status: 'New', created_at: new Date().toISOString() },
      { id: '2', name: 'Lata Devi', email: 'lata@example.com', phone: '9988776655', course: 'B.Com. Computer Applications', status: 'Contacted', created_at: new Date().toISOString() },
      { id: '3', name: 'Suresh Varma', email: 'suresh@example.com', phone: '8877665544', course: 'B.A. Political Science', status: 'Closed', created_at: new Date().toISOString() },
    ];
    
    setInquiries(mockInquiries);
    setIsLoading(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inquiries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
    XLSX.writeFile(workbook, "Student_Inquiries_SK_College.xlsx");
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
           <button onClick={fetchInquiries} className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
              Refresh
           </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Applied Course</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          {inq.name[0]}
                       </div>
                       <div>
                          <p className="font-black text-academic-navy">{inq.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID: #INQ-{inq.id.padStart(4, '0')}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-black">
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
                       inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                       ${inq.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                    `}>
                       <div className={`w-1.5 h-1.5 rounded-full ${inq.status === 'New' ? 'bg-green-500' : 'bg-slate-400'}`} />
                       {inq.status}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <button className="text-academic-navy font-bold text-xs hover:text-academic-gold hover:underline transition-all">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredInquiries.length === 0 && (
          <div className="p-12 text-center">
            <User className="mx-auto mb-4 text-slate-200" size={48} />
            <p className="text-slate-400 font-medium">No inquiries found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
