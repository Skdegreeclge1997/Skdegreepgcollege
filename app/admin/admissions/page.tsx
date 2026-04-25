"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Download, Search, Filter, Mail, Phone, Calendar, User, GraduationCap, Loader2, X, Trash2 } from 'lucide-react';
import XLSX from 'xlsx-js-style';

interface Inquiry {
  id: string;
  name: string;
  father_name?: string;
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
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  async function fetchInquiries(searchQuery: string = '') {
    setIsLoading(true);
    try {

      let query = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
        
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,course.ilike.%${searchQuery}%,father_name.ilike.%${searchQuery}%`);
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
    
    setIsDeleting(id);
    try {
      console.log('Attempting to delete inquiry:', id);
      
      const { error, data, count } = await supabase
        .from('inquiries')
        .delete({ count: 'exact' })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Delete error from Supabase:', error);
        throw error;
      }
      
      if (count === 0) {
        alert('Database reported 0 rows deleted. The record may have already been removed, or your account lacks permission to delete it. Please check RLS policies.');
        return;
      }
      
      console.log(`Delete successful, ${count} rows affected. data:`, data);
      
      // Update local state
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      setSelectedInquiry(null);
      
      // Force a silent refresh of the data from the server to ensure synchronization
      await fetchInquiries(searchTerm);
      
    } catch (err: any) {
      console.error('Final Delete catch:', err);
      alert(`Delete failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(null);
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchInquiries(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const exportToExcel = () => {
    // ── Color Palette ──
    const DARK_GREEN  = "1B5E20";
    const MED_GREEN   = "2E7D32";
    const LIGHT_GREEN = "E8F5E9";
    const HDR_GREEN   = "388E3C";
    const GOLD        = "F9A825";
    const ROW_ALT     = "F1F8E9";
    const GREY        = "757575";

    const thinBorder = {
      top:    { style: "thin", color: { rgb: "CCCCCC" } },
      bottom: { style: "thin", color: { rgb: "CCCCCC" } },
      left:   { style: "thin", color: { rgb: "CCCCCC" } },
      right:  { style: "thin", color: { rgb: "CCCCCC" } },
    };

    const hdrBorder = {
      top:    { style: "thin", color: { rgb: MED_GREEN } },
      bottom: { style: "thin", color: { rgb: MED_GREEN } },
      left:   { style: "thin", color: { rgb: MED_GREEN } },
      right:  { style: "thin", color: { rgb: MED_GREEN } },
    };

    // ── Prepare Data ──
    const headers = ["S.No", "Student Name", "Father's Name", "Email", "Phone", "Course Applied", "Group", "Status", "Applied Date", "Address", "Application ID"];
    const totalCols = headers.length; // 11 = A..K

    const dataRows = inquiries.map((inq, i) => [
      i + 1,
      inq.name,
      inq.father_name || "N/A",
      inq.email,
      inq.phone,
      inq.course,
      inq.message.split("|")[0].replace("Group: ", "").trim(),
      inq.status || "New",
      new Date(inq.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }),
      inq.message.split("|")[1]?.replace("Address: ", "").trim() || "N/A",
      inq.id.substring(0, 8).toUpperCase(),
    ]);

    // ── Build AOA (array of arrays) ──
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) + " | " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

    const aoa: any[][] = [
      /* Row 1 */ ["", "S.K. DEGREE COLLEGE & PG COLLEGE", ...Array(totalCols - 2).fill("")],
      /* Row 2 */ ["Affiliated to Andhra University | Established in 2005", ...Array(totalCols - 1).fill("")],
      /* Row 3 */ ["School Nagar, Ayyannapet Junction, Vizianagaram, Andhra Pradesh", ...Array(totalCols - 1).fill("")],
      /* Row 4 */ ["Ph: 94412 53163 | Email: arunodayaes@yahoo.com | www.skdegreecollege.com", ...Array(totalCols - 1).fill("")],
      /* Row 5 */ Array(totalCols).fill(""),
      /* Row 6 */ ["\u00A0\u00A0ONLINE APPLICATION LIST \u2013 ADMISSIONS 2026-27", ...Array(totalCols - 1).fill("")],
      /* Row 7 */ [`Date of Printing: ${dateStr}`, ...Array(totalCols - 1).fill("")],
      /* Row 8 */ headers,
      ...dataRows,
      /* Summary */ [`Total Applications Received: ${dataRows.length}`, ...Array(totalCols - 1).fill("")],
      /* blank */  Array(totalCols).fill(""),
      /* Footer */ ["This is a computer-generated report from the S.K. Degree College online admission portal. For queries, contact the college administration.", ...Array(totalCols - 1).fill("")],
    ];

    const ws = XLSX.utils.aoa_to_sheet(aoa);

    // ── Merges ──
    const lastCol = totalCols - 1;
    ws["!merges"] = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: lastCol } },   // Row 1: B1:K1
      { s: { r: 1, c: 0 }, e: { r: 1, c: lastCol } },   // Row 2
      { s: { r: 2, c: 0 }, e: { r: 2, c: lastCol } },   // Row 3
      { s: { r: 3, c: 0 }, e: { r: 3, c: lastCol } },   // Row 4
      { s: { r: 4, c: 0 }, e: { r: 4, c: lastCol } },   // Row 5 divider
      { s: { r: 5, c: 0 }, e: { r: 5, c: lastCol } },   // Row 6
      { s: { r: 6, c: 0 }, e: { r: 6, c: lastCol } },   // Row 7
      // Summary row
      { s: { r: 8 + dataRows.length, c: 0 }, e: { r: 8 + dataRows.length, c: lastCol } },
      // Footer row
      { s: { r: 10 + dataRows.length, c: 0 }, e: { r: 10 + dataRows.length, c: lastCol } },
    ];

    // ── Column Widths ──
    ws["!cols"] = [
      { wch: 5 }, { wch: 22 }, { wch: 20 }, { wch: 28 }, { wch: 14 },
      { wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 40 }, { wch: 20 },
    ];

    // ── Row Heights ──
    ws["!rows"] = [
      { hpt: 50 },  // Row 1
      { hpt: 22 },  // Row 2
      { hpt: 18 },  // Row 3
      { hpt: 16 },  // Row 4
      { hpt: 8 },   // Row 5 divider
      { hpt: 24 },  // Row 6
      { hpt: 16 },  // Row 7
      { hpt: 30 },  // Row 8 headers
    ];

    // ── Helper: apply style to every cell in a row ──
    const fillRow = (row: number, style: any) => {
      for (let c = 0; c < totalCols; c++) {
        const addr = XLSX.utils.encode_cell({ r: row, c });
        if (!ws[addr]) ws[addr] = { v: "", t: "s" };
        ws[addr].s = { ...ws[addr].s, ...style };
      }
    };

    // ── Row 1: Dark green, white bold 20 ──
    fillRow(0, {
      fill: { fgColor: { rgb: DARK_GREEN } },
      font: { name: "Arial", sz: 20, bold: true, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "center" },
    });

    // ── Row 2: Medium green ──
    fillRow(1, {
      fill: { fgColor: { rgb: MED_GREEN } },
      font: { name: "Arial", sz: 12, bold: true, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "center" },
    });

    // ── Row 3: Address ──
    fillRow(2, {
      font: { name: "Arial", sz: 10, color: { rgb: DARK_GREEN } },
      alignment: { horizontal: "center", vertical: "center" },
    });

    // ── Row 4: Contact ──
    fillRow(3, {
      font: { name: "Arial", sz: 9, italic: true, color: { rgb: GREY } },
      alignment: { horizontal: "center", vertical: "center" },
    });

    // ── Row 5: Gold divider ──
    fillRow(4, {
      fill: { fgColor: { rgb: GOLD } },
    });

    // ── Row 6: Report title ──
    fillRow(5, {
      fill: { fgColor: { rgb: LIGHT_GREEN } },
      font: { name: "Arial", sz: 13, bold: true, color: { rgb: DARK_GREEN } },
      alignment: { horizontal: "center", vertical: "center" },
    });

    // ── Row 7: Date ──
    fillRow(6, {
      font: { name: "Arial", sz: 9, italic: true, color: { rgb: GREY } },
      alignment: { horizontal: "right", vertical: "center" },
    });

    // ── Row 8: Column headers ──
    fillRow(7, {
      fill: { fgColor: { rgb: HDR_GREEN } },
      font: { name: "Arial", sz: 10, bold: true, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: hdrBorder,
    });

    // ── Data rows (row index 8+) ──
    const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
      "New":       { bg: "E3F2FD", fg: "1565C0" },
      "Contacted": { bg: "FFF3E0", fg: "E65100" },
      "Confirmed": { bg: "E8F5E9", fg: "2E7D32" },
      "Processed": { bg: "E8F5E9", fg: "2E7D32" },
      "Rejected":  { bg: "FFEBEE", fg: "C62828" },
    };

    for (let r = 0; r < dataRows.length; r++) {
      const rowIdx = 8 + r;
      const isEven = r % 2 === 1;

      for (let c = 0; c < totalCols; c++) {
        const addr = XLSX.utils.encode_cell({ r: rowIdx, c });
        if (!ws[addr]) ws[addr] = { v: "", t: "s" };

        const cellStyle: any = {
          font: { name: "Arial", sz: 9 },
          alignment: { vertical: "center", wrapText: c === 9 },
          border: thinBorder,
        };

        // Alternating row fill
        if (isEven) {
          cellStyle.fill = { fgColor: { rgb: ROW_ALT } };
        }

        // Status column (index 7) — color badge
        if (c === 7) {
          const status = String(dataRows[r][7]);
          const sc = STATUS_COLORS[status];
          if (sc) {
            cellStyle.fill = { fgColor: { rgb: sc.bg } };
            cellStyle.font = { name: "Arial", sz: 9, bold: true, color: { rgb: sc.fg } };
            cellStyle.alignment = { horizontal: "center", vertical: "center" };
          }
        }

        ws[addr].s = cellStyle;
      }
    }

    // ── Summary row ──
    const summaryRowIdx = 8 + dataRows.length;
    fillRow(summaryRowIdx, {
      fill: { fgColor: { rgb: DARK_GREEN } },
      font: { name: "Arial", sz: 10, bold: true, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "center" },
    });

    // ── Footer row ──
    const footerRowIdx = 10 + dataRows.length;
    fillRow(footerRowIdx, {
      font: { name: "Arial", sz: 8, italic: true, color: { rgb: GREY } },
      alignment: { horizontal: "center", vertical: "center" },
    });

    // ── Write file ──
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admission Report");
    XLSX.writeFile(wb, `SK_College_Admission_Report_${now.getFullYear()}.xlsx`);
  };

  const [activeTab, setActiveTab] = useState<'Admissions' | 'Contact'>('Admissions');

  const admissionsCount = inquiries.filter(inq => inq.course !== 'Contact Inquiry').length;
  const contactCount = inquiries.filter(inq => inq.course === 'Contact Inquiry').length;

  const filteredInquiries = inquiries.filter(inq => {
    if (activeTab === 'Admissions') return inq.course !== 'Contact Inquiry';
    if (activeTab === 'Contact') return inq.course === 'Contact Inquiry';
    return false;
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
             className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-academic-navy font-black rounded-xl hover:bg-slate-50 transition-all active:opacity-80 active:translate-y-[1px]"
           >
             <Download size={20} />
             Export
           </button>
           <button 
             onClick={() => fetchInquiries(searchTerm)}
             className="flex items-center justify-center gap-2 px-6 py-3 bg-academic-gold text-academic-navy font-black rounded-xl hover:shadow-xl hover:shadow-academic-gold/20 transition-all active:opacity-80 active:translate-y-[1px]"
           >
             <Loader2 className={isLoading ? 'animate-spin' : ''} size={20} />
             Refresh
           </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl md:w-fit">
          {(['Admissions', 'Contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all flex items-center gap-2
                ${activeTab === tab 
                  ? 'bg-white text-academic-navy shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }
              `}
            >
              {tab === 'Admissions' ? 'Applications' : 'Messages'}
              <span className={`
                px-2 py-0.5 rounded-full text-[11px]
                ${activeTab === tab ? 'bg-academic-navy text-white' : 'bg-slate-200 text-slate-500'}
              `}>
                {tab === 'Admissions' ? admissionsCount : contactCount}
              </span>
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search by student name or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-100 rounded-2xl focus:border-academic-gold outline-none shadow-sm transition-all font-medium"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-academic-navy"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Data View */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold">Loading inquiries...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course/Inquiry</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-academic-navy/5 flex items-center justify-center text-academic-navy font-bold">
                            {inq.name[0]}
                          </div>
                          <span className="font-black text-academic-navy">{inq.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                            <Mail size={14} className="text-academic-gold" />
                            {inq.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                            <Phone size={14} className="text-academic-gold" />
                            {inq.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          {inq.course}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`
                          px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider
                          ${inq.status === 'Processed' ? 'bg-green-50 text-green-700' : 
                            inq.status === 'Contacted' ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-600'}
                        `}>
                          {inq.status || 'New'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-4 py-2 bg-slate-100 text-academic-navy font-black rounded-xl hover:bg-academic-navy hover:text-white transition-all text-[13px] uppercase tracking-widest active:opacity-80 active:translate-y-[1px]"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredInquiries.map((inq) => (
                <div key={inq.id} className="p-6 space-y-4 hover:bg-slate-50/30 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-academic-navy/5 flex items-center justify-center text-academic-navy font-bold">
                        {inq.name[0]}
                      </div>
                      <div>
                        <h3 className="font-black text-academic-navy">{inq.name}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase">{inq.status || 'New'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedInquiry(inq)}
                      className="p-2 bg-slate-100 rounded-xl text-academic-navy active:opacity-80 active:translate-y-[1px]"
                    >
                      <Filter size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5"><Mail size={12}/> {inq.email}</span>
                    <span className="flex items-center gap-1.5"><GraduationCap size={12}/> {inq.course}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
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
                 <button onClick={() => setSelectedInquiry(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors active:opacity-80">
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
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Father&apos;s Name</p>
                           <div className="flex items-center gap-3 text-slate-600 font-bold">
                              <User size={16} className="text-academic-gold" />
                              {selectedInquiry.father_name || 'Not Provided'}
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
                       disabled={isDeleting === selectedInquiry.id}
                       className="px-6 py-4 bg-red-50 text-red-600 font-black rounded-2xl border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2 disabled:opacity-50 active:opacity-80 active:translate-y-[1px]"
                    >
                       {isDeleting === selectedInquiry.id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                       {isDeleting === selectedInquiry.id ? 'Deleting...' : 'Delete Inquiry'}
                    </button>
                    <button 
                       onClick={() => setSelectedInquiry(null)}
                       className="flex-1 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-academic-navy/20 active:opacity-80 active:translate-y-[1px]"
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
