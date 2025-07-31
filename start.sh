#!/bin/bash

echo "🚀 Starting CourseHub - Full Stack Course Selling Platform"
echo "=============================================="

# Check if MongoDB is running
echo "📂 Checking MongoDB connection..."

# Start backend server in background
echo "🔧 Starting Backend Server (Port 3000)..."
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting Frontend Server (Port 5173)..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting up!"
echo "📡 Backend: http://localhost:3000"
echo "🌐 Frontend: http://localhost:5173"
echo ""
echo "🛑 To stop both servers, press Ctrl+C"

# Wait for user to stop
wait