#!/bin/bash

# Auto-sync script for Vercel deployment
echo "🚀 Starting auto-sync to Vercel..."

# Check if there are any changes
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Changes detected, committing..."

    # Add all changes
    git add .

    # Commit with timestamp
    git commit -m "Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"

    # Push to main branch (this will trigger Vercel deployment)
    echo "⬆️  Pushing to repository..."
    git push origin main

    echo "✅ Changes pushed! Vercel will automatically deploy."
    echo "🌐 Check your deployment at: https://github.com/ShabiShett07/samvrudhi"
    echo "📱 Vercel will auto-deploy from GitHub commits"
else
    echo "✨ No changes detected."
fi