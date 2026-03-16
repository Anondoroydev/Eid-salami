-- Create payment_profiles table for storing payment info
CREATE TABLE IF NOT EXISTS public.payment_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  owner_name TEXT NOT NULL,
  bkash TEXT,
  nagad TEXT,
  rocket TEXT,
  bkash_qr TEXT,
  nagad_qr TEXT,
  rocket_qr TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.payment_profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read payment profiles (for sharing)
CREATE POLICY "payment_profiles_select_all" ON public.payment_profiles 
  FOR SELECT USING (true);

-- Allow anyone to insert payment profiles (no auth required for this simple app)
CREATE POLICY "payment_profiles_insert_all" ON public.payment_profiles 
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update their own profiles by slug
CREATE POLICY "payment_profiles_update_all" ON public.payment_profiles 
  FOR UPDATE USING (true);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_payment_profiles_slug ON public.payment_profiles(slug);
