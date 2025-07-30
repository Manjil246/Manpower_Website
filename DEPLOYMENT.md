# Deployment Guide

## 🚀 Deploy to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `nepal-manpower-website`
3. Make it public or private as needed
4. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub

\`\`\`bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Nepal Manpower Company website"

# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/yourusername/nepal-manpower-website.git

# Push to GitHub
git push -u origin main
\`\`\`

## 🌐 Deploy to Vercel

### Method 1: Automatic Deployment (Recommended)

1. **Go to [Vercel](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. **Add Environment Variables:**
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_WHATSAPP_NUMBER=+9779876543210
   NEXT_PUBLIC_COMPANY_NAME=Nepal Manpower Company
   NEXT_PUBLIC_COMPANY_LICENSE=1234/2024/GON
   \`\`\`

7. **Click "Deploy"**

### Method 2: Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: nepal-manpower-website
# - Directory: ./
# - Override settings? No
\`\`\`

## 🗄️ Database Setup

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for setup to complete
4. Go to Settings > API to get your keys

### Step 2: Run Database Script

1. Go to SQL Editor in Supabase
2. Copy contents of `scripts/simple-setup.sql`
3. Paste and run the script
4. Verify tables are created in Table Editor

### Step 3: Update Environment Variables

Update your Vercel environment variables with:
- `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon public key
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key

## 🔧 Post-Deployment Setup

### 1. Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions

### 2. Environment Variables

Make sure all environment variables are set in Vercel:

\`\`\`bash
# Check deployment logs for any missing variables
vercel logs
\`\`\`

### 3. Test Functionality

- ✅ Homepage loads correctly
- ✅ Job listings display
- ✅ WhatsApp buttons work
- ✅ Admin panel accessible
- ✅ Contact forms submit
- ✅ Database connections work

## 🚨 Troubleshooting

### Common Issues:

1. **Build Errors**
   \`\`\`bash
   # Check build locally
   npm run build
   \`\`\`

2. **Environment Variables Not Working**
   - Ensure variables are added in Vercel dashboard
   - Redeploy after adding variables

3. **Database Connection Issues**
   - Verify Supabase credentials
   - Check RLS policies are enabled
   - Ensure database script ran successfully

4. **WhatsApp Links Not Working**
   - Verify phone number format in environment variables
   - Test WhatsApp number manually

### Deployment Commands:

\`\`\`bash
# Redeploy
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm nepal-manpower-website
\`\`\`

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor performance and usage

### Supabase Monitoring
- Check database usage in Supabase dashboard
- Monitor API requests and performance

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- Rollback to previous deployments easily

## 🎯 Performance Optimization

### After Deployment:
1. **Enable Vercel Analytics**
2. **Set up monitoring alerts**
3. **Optimize images** with Next.js Image component
4. **Enable caching** for static assets
5. **Monitor Core Web Vitals**

Your Nepal Manpower website is now live! 🎉
