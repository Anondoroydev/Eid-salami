-- Add upay and upay_qr columns to short_links table
ALTER TABLE short_links 
ADD COLUMN IF NOT EXISTS upay TEXT,
ADD COLUMN IF NOT EXISTS upay_qr TEXT;
