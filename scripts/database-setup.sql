-- Create tables for Nepal Manpower Company

-- 1. Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  salary VARCHAR(100) NOT NULL,
  job_type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  category VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  description TEXT,
  requirements TEXT[],
  benefits TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Job categories table
CREATE TABLE IF NOT EXISTS job_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL,
  job_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  testimonial TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Company stats table
CREATE TABLE IF NOT EXISTS company_stats (
  id SERIAL PRIMARY KEY,
  workers_placed INTEGER DEFAULT 0,
  countries_served INTEGER DEFAULT 0,
  years_experience INTEGER DEFAULT 0,
  success_rate INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial data (only if tables are empty)

-- Insert job categories
INSERT INTO job_categories (name, icon, color, job_count) 
SELECT * FROM (VALUES
  ('Security', 'Shield', 'from-slate-600 to-slate-700', 150),
  ('Hotel & Restaurant', 'Hotel', 'from-slate-600 to-slate-700', 200),
  ('Driver', 'Car', 'from-slate-600 to-slate-700', 80),
  ('Construction', 'Hammer', 'from-slate-600 to-slate-700', 300),
  ('Cook', 'ChefHat', 'from-slate-600 to-slate-700', 120),
  ('Factory Worker', 'Building', 'from-slate-600 to-slate-700', 250),
  ('Technician', 'Wrench', 'from-slate-600 to-slate-700', 90),
  ('Healthcare', 'Stethoscope', 'from-slate-600 to-slate-700', 60)
) AS v(name, icon, color, job_count)
WHERE NOT EXISTS (SELECT 1 FROM job_categories);

-- Insert sample jobs
INSERT INTO jobs (title, company, location, country, salary, job_type, category, description, requirements, benefits, image_url) 
SELECT * FROM (VALUES
  ('Security Guard', 'Dubai Security Services', 'Dubai', 'UAE', '$800-1200/month', 'Full-time', 'Security', 
   'Experienced security guards needed for commercial buildings and residential complexes in Dubai. Must have good physical fitness and basic English communication skills.',
   ARRAY['High school education', 'Physical fitness', 'Basic English', 'No criminal record'],
   ARRAY['Free accommodation', 'Medical insurance', 'Annual leave', 'End of service benefits'],
   '/placeholder.svg?height=250&width=400'),

  ('Hotel Waiter', 'Luxury Hotels Group', 'Doha', 'Qatar', '$700-1000/month', 'Full-time', 'Hotel & Restaurant',
   'Join our hospitality team in luxury hotels across Qatar. Provide excellent customer service in fine dining restaurants.',
   ARRAY['Hotel experience preferred', 'Good English communication', 'Customer service skills', 'Professional appearance'],
   ARRAY['Shared accommodation', 'Meals provided', 'Tips allowed', 'Career growth opportunities'],
   '/placeholder.svg?height=250&width=400'),

  ('Construction Worker', 'BuildCorp International', 'Riyadh', 'Saudi Arabia', '$900-1300/month', 'Contract', 'Construction',
   'Skilled construction workers for major infrastructure projects including buildings, roads, and bridges.',
   ARRAY['Construction experience', 'Physical fitness', 'Safety awareness', 'Team work skills'],
   ARRAY['Free accommodation', 'Transportation', 'Overtime pay', 'Safety equipment provided'],
   '/placeholder.svg?height=250&width=400'),

  ('Factory Operator', 'Manufacturing Plus', 'Kuala Lumpur', 'Malaysia', '$600-900/month', 'Full-time', 'Factory Worker',
   'Machine operators needed for electronics manufacturing facility. Training will be provided.',
   ARRAY['Basic education', 'Attention to detail', 'Ability to work shifts', 'Quick learner'],
   ARRAY['Accommodation allowance', 'Medical benefits', 'Bonus payments', 'Skill development'],
   '/placeholder.svg?height=250&width=400')
) AS v(title, company, location, country, salary, job_type, category, description, requirements, benefits, image_url)
WHERE NOT EXISTS (SELECT 1 FROM jobs);

-- Insert testimonials
INSERT INTO testimonials (name, job_title, location, rating, testimonial, image_url, is_featured) 
SELECT * FROM (VALUES
  ('Ram Bahadur Thapa', 'Security Guard in Dubai', 'Dubai, UAE', 5, 
   'Nepal Manpower Company helped me find a great job in Dubai. The process was smooth and transparent. I am very satisfied with their service.',
   '/placeholder.svg?height=80&width=80', true),

  ('Sita Kumari Shrestha', 'Hotel Staff in Qatar', 'Doha, Qatar', 5,
   'Excellent service! They guided me through every step and helped me secure a good position in a luxury hotel in Doha.',
   '/placeholder.svg?height=80&width=80', true),

  ('Krishna Prasad Sharma', 'Construction Worker in Saudi Arabia', 'Riyadh, Saudi Arabia', 5,
   'Professional and reliable agency. They found me a well-paying construction job with good accommodation and benefits.',
   '/placeholder.svg?height=80&width=80', true),

  ('Maya Gurung', 'Factory Worker in Malaysia', 'Kuala Lumpur, Malaysia', 5,
   'I am grateful to Nepal Manpower Company for helping me start my career abroad. The salary and working conditions are excellent.',
   '/placeholder.svg?height=80&width=80', true)
) AS v(name, job_title, location, rating, testimonial, image_url, is_featured)
WHERE NOT EXISTS (SELECT 1 FROM testimonials);

-- Insert company stats
INSERT INTO company_stats (workers_placed, countries_served, years_experience, success_rate) 
SELECT 1000, 15, 10, 95
WHERE NOT EXISTS (SELECT 1 FROM company_stats);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_country ON jobs(country);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);

-- Enable Row Level Security (RLS) - Supabase handles this automatically
-- These policies will work with Supabase's built-in authentication

-- Create policies for public read access
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Public can view active jobs" ON jobs;
  DROP POLICY IF EXISTS "Public can view job categories" ON job_categories;
  DROP POLICY IF EXISTS "Public can view featured testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Public can view company stats" ON company_stats;
  
  -- Create new policies
  CREATE POLICY "Public can view active jobs" ON jobs FOR SELECT USING (status = 'active');
  CREATE POLICY "Public can view job categories" ON job_categories FOR SELECT USING (true);
  CREATE POLICY "Public can view featured testimonials" ON testimonials FOR SELECT USING (is_featured = true);
  CREATE POLICY "Public can view company stats" ON company_stats FOR SELECT USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create function to update job counts in categories
CREATE OR REPLACE FUNCTION update_category_job_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE job_categories 
    SET job_count = job_count + 1 
    WHERE name = NEW.category;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE job_categories 
    SET job_count = job_count - 1 
    WHERE name = OLD.category;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.category != NEW.category THEN
      UPDATE job_categories 
      SET job_count = job_count - 1 
      WHERE name = OLD.category;
      UPDATE job_categories 
      SET job_count = job_count + 1 
      WHERE name = NEW.category;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update job counts
DROP TRIGGER IF EXISTS update_category_job_count_trigger ON jobs;
CREATE TRIGGER update_category_job_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_category_job_count();
