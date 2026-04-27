'use server';

import { resend } from '@/lib/resend';
import { supabase } from '@/lib/supabase';
import { InquiryReplyEmail } from '@/emails/InquiryReply';
import { inquirySchema, InquiryFormValues, contactSchema, ContactFormValues } from '@/lib/validations';
import { render } from '@react-email/render';

export async function submitContactMessage(formData: ContactFormValues) {
  try {
    // 1. Validate data
    const validatedData = contactSchema.parse(formData);
    const email = validatedData.email.trim().toLowerCase();
    const phone = validatedData.phone.trim();

    // 2. Insert into Supabase
    const { error: insertError } = await supabase.from('inquiries').insert([
      {
        name: validatedData.name.trim(),
        email: email,
        phone: phone,
        message: validatedData.message.trim(),
        course: 'Contact Inquiry',
        status: 'New'
      }
    ]);

    if (insertError) throw insertError;

    // 3. Render Email to HTML
    const emailHtml = await render(InquiryReplyEmail({
      studentName: validatedData.name,
      courseInterest: 'College Information',
    }));

    // 4. Send Professional Reply via Resend
    const { data, error: emailError } = await resend.emails.send({
      from: 'admin@skdegreecollege.com',
      to: email,
      replyTo: 'admin@skdegreecollege.com',
      subject: 'Thank you for contacting SK Degree & PG College',
      html: emailHtml,
    });

    if (emailError) {
      console.error('Resend API Error:', emailError);
      return { success: false, error: 'email_fail', message: `Email failed: ${emailError.message}` };
    }

    console.log('Contact email sent successfully, ID:', data?.id);
    return { success: true };
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return { success: false, message: error.message || 'Failed to send message' };
  }
}

export async function submitInquiry(formData: InquiryFormValues) {
  try {
    // 1. Validate data
    const validatedData = inquirySchema.parse(formData);
    const email = validatedData.email.trim().toLowerCase();
    const phone = validatedData.phone.trim();

    // 2. Check for duplicates
    const { data: existing, error: checkError } = await supabase
      .from('inquiries')
      .select('id')
      .or(`email.eq."${email}",phone.eq."${phone}"`)
      .maybeSingle();

    if (checkError) {
      console.error('Duplicate check error:', checkError);
    }

    if (existing) {
      return { success: false, error: 'duplicate', message: 'An inquiry with this email or phone already exists.' };
    }

    // 3. Insert into Supabase
    const finalGroup = validatedData.intermediateGroup === 'Other' 
      ? (validatedData.otherGroup || 'Other') 
      : validatedData.intermediateGroup;

    const { error: insertError } = await supabase.from('inquiries').insert([
      {
        name: validatedData.name.trim(),
        father_name: validatedData.father_name.trim(),
        email: email,
        phone: phone,
        course: validatedData.courseInterest,
        message: `Group: ${finalGroup} | Address: ${validatedData.address}`,
        gender: validatedData.gender,
        status: 'New'
      }
    ]);

    if (insertError) throw insertError;

    // 4. Render Email to HTML
    const emailHtml = await render(InquiryReplyEmail({
      studentName: validatedData.name,
      courseInterest: validatedData.courseInterest,
    }));

    // 5. Send Professional Reply via Resend
    const { data, error: emailError } = await resend.emails.send({
      from: 'admin@skdegreecollege.com',
      to: email,
      replyTo: 'admin@skdegreecollege.com',
      subject: 'Thank you for your inquiry - SK Degree & PG College',
      html: emailHtml,
    });

    if (emailError) {
      console.error('Resend API Error:', emailError);
      return { success: false, error: 'email_fail', message: `Email failed: ${emailError.message}` };
    }

    console.log('Inquiry email sent successfully, ID:', data?.id);
    return { success: true };
  } catch (error: any) {
    console.error('Inquiry submission error:', error);
    return { success: false, error: 'internal', message: error.message || 'Failed to submit inquiry' };
  }
}
