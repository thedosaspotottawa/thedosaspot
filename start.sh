#!/bin/bash

# Dosa Point Startup Script

# Function to handle shutdown
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $(jobs -p)
    exit
}

# Trap interrupt signals
trap cleanup SIGINT SIGTERM

echo "----------------------------------------"
echo "Starting Dosa Point PWA Stack"
echo "----------------------------------------"

# Cleanup conflicting processes
echo "-> Cleaning up existing processes..."
lsof -ti :8000,5173 | xargs kill -9 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Start Backend
echo "-> Launching FastAPI Backend..."
(cd backend && ./venv/bin/python main.py) &

# Start Frontend
echo "-> Launching Vite Frontend..."
cd frontend && npm run dev &

# Keep script running
wait
