import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn('RESEND_API_KEY is missing. Email features will not work.');
}

export const resend = new Resend(apiKey || 'missing_key');
