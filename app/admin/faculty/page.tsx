"use client";
 
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit2, 
  Mail, 
  GraduationCap, 
  UserPlus, 
  Loader2, 
  Camera,
  X,
  Save,
  Briefcase
} from 'lucide-react';
import Image from 'next/image';
import ImageCropper from '@/components/ImageCropper';
 
interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  email: string;
  experience: string;
  image_url?: string;
}
 
export default function FacultyManager() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Partial<Faculty> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
 
  const fetchFaculty = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .order('name');
    
    if (!error && data) {
      setFaculty(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFaculty();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchFaculty]);
 
  const handleOpenModal = (item?: Faculty) => {
    setEditingFaculty(item || {
      name: '',
      designation: '',
      department: 'Science',
      qualification: '',
      email: '',
      experience: '',
      image_url: ''
    });
    setIsModalOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaculty(null);
  };
 
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setTempImageUrl(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setShowCropper(false);
    setUploadingImage(true);
    try {
      const fileName = `faculty-${Date.now()}.jpg`;
      const filePath = `faculty/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, croppedBlob, {
          contentType: 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setEditingFaculty(prev => prev ? { ...prev, image_url: publicUrl } : null);
    } catch (error) {
      const err = error as { message: string };
      alert('Error uploading cropped image: ' + err.message);
    } finally {
      setUploadingImage(false);
      setTempImageUrl(null);
    }
  };
 
  const handleSave = async () => {
    if (!editingFaculty?.name || !editingFaculty?.email) {
      alert('Name and Email are required');
      return;
    }
 
    setIsSaving(true);
    try {
      if (editingFaculty.id) {
        // Update
        const { error } = await supabase
          .from('faculty')
          .update(editingFaculty)
          .eq('id', editingFaculty.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('faculty')
          .insert([editingFaculty]);
        if (error) throw error;
      }
      
      await fetchFaculty();
      handleCloseModal();
    } catch (error) {
      const err = error as { message: string };
      alert('Error saving faculty: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };
 
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this faculty member?')) return;
 
    try {
      const { error } = await supabase
        .from('faculty')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchFaculty();
    } catch (error) {
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
          <h1 className="text-3xl font-black text-academic-navy tracking-tight">Faculty Management</h1>
          <p className="text-slate-500 font-medium">Add, edit, or remove teaching staff records.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-academic-navy/20 active:scale-95"
        >
          <UserPlus size={20} />
          Add Faculty
        </button>
      </div>
 
      {/* Table View */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Faculty Member</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Experience</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {faculty.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                    No faculty records found. Start by adding one.
                  </td>
                </tr>
              ) : faculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative border border-slate-200 shadow-sm">
                          {f.image_url ? (
                            <Image src={f.image_url} alt={f.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                              <Users size={24} className="text-slate-300" />
                            </div>
                          )}
                       </div>
                       <div>
                          <p className="font-black text-academic-navy">{f.name}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{f.designation}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                       {f.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <Briefcase size={14} className="text-academic-gold" />
                        {f.experience}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(f)}
                        className="p-2.5 text-slate-400 hover:text-academic-navy transition-all hover:bg-slate-100 rounded-xl"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(f.id)}
                        className="p-2.5 text-slate-400 hover:text-red-500 transition-all hover:bg-red-50 rounded-xl"
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
 
      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-academic-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
              {/* Modal Header */}
              <div className="bg-academic-navy p-8 text-white flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-black tracking-tight">{editingFaculty?.id ? 'Edit Profile' : 'New Faculty Member'}</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Personnel Information System</p>
                 </div>
                 <button onClick={handleCloseModal} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} />
                 </button>
              </div>
 
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Profile Image Section */}
                    <div className="md:col-span-2 flex flex-col items-center justify-center py-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                       <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-4 group/img">
                          {editingFaculty?.image_url ? (
                             <Image src={editingFaculty.image_url} alt="Preview" fill className="object-cover" />
                          ) : (
                             <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                <Users size={48} className="text-slate-300" />
                             </div>
                          )}
                          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer transition-opacity">
                             {uploadingImage ? <Loader2 className="animate-spin text-white" /> : <Camera className="text-white" />}
                             <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                          </label>
                       </div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Photo</p>
                    </div>
 
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                       <input 
                          type="text" 
                          value={editingFaculty?.name}
                          onChange={e => setEditingFaculty(p => ({...p!, name: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all font-medium" 
                          placeholder="Dr. Rajesh Kumar" 
                       />
                    </div>
 
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Designation</label>
                       <input 
                          type="text" 
                          value={editingFaculty?.designation}
                          onChange={e => setEditingFaculty(p => ({...p!, designation: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all font-medium" 
                          placeholder="Associate Professor" 
                       />
                    </div>
 
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Department</label>
                       <select 
                          value={editingFaculty?.department}
                          onChange={e => setEditingFaculty(p => ({...p!, department: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold outline-none font-medium appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em_1em]"
                       >
                          <option>Science</option>
                          <option>Commerce</option>
                          <option>Arts</option>
                       </select>
                    </div>
 
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                       <input 
                          type="email" 
                          value={editingFaculty?.email}
                          onChange={e => setEditingFaculty(p => ({...p!, email: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all font-medium" 
                          placeholder="rajesh.k@skcollege.com" 
                       />
                    </div>
 
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Qualification</label>
                       <input 
                          type="text" 
                          value={editingFaculty?.qualification}
                          onChange={e => setEditingFaculty(p => ({...p!, qualification: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all font-medium" 
                          placeholder="Ph.D. in Physics" 
                       />
                    </div>
 
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Experience</label>
                       <input 
                          type="text" 
                          value={editingFaculty?.experience}
                          onChange={e => setEditingFaculty(p => ({...p!, experience: e.target.value}))}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-academic-gold focus:ring-4 focus:ring-academic-gold/10 outline-none transition-all font-medium" 
                          placeholder="15 Years" 
                       />
                    </div>
                 </div>
              </div>
 
              <div className="p-8 bg-slate-50 flex gap-4">
                 <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-academic-navy/20 disabled:opacity-50"
                 >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {editingFaculty?.id ? 'Update Record' : 'Enroll Faculty'}
                 </button>
                 <button 
                    onClick={handleCloseModal}
                    className="px-8 py-4 bg-white text-slate-500 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
                 >
                    Discard
                 </button>
              </div>
           </div>
        </div>
      )}
      {showCropper && tempImageUrl && (
        <ImageCropper 
          image={tempImageUrl} 
          onCropComplete={handleCropComplete} 
          onCancel={() => {
            setShowCropper(false);
            setTempImageUrl(null);
          }}
          aspect={1}
        />
      )}
    </div>
  );
}
