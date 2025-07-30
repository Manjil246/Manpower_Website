-- Simple database setup for Nepal Manpower Company
-- Run this in Supabase SQL Editor

-- 1. Jobs table
CREATE TABLE jobs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  salary TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  description TEXT,
  requirements TEXT[],
  benefits TEXT[],
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Job categories table
CREATE TABLE job_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  job_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Testimonials table
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  testimonial TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Company stats table
CREATE TABLE company_stats (
  id BIGSERIAL PRIMARY KEY,
  workers_placed INTEGER DEFAULT 0,
  countries_served INTEGER DEFAULT 0,
  years_experience INTEGER DEFAULT 0,
  success_rate INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Contact inquiries table
CREATE TABLE contact_inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data
INSERT INTO job_categories (name, icon, color, job_count) VALUES
('Security', 'Shield', 'from-slate-600 to-slate-700', 150),
('Hotel & Restaurant', 'Hotel', 'from-slate-600 to-slate-700', 200),
('Driver', 'Car', 'from-slate-600 to-slate-700', 80),
('Construction', 'Hammer', 'from-slate-600 to-slate-700', 300),
('Cook', 'ChefHat', 'from-slate-600 to-slate-700', 120),
('Factory Worker', 'Building', 'from-slate-600 to-slate-700', 250),
('Technician', 'Wrench', 'from-slate-600 to-slate-700', 90),
('Healthcare', 'Stethoscope', 'from-slate-600 to-slate-700', 60);

INSERT INTO jobs (title, company, location, country, salary, job_type, category, description, requirements, benefits, image_url) VALUES
('Security Guard', 'Dubai Security Services', 'Dubai', 'UAE', '$800-1200/month', 'Full-time', 'Security', 
 'Experienced security guards needed for commercial buildings in Dubai.',
 ARRAY['High school education', 'Physical fitness', 'Basic English'],
 ARRAY['Free accommodation', 'Medical insurance', 'Annual leave'],
 '/placeholder.svg?height=250&width=400'),

('Hotel Waiter', 'Luxury Hotels Group', 'Doha', 'Qatar', '$700-1000/month', 'Full-time', 'Hotel & Restaurant',
 'Join our hospitality team in luxury hotels across Qatar.',
 ARRAY['Hotel experience preferred', 'Good English communication'],
 ARRAY['Shared accommodation', 'Meals provided', 'Tips allowed'],
 '/placeholder.svg?height=250&width=400');

INSERT INTO testimonials (name, job_title, location, rating, testimonial, image_url, is_featured) VALUES
('Ram Bahadur Thapa', 'Security Guard in Dubai', 'Dubai, UAE', 5, 
 'Nepal Manpower Company helped me find a great job in Dubai. The process was smooth and transparent.',
 '/placeholder.svg?height=80&width=80', true),

('Sita Kumari Shrestha', 'Hotel Staff in Qatar', 'Doha, Qatar', 5,
 'Excellent service! They guided me through every step and helped me secure a good position.',
 '/placeholder.svg?height=80&width=80', true);

INSERT INTO company_stats (workers_placed, countries_served, years_experience, success_rate) VALUES
(1000, 15, 10, 95);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON jobs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON job_categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON company_stats FOR SELECT USING (true);
