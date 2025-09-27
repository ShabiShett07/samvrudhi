# PostgreSQL Setup for Samvrudhi Project

## Option 1: Quick Setup with Neon (Recommended)

1. **Go to [Neon Console](https://console.neon.tech/)**
   - Sign up or login with your GitHub account
   - Create a new project called "samvrudhi"
   - Copy the connection string that looks like:
     ```
     postgresql://username:password@ep-name.region.neon.tech/dbname?sslmode=require
     ```

2. **Add Environment Variables to Vercel**
   ```bash
   npx vercel env add POSTGRES_URL
   npx vercel env add JWT_SECRET
   ```

   When prompted:
   - **POSTGRES_URL**: Paste your Neon connection string
   - **JWT_SECRET**: Use a secure random string (e.g., `your-super-secret-jwt-key-2024-samvrudhi`)

## Option 2: Manual Environment Setup

Run these commands to set up environment variables:

```bash
# Add PostgreSQL connection string
npx vercel env add POSTGRES_URL "postgresql://username:password@host:5432/database"

# Add JWT secret for authentication
npx vercel env add JWT_SECRET "your-super-secret-jwt-key-2024-samvrudhi"

# Pull environment variables to local
npx vercel env pull .env.local
```

## Option 3: Use Supabase

1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Get the connection string from Settings > Database
4. Use it as your POSTGRES_URL

## After Setup

1. **Deploy the changes:**
   ```bash
   git add . && git commit -m "Add PostgreSQL setup" && git push
   ```

2. **Initialize the database:**
   ```bash
   curl -X POST https://samvrudhi.vercel.app/api/init-db
   ```

3. **Test registration:**
   - Go to your deployed site
   - Try registering a new user
   - Check if it works without getting stuck

## Environment Variables Needed

```env
POSTGRES_URL="postgresql://username:password@host:5432/database"
JWT_SECRET="your-super-secret-jwt-key-2024-samvrudhi"
NODE_ENV="production"
```

## Troubleshooting

- If API endpoints return 404, ensure the `api/` folder is deployed
- If database connection fails, check the POSTGRES_URL format
- If authentication fails, verify JWT_SECRET is set