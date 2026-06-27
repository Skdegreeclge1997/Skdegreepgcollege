-- Migration UP: Setup Row Level Security and Policies

-- =========================================================================
-- 1. Setup Safe Admin Check Function (Prevents RLS recursion)
-- =========================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
  -- 1. Check JWT claim first (most efficient, zero DB query)
  IF (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' THEN
    RETURN TRUE;
  END IF;

  -- 2. Fallback to profiles table check using security definer
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 2. Profiles Table
-- =========================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Allow admins full access to profiles"
ON public.profiles FOR ALL
TO authenticated
USING (public.is_admin());

-- =========================================================================
-- 3. Inquiries Table (Admissions & Contact Forms)
-- =========================================================================
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts for inquiries"
ON public.inquiries FOR INSERT
WITH CHECK (true); -- Anyone can submit a form

CREATE POLICY "Allow admins full access to inquiries"
ON public.inquiries FOR ALL
TO authenticated
USING (public.is_admin());

-- =========================================================================
-- 4. Notices Table
-- =========================================================================
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to notices"
ON public.notices FOR SELECT
USING (true);

CREATE POLICY "Allow admins full access to notices"
ON public.notices FOR ALL
TO authenticated
USING (public.is_admin());

-- =========================================================================
-- 5. News Table
-- =========================================================================
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to news"
ON public.news FOR SELECT
USING (true);

CREATE POLICY "Allow admins full access to news"
ON public.news FOR ALL
TO authenticated
USING (public.is_admin());

-- =========================================================================
-- 6. Gallery Images Table
-- =========================================================================
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to gallery_images"
ON public.gallery_images FOR SELECT
USING (true);

CREATE POLICY "Allow admins full access to gallery_images"
ON public.gallery_images FOR ALL
TO authenticated
USING (public.is_admin());

-- =========================================================================
-- 7. Gallery Videos Table
-- =========================================================================
ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to gallery_videos"
ON public.gallery_videos FOR SELECT
USING (true);

CREATE POLICY "Allow admins full access to gallery_videos"
ON public.gallery_videos FOR ALL
TO authenticated
USING (public.is_admin());

-- =========================================================================
-- 8. NIRF Documents Table
-- =========================================================================
ALTER TABLE public.nirf_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to nirf_documents"
ON public.nirf_documents FOR SELECT
USING (true);

CREATE POLICY "Allow admins full access to nirf_documents"
ON public.nirf_documents FOR ALL
TO authenticated
USING (public.is_admin());
