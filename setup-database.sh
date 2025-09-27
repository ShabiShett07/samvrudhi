#!/bin/bash

# PostgreSQL Setup Script for Samvrudhi Project

echo "🗄️  Setting up PostgreSQL for Samvrudhi..."

# Check if Vercel CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not installed. Please install Node.js and npm first."
    exit 1
fi

echo ""
echo "Choose your PostgreSQL provider:"
echo "1. Neon (Recommended - Free tier available)"
echo "2. Supabase (Good alternative with free tier)"
echo "3. Manual connection string entry"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔧 Setting up with Neon:"
        echo "1. Go to https://console.neon.tech/"
        echo "2. Create a new project called 'samvrudhi'"
        echo "3. Copy the connection string"
        echo ""
        read -p "Enter your Neon connection string: " postgres_url
        ;;
    2)
        echo ""
        echo "🔧 Setting up with Supabase:"
        echo "1. Go to https://supabase.com/"
        echo "2. Create a new project"
        echo "3. Go to Settings > Database"
        echo "4. Copy the connection string"
        echo ""
        read -p "Enter your Supabase connection string: " postgres_url
        ;;
    3)
        echo ""
        read -p "Enter your PostgreSQL connection string: " postgres_url
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

# Generate a random JWT secret
jwt_secret="samvrudhi_jwt_$(openssl rand -base64 32 | tr -d '=' | tr '+/' '-_')"

echo ""
echo "🔑 Adding environment variables to Vercel..."

# Add POSTGRES_URL
echo "$postgres_url" | npx vercel env add POSTGRES_URL production

# Add JWT_SECRET
echo "$jwt_secret" | npx vercel env add JWT_SECRET production

echo ""
echo "📥 Pulling environment variables locally..."
npx vercel env pull .env.local

echo ""
echo "🚀 Triggering deployment..."
git add .
git commit -m "Setup PostgreSQL database configuration

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push

echo ""
echo "✅ PostgreSQL setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Wait for deployment to complete (1-2 minutes)"
echo "2. Initialize database: curl -X POST https://samvrudhi.vercel.app/api/init-db"
echo "3. Test registration on your website"
echo ""
echo "🔗 Your environment variables:"
echo "POSTGRES_URL: [SET]"
echo "JWT_SECRET: [SET]"