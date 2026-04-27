"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Send, Loader2 } from 'lucide-react';
import { inquirySchema, InquiryFormValues } from '@/lib/validations';
import { submitInquiry } from '@/app/actions/inquiry';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const courses = [
  "B.Sc. Honours (Comp. Science)",
  "B.Sc. Honours (Physics)",
  "B.Sc. Honours (Chemistry)",
  "B.Sc. Honours (Mathematics)",
  "B.Sc. Honours (Botany)",
  "B.Sc. Honours (Zoology)",
  "B.Com. Honours (Comp. Applications)",
  "B.A. Honours (Political Science)",
  "M.Sc. Organic Chemistry"
];

const intermediateGroups = ["MPC", "BiPC", "CEC", "HEC", "MEC", "Other"];

export default function AdmissionsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      gender: "Male",
      intermediateGroup: ""
    }
  });

  const selectedGroup = watch('intermediateGroup');

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await submitInquiry(data);

      if (!result.success) {
        if (result.error === 'duplicate') {
          alert('An application with this email or phone number already exists. Our team will contact you shortly!');
          return;
        }
        throw new Error(result.message);
      }
      
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      alert(`Error: ${err.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-academic-navy mb-4">Inquiry Received!</h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Thank you for your interest in S.K. Degree & P.G. College. Our admissions 
          officer will contact you shortly on your provided mobile number.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-academic-gold font-bold hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Student Name</label>
          <input
            {...register('name')}
            className={cn(
              "w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:ring-2 focus:ring-academic-gold/20 outline-none",
              errors.name ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-academic-gold"
            )}
            placeholder="Enter student full name"
          />
          {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
        </div>

        {/* Father's Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Father&apos;s Name</label>
          <input
            {...register('father_name')}
            className={cn(
              "w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:ring-2 focus:ring-academic-gold/20 outline-none",
              errors.father_name ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-academic-gold"
            )}
            placeholder="Enter father's name"
          />
          {errors.father_name && <p className="text-xs text-red-500 font-medium">{errors.father_name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
          <input
            {...register('email')}
            type="email"
            spellCheck={false}
            className={cn(
              "w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:ring-2 focus:ring-academic-gold/20 outline-none",
              errors.email ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-academic-gold"
            )}
            placeholder="example@mail.com"
          />
          {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Mobile Number</label>
          <input
            {...register('phone')}
            spellCheck={false}
            className={cn(
              "w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:ring-2 focus:ring-academic-gold/20 outline-none",
              errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-academic-gold"
            )}
            placeholder="10-digit mobile number"
          />
          {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Gender</label>
          <select
            {...register('gender')}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:border-academic-gold focus:ring-2 focus:ring-academic-gold/20 outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Intermediate Group Filters */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Intermediate Group</label>
          <div className="flex flex-wrap gap-2">
            {intermediateGroups.map(group => (
              <button
                key={group}
                type="button"
                onClick={() => setValue('intermediateGroup', group)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300",
                  selectedGroup === group 
                    ? "bg-academic-gold text-academic-navy border-academic-gold shadow-md" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-academic-gold/50"
                )}
              >
                {group}
              </button>
            ))}
          </div>
          <input type="hidden" {...register('intermediateGroup')} />
          {errors.intermediateGroup && <p className="text-xs text-red-500 font-medium">{errors.intermediateGroup.message}</p>}
        </div>

        {/* Other Group (Conditional) */}
        {selectedGroup === 'Other' && (
          <div className="col-span-full space-y-2 animate-in slide-in-from-top-2 duration-300">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Specify Your Group</label>
            <input
              {...register('otherGroup')}
              autoFocus
              className={cn(
                "w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:ring-2 focus:ring-academic-gold/20 outline-none",
                errors.otherGroup ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-academic-gold"
              )}
              placeholder="Type your group name here..."
            />
            {errors.otherGroup && <p className="text-xs text-red-500 font-medium">{errors.otherGroup.message}</p>}
          </div>
        )}

        {/* Course Interest */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Course Interested In</label>
          <select
            {...register('courseInterest')}
            className={cn(
              "w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:ring-2 focus:ring-academic-gold/20 outline-none",
              errors.courseInterest ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-academic-gold"
            )}
          >
            <option value="">Select a program</option>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.courseInterest && <p className="text-xs text-red-500 font-medium">{errors.courseInterest.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Address</label>
        <textarea
          {...register('address')}
          rows={3}
          className={cn(
            "w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:ring-2 focus:ring-academic-gold/20 outline-none",
            errors.address ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-academic-gold"
          )}
          placeholder="Enter your permanent address"
        />
        {errors.address && <p className="text-xs text-red-500 font-medium">{errors.address.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-academic-navy text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-academic-navy/20 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Processing…
          </>
        ) : (
          <>
            <Send size={20} />
            Submit Inquiry
          </>
        )}
      </button>
    </form>
  );
}
