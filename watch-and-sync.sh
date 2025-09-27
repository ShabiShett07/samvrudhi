#!/bin/bash

# Auto-sync watcher for Vercel deployment
echo "👁️  Starting file watcher for auto-sync to Vercel..."
echo "🔄 Will auto-deploy on file changes every 10 seconds"

# Initial commit if there are changes
./sync-to-vercel.sh

while true; do
    sleep 10

    # Check if there are any changes
    if [[ -n $(git status --porcelain) ]]; then
        echo "🔄 Changes detected, syncing..."
        ./sync-to-vercel.sh
    fi
done