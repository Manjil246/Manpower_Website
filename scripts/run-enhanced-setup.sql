-- Enhanced database setup with real-time support for Nepal Manpower Company

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS company_stats CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS job_categories CASCADE;

-- 1. Job categories table with enhanced fields
CREATE TABLE job_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  job_count INTEGER DEFAULT 0,
  description TEXT,
  average_salary TEXT,
  top_countries TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Jobs table with enhanced fields
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

-- 3. Testimonials table with enhanced fields
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  testimonial TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  category TEXT,
  salary TEXT,
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

-- Insert enhanced job categories with detailed information
INSERT INTO job_categories (name, icon, color, job_count, description, average_salary, top_countries) VALUES
('Security', 'Shield', 'from-slate-600 to-slate-700', 150, 'Professional security positions in commercial buildings, residential complexes, and corporate offices.', '$800-1200/month', ARRAY['UAE', 'Qatar', 'Saudi Arabia']),
('Hotel & Restaurant', 'Hotel', 'from-slate-600 to-slate-700', 200, 'Hospitality roles in luxury hotels, restaurants, and resorts worldwide.', '$700-1000/month', ARRAY['Qatar', 'UAE', 'Malaysia']),
('Driver', 'Car', 'from-slate-600 to-slate-700', 80, 'Professional driving positions for companies, executives, and transportation services.', '$800-1100/month', ARRAY['UAE', 'Saudi Arabia', 'Kuwait']),
('Construction', 'Hammer', 'from-slate-600 to-slate-700', 300, 'Construction and infrastructure projects including buildings, roads, and bridges.', '$900-1300/month', ARRAY['Saudi Arabia', 'UAE', 'Qatar']),
('Cook', 'ChefHat', 'from-slate-600 to-slate-700', 120, 'Culinary positions in restaurants, hotels, and catering services.', '$750-1050/month', ARRAY['Kuwait', 'UAE', 'Qatar']),
('Factory Worker', 'Building', 'from-slate-600 to-slate-700', 250, 'Manufacturing and production roles in various industries.', '$600-900/month', ARRAY['Malaysia', 'UAE', 'Oman']),
('Technician', 'Wrench', 'from-slate-600 to-slate-700', 90, 'Technical and maintenance positions requiring specialized skills.', '$900-1200/month', ARRAY['UAE', 'Saudi Arabia', 'Qatar']),
('Healthcare', 'Stethoscope', 'from-slate-600 to-slate-700', 60, 'Healthcare support roles in hospitals and medical facilities.', '$800-1100/month', ARRAY['UAE', 'Qatar', 'Kuwait']);

-- Insert sample jobs with real data
INSERT INTO jobs (title, company, location, country, salary, job_type, category, description, requirements, benefits, image_url) VALUES
('Security Guard', 'Dubai Security Services', 'Dubai', 'UAE', '$800-1200/month', 'Full-time', 'Security', 
 'Experienced security guards needed for commercial buildings and residential complexes in Dubai. Must have good physical fitness and basic English communication skills.',
 ARRAY['High school education', 'Physical fitness', 'Basic English', 'No criminal record', 'Previous security experience preferred'],
 ARRAY['Free accommodation', 'Medical insurance', 'Annual leave', 'End of service benefits', 'Overtime pay'],
 '/placeholder.svg?height=250&width=400'),

('Hotel Waiter', 'Luxury Hotels Group', 'Doha', 'Qatar', '$700-1000/month', 'Full-time', 'Hotel & Restaurant',
 'Join our hospitality team in luxury hotels across Qatar. Provide excellent customer service in fine dining restaurants.',
 ARRAY['Hotel experience preferred', 'Good English communication', 'Customer service skills', 'Professional appearance', 'Flexibility with shifts'],
 ARRAY['Shared accommodation', 'Meals provided', 'Tips allowed', 'Career growth opportunities', 'Training programs'],
 '/placeholder.svg?height=250&width=400'),

('Construction Worker', 'BuildCorp International', 'Riyadh', 'Saudi Arabia', '$900-1300/month', 'Contract', 'Construction',
 'Skilled construction workers for major infrastructure projects including buildings, roads, and bridges.',
 ARRAY['Construction experience', 'Physical fitness', 'Safety awareness', 'Team work skills', 'Ability to work in hot weather'],
 ARRAY['Free accommodation', 'Transportation', 'Overtime pay', 'Safety equipment provided', 'Medical coverage'],
 '/placeholder.svg?height=250&width=400'),

('Factory Operator', 'Manufacturing Plus', 'Kuala Lumpur', 'Malaysia', '$600-900/month', 'Full-time', 'Factory Worker',
 'Machine operators needed for electronics manufacturing facility. Training will be provided.',
 ARRAY['Basic education', 'Attention to detail', 'Ability to work shifts', 'Quick learner', 'No experience required'],
 ARRAY['Accommodation allowance', 'Medical benefits', 'Bonus payments', 'Skill development', 'Free training'],
 '/placeholder.svg?height=250&width=400'),

('Professional Driver', 'Transport Solutions', 'Abu Dhabi', 'UAE', '$800-1100/month', 'Full-time', 'Driver',
 'Experienced drivers for company vehicles and executive transportation services.',
 ARRAY['Valid driving license', '3+ years experience', 'Clean driving record', 'GPS navigation skills', 'Professional appearance'],
 ARRAY['Company vehicle', 'Fuel allowance', 'Mobile phone', 'Performance bonuses', 'Medical insurance'],
 '/placeholder.svg?height=250&width=400'),

('Restaurant Cook', 'International Cuisine', 'Kuwait City', 'Kuwait', '$750-1050/month', 'Full-time', 'Cook',
 'Experienced cooks for international restaurant chain. Must be skilled in various cuisines.',
 ARRAY['Cooking experience', 'Food safety knowledge', 'Creativity', 'Time management', 'Multi-cuisine skills'],
 ARRAY['Staff meals', 'Accommodation', 'Annual bonus', 'Recipe training', 'Career advancement'],
 '/placeholder.svg?height=250&width=400');

-- Insert testimonials with categories
INSERT INTO testimonials (name, job_title, location, rating, testimonial, image_url, is_featured, category, salary) VALUES
('Ram Bahadur Thapa', 'Security Guard', 'Dubai, UAE', 5, 
 'Nepal Manpower Company helped me find a great job in Dubai. The process was smooth and transparent. I am very satisfied with their service and the salary is exactly as promised.',
 '/placeholder.svg?height=80&width=80', true, 'Security', '$1200/month'),

('Sita Kumari Shrestha', 'Hotel Staff', 'Doha, Qatar', 5,
 'Excellent service! They guided me through every step and helped me secure a good position in a luxury hotel in Doha. The working environment is great and colleagues are supportive.',
 '/placeholder.svg?height=80&width=80', true, 'Hotel & Restaurant', '$950/month'),

('Krishna Prasad Sharma', 'Construction Worker', 'Riyadh, Saudi Arabia', 5,
 'Professional and reliable agency. They found me a well-paying construction job with good accommodation and benefits. The company treats us well and provides all safety equipment.',
 '/placeholder.svg?height=80&width=80', true, 'Construction', '$1100/month'),

('Maya Gurung', 'Factory Worker', 'Kuala Lumpur, Malaysia', 5,
 'I am grateful to Nepal Manpower Company for helping me start my career abroad. The salary and working conditions are excellent. The factory provides good training and the management is very supportive.',
 '/placeholder.svg?height=80&width=80', true, 'Factory Worker', '$800/month'),

('Bikash Tamang', 'Professional Driver', 'Abu Dhabi, UAE', 5,
 'Working as a driver in UAE has been a great experience. Nepal Manpower Company arranged everything properly and the employer is very professional. Good salary and benefits.',
 '/placeholder.svg?height=80&width=80', true, 'Driver', '$1000/month'),

('Sunita Rai', 'Restaurant Cook', 'Kuwait City, Kuwait', 5,
 'I love working as a cook here in Kuwait. The restaurant management appreciates my skills and I have learned many new recipes. Nepal Manpower Company made the whole process very easy.',
 '/placeholder.svg?height=80&width=80', true, 'Cook', '$900/month');

-- Insert company stats
INSERT INTO company_stats (workers_placed, countries_served, years_experience, success_rate) VALUES
(1247, 15, 10, 94);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_country ON jobs(country);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_category ON testimonials(category);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for active jobs" ON jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Enable read access for job categories" ON job_categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for featured testimonials" ON testimonials FOR SELECT USING (is_featured = true);
CREATE POLICY "Enable read access for company stats" ON company_stats FOR SELECT USING (true);

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

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_stats_updated_at BEFORE UPDATE ON company_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
