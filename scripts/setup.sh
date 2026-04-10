#!/bin/bash

# OPTIMAQ Setup Script
# This script sets up the entire OPTIMAQ project for development

echo "🚀 Setting up OPTIMAQ - AI Optimization Dashboard"
echo "================================================="

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You can still run manually."
fi

echo "✅ Prerequisites check passed"

# Setup backend
echo "🔧 Setting up Backend..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file from template. Please edit with your configuration."
fi
npm install
echo "✅ Backend setup complete"

# Setup frontend
echo "🎨 Setting up Frontend..."
cd ../frontend
npm install
echo "✅ Frontend setup complete"

# Setup ML Engine
echo "🤖 Setting up ML Engine..."
cd ../ml-engine
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -c "from app import load_or_train_model; print('Training ML model...'); load_or_train_model(); print('✅ ML model trained')"
echo "✅ ML Engine setup complete"

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start MongoDB (if not using Docker)"
echo "2. Run: docker-compose up --build"
echo "   OR"
echo "   Manual start:"
echo "   - Backend: cd backend && npm run dev"
echo "   - Frontend: cd frontend && npm run dev"
echo "   - ML Engine: cd ml-engine && source venv/bin/activate && python app.py"
echo ""
echo "Access the application at: http://localhost:3000"
echo ""
echo "📚 Documentation: See docs/ folder for API docs and architecture"