-- =============================================
-- S.K. Degree College - Supabase Setup Script
-- Run this in: Supabase Dashboard > SQL Editor
-- =============================================

-- 1. Fix notices table: add isPinned column
ALTER TABLE notices ADD COLUMN IF NOT EXISTS "isPinned" BOOLEAN DEFAULT false;

-- 2. Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  category TEXT DEFAULT 'Campus',
  image_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (allow public reads, authenticated writes)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read news" ON news
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage news" ON news
  FOR ALL USING (auth.role() = 'authenticated');

-- 3. Create storage buckets for images and documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Storage policies: allow public reads, authenticated uploads
CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Auth upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Public read documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Auth upload documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete documents" ON storage.objects
  FOR DELETE USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
