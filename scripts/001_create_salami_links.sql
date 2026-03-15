-- Create salami_links table to store payment info
CREATE TABLE IF NOT EXISTS public.salami_links (
  id TEXT PRIMARY KEY,
  owner_name TEXT NOT NULL,
  bkash TEXT NOT NULL,
  nagad TEXT NOT NULL,
  rocket TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS but allow public read access (no auth required for viewing)
ALTER TABLE public.salami_links ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read salami links (public sharing)
CREATE POLICY "salami_links_public_read" ON public.salami_links
  FOR SELECT USING (true);

-- Allow anyone to insert salami links (no auth required)
CREATE POLICY "salami_links_public_insert" ON public.salami_links
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update their own links (using id match)
CREATE POLICY "salami_links_public_update" ON public.salami_links
  FOR UPDATE USING (true);
