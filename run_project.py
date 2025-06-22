#!/usr/bin/env python3
# AVP Beach Volleyball Analytics Platform - Easy startup script
# Professional sports analytics platform with machine learning capabilities

import os
import sys
import subprocess
import time
import threading
import webbrowser
from pathlib import Path

def print_header():
    """Print project header"""
    print("=" * 60)
    print("🏐 AVP BEACH VOLLEYBALL ANALYTICS PLATFORM")
    print("Professional Sports Analytics & Machine Learning Platform")
    print("=" * 60)
    print()

def check_dependencies():
    """Check if required files exist"""
    required_files = [
        "backend/api.py",
        "backend/train_model.py", 
        "frontend/package.json",
        "backend/requirements.txt"
    ]
    
    for file_path in required_files:
        if not Path(file_path).exists():
            print(f"❌ Required file not found: {file_path}")
            print("Please run setup.py first")
            return False
    
    print("✅ All required files found")
    return True

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting backend server...")
    
    try:
        # Change to backend directory
        os.chdir("backend")
        
        # Start Flask server
        subprocess.run([sys.executable, "api.py"], check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Backend server failed to start: {e}")
        return False
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
        return False

def start_frontend():
    """Start the React frontend server"""
    print("🚀 Starting frontend server...")
    
    try:
        # Change to frontend directory
        os.chdir("frontend")
        
        # Start React development server
        subprocess.run(["npm", "start"], check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Frontend server failed to start: {e}")
        return False
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
        return False

def open_browser():
    """Open browser after a delay"""
    time.sleep(5)  # Wait for servers to start
    try:
        webbrowser.open("http://localhost:3000")
        print("🌐 Opening browser to http://localhost:3000")
    except:
        print("🌐 Please open http://localhost:3000 in your browser")

def main():
    """Main function to run the project"""
    print_header()
    
    # Check dependencies
    if not check_dependencies():
        return
    
    print("🎯 Starting AVP Beach Volleyball Analytics Platform...")
    print("This platform provides:")
    print("- Advanced data analytics dashboard")
    print("- Machine learning prediction system") 
    print("- Interactive data visualizations")
    print("- Real-time match analysis")
    print()
    
    # Start browser in background
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    # Start backend in background
    backend_thread = threading.Thread(target=start_backend)
    backend_thread.daemon = True
    backend_thread.start()
    
    # Start frontend (this will block)
    start_frontend()

if __name__ == "__main__":
    main() 