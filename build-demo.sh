#!/bin/bash
# Script to build and test GitHub Pages locally

set -e

echo "🔨 Building AutoForge for GitHub Pages..."
cd "$(dirname "$0")/frontend"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf out .next

# Build with demo mode
echo "🏗️  Building static site..."
NEXT_PUBLIC_DEMO_MODE=true NEXT_PUBLIC_BASE_PATH=/AutoForge npm run build

echo "✅ Build complete!"
echo ""
echo "📁 Static files generated in: frontend/out/"
echo ""
echo "To serve locally, run:"
echo "  cd frontend"
echo "  npx serve out"
echo ""
echo "Then visit: http://localhost:3000/AutoForge"
