# Deployment Instructions for Samvrudhi Registration System

## Prerequisites

1. **Vercel Account**: Make sure you have a Vercel account and the Vercel CLI installed
2. **Database**: Set up a PostgreSQL database (recommended: Vercel Postgres, Supabase, or Neon)
3. **Environment Variables**: Configure the required environment variables

## Environment Variables Setup

### 1. Database Configuration

If using Vercel Postgres:
```bash
# Create a Postgres database in your Vercel dashboard
# Copy the connection strings to your environment variables
```

### 2. Required Environment Variables

Add these to your Vercel project settings or `.env.local` for local development:

```
POSTGRES_URL="your-postgres-connection-string"
POSTGRES_PRISMA_URL="your-postgres-prisma-connection-string"
POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-connection-string"
JWT_SECRET="your-super-secret-jwt-key-here"
NODE_ENV="production"
```

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy to Vercel
```bash
# If not already connected
vercel login
vercel link

# Deploy
vercel --prod
```

### 3. Initialize Database
After deployment, call the database initialization endpoint once:
```bash
curl -X POST https://your-vercel-app.vercel.app/api/init-db
```

This will create the required tables:
- `users` - Main user table
- `landlord_profiles` - Landlord-specific data
- `worker_profiles` - Worker-specific data

### 4. Test Registration

Test the registration flow:
1. Visit your deployed app
2. Click "Register"
3. Select user type (Landlord/Worker)
4. Fill out the registration form
5. Verify the user is created in your database

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/init-db` - Database initialization (run once)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('landlord', 'worker')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Landlord Profiles
```sql
CREATE TABLE landlord_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  properties VARCHAR(20) NOT NULL,
  experience VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Worker Profiles
```sql
CREATE TABLE worker_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  services TEXT[] NOT NULL,
  experience VARCHAR(20) NOT NULL,
  hourly_rate INTEGER NOT NULL,
  availability VARCHAR(20) NOT NULL,
  certifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

- Password hashing with bcryptjs (12 rounds)
- JWT token authentication
- Input validation and sanitization
- SQL injection protection via parameterized queries
- CORS headers for API security

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify environment variables are set correctly
   - Check database URL format and permissions

2. **Registration fails**
   - Check network tab for API errors
   - Verify database is initialized
   - Check server logs in Vercel dashboard

3. **CORS errors**
   - Verify `vercel.json` CORS headers
   - Check API endpoint configuration

### Local Development

For local development:
1. Copy `.env.example` to `.env.local`
2. Fill in your database credentials
3. Run `npm run dev`
4. Initialize database: `POST http://localhost:3000/api/init-db`

## Next Steps

After successful deployment:
1. Set up user authentication state management
2. Create user profile pages
3. Add property and service management features
4. Implement booking/matching system
5. Add payment integration