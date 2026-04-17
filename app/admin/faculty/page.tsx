"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, Plus, Trash2, Edit2, Mail, GraduationCap, UserPlus } from 'lucide-react';
import initialFaculty from '@/lib/data/faculty.json';
import Image from 'next/image';

interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  email: string;
  experience: string;
}

export default function FacultyManager() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setFaculty(initialFaculty);
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this faculty member?')) {
      setFaculty(faculty.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Faculty Management</h1>
          <p className="text-slate-500 font-medium">Add or update information about teaching staff.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl"
        >
          <UserPlus size={20} />
          Add Faculty Member
        </button>
      </div>

      {isAdding && (
         <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-academic-gold/20 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-black text-academic-navy mb-6 text-center">Faculty Enrollment Form</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none" placeholder="e.g. Dr. K. Satish" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Designation</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none" placeholder="e.g. Associate Professor" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Department</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none">
                     <option>Science</option>
                     <option>Commerce</option>
                     <option>Arts</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold outline-none" placeholder="name@college.com" />
               </div>
            </div>
            <div className="mt-8 flex justify-center gap-3">
               <button className="px-8 py-3 bg-academic-gold text-academic-navy font-black rounded-xl hover:shadow-xl transition-all">
                  Save Faculty
               </button>
               <button onClick={() => setIsAdding(false)} className="px-8 py-3 bg-slate-100 text-slate-500 font-black rounded-xl">
                  Cancel
               </button>
            </div>
         </div>
      )}

      {/* Faculty Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Faculty Member</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Department</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {faculty.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden relative border border-slate-200">
                        <Image src="/images/sf.jpeg" alt={f.name} fill className="object-cover" />
                     </div>
                     <div>
                        <p className="font-black text-academic-navy">{f.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{f.designation}</p>
                     </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                     <GraduationCap size={16} className="text-academic-gold" />
                     {f.department}
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Mail size={14} className="text-slate-300" />
                      {f.email}
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-academic-navy transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(f.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
