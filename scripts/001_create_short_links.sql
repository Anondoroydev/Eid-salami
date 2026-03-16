-- Create short_links table for storing payment link data
CREATE TABLE IF NOT EXISTS public.short_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(8) UNIQUE NOT NULL,
  bkash VARCHAR(20) NOT NULL,
  nagad VARCHAR(20) NOT NULL,
  rocket VARCHAR(20) NOT NULL,
  owner_name TEXT NOT NULL,
  bkash_qr TEXT,
  nagad_qr TEXT,
  rocket_qr TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on code for fast lookups
CREATE INDEX IF NOT EXISTS idx_short_links_code ON public.short_links(code);

-- Enable RLS but allow public read access (no auth required to view payment info)
ALTER TABLE public.short_links ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read short links (public payment pages)
CREATE POLICY "Allow public read access" ON public.short_links
  FOR SELECT USING (true);

-- Allow anyone to insert new short links (no auth required to create)
CREATE POLICY "Allow public insert" ON public.short_links
  FOR INSERT WITH CHECK (true);
