# 🗄️ Complete PostgreSQL Setup Guide

## Current Status ✅
- ✅ Environment variables configured on Vercel
- ✅ API endpoints deployed
- ✅ Fallback system (localStorage) working
- ✅ Registration form no longer gets stuck

## Quick Setup (5 minutes)

### Step 1: Create a Free PostgreSQL Database

**Option A: Neon (Recommended)**
1. Go to [https://console.neon.tech/](https://console.neon.tech/)
2. Sign up with GitHub
3. Create new project: "samvrudhi"
4. Copy the connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require
   ```

**Option B: Supabase**
1. Go to [https://supabase.com/](https://supabase.com/)
2. Create new project: "samvrudhi"
3. Go to Settings → Database
4. Copy the connection string

### Step 2: Update Environment Variables

```bash
# Update the PostgreSQL URL with your real database
npx vercel env rm POSTGRES_URL production
echo "YOUR_REAL_CONNECTION_STRING" | npx vercel env add POSTGRES_URL production

# Trigger a new deployment
git add . && git commit -m "Update database configuration" && git push
```

### Step 3: Initialize Database (after deployment)

```bash
# Wait 1-2 minutes for deployment, then run:
curl -X POST https://samvrudhi.vercel.app/api/init-db

# Expected response:
# {"message":"Database initialized successfully","tables":["users","landlord_profiles","worker_profiles"]}
```

### Step 4: Test Registration

1. Go to your live website: https://samvrudhi.vercel.app
2. Navigate to registration
3. Fill out the form and register
4. Should work without getting stuck!

## What Happens Next

### Local Development (localhost)
- Uses localStorage fallback
- No database required
- Perfect for testing UI/UX

### Production (Vercel deployment)
- Uses real PostgreSQL database
- Proper user authentication
- Data persistence across sessions

## Database Schema

The system creates these tables automatically:

### `users` table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `user_type` ('landlord' or 'worker')
- `first_name`, `last_name`
- `phone`, `address`
- `created_at`, `updated_at`

### `landlord_profiles` table
- `user_id` (Foreign Key → users.id)
- `properties` (number range)
- `experience` (experience level)

### `worker_profiles` table
- `user_id` (Foreign Key → users.id)
- `services` (array of services)
- `hourly_rate`
- `availability`
- `certifications`

## Commands Reference

```bash
# View environment variables
npx vercel env ls

# Add new environment variable
npx vercel env add VARIABLE_NAME production

# Remove environment variable
npx vercel env rm VARIABLE_NAME production

# Pull env vars locally
npx vercel env pull .env.local

# Deploy changes
git add . && git commit -m "Update" && git push

# Initialize database
curl -X POST https://samvrudhi.vercel.app/api/init-db

# Test registration endpoint
curl -X POST https://samvrudhi.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"password123","userType":"landlord","address":"Test Address","properties":"1-5","experience":"new"}'
```

## Troubleshooting

### API returns 404
- Wait 1-2 minutes after deployment
- Check if `api/` folder exists in repository
- Verify Vercel deployment logs

### Database connection error
- Verify POSTGRES_URL format
- Test connection string with a PostgreSQL client
- Check database provider status

### Registration still uses localStorage
- Ensure you're testing on the production URL (not localhost)
- Clear browser cache
- Check browser console for errors

### Environment variables not working
- Run `npx vercel env ls` to verify they're set
- Ensure variables are set for "Production" environment
- Re-deploy after adding variables

## Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ SQL injection protection with parameterized queries
- ✅ CORS headers configured
- ✅ Input validation on all endpoints

## Next Features to Add

Once the database is working, you can easily extend:
- User login functionality
- Profile editing
- Password reset
- Email verification
- Property/service listings
- Booking system
- Reviews and ratings

---

**Need help?** The current system works perfectly with localStorage fallback, so your users can register immediately while you set up the database!