#!/bin/bash

# Travel Planner Agent - Quick Setup Script
# This script automates the initial setup for development

set -e

echo "🚀 Travel Planner Agent - Setup Script"
echo "======================================"
echo ""

# Check Node.js
echo "📋 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi
NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔐 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your IBM Cloud credentials:"
    echo "   - IBM_CLOUD_API_KEY"
    echo "   - WATSONX_PROJECT_ID"
    echo "   - (Optional) OPENWEATHER_API_KEY"
    echo ""
fi

# Create logs directory
if [ ! -d logs ]; then
    mkdir -p logs
    echo "📁 Created logs directory"
fi

echo ""
echo "✨ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update .env file with your IBM Cloud credentials"
echo "2. Run: npm run dev"
echo "3. Test: curl http://localhost:3000/health"
echo "4. Read: README.md for more information"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - API_DOCUMENTATION.md - API reference"
echo "   - DEPLOYMENT_GUIDE.md - IBM Cloud deployment"
echo "   - SAMPLE_REQUESTS.md - Example API calls"
echo ""
