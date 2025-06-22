#!/usr/bin/env python3
"""
Convenience script to run the entire AVP Beach Volleyball Analytics project
CS 301 Final Project - Easy startup script
"""

import os
import sys
import subprocess
import time
import webbrowser
from pathlib import Path

def print_header():
    """Print a cool header for the project"""
    print("=" * 60)
    print("🏐 AVP BEACH VOLLEYBALL ANALYTICS PLATFORM")
    print("CS 301 Final Project - Data Science Applications")
    print("=" * 60)
    print()

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Error: Python 3.8 or higher is required!")
        print(f"Current version: {sys.version}")
        return False
    print(f"✅ Python version: {sys.version.split()[0]}")
    return True

def check_dependencies():
    """Check if required packages are installed"""
    print("Checking dependencies...")
    
    required_packages = [
        'flask', 'pandas', 'scikit-learn', 'joblib', 
        'matplotlib', 'seaborn', 'numpy', 'flask-cors'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} (missing)")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n❌ Missing packages: {', '.join(missing_packages)}")
        print("Run: pip install -r backend/requirements.txt")
        return False
    
    print("✅ All Python dependencies are installed!")
    return True

def setup_backend():
    """Set up and run the backend"""
    print("\n🔧 Setting up backend...")
    
    # Change to backend directory
    backend_dir = Path("backend")
    if not backend_dir.exists():
        print("❌ Backend directory not found!")
        return False
    
    os.chdir(backend_dir)
    
    # Create data directory if it doesn't exist
    data_dir = Path("data")
    data_dir.mkdir(exist_ok=True)
    
    # Check if model exists, if not train it
    if not Path("model.pkl").exists():
        print("🤖 Training ML model...")
        try:
            result = subprocess.run([sys.executable, "train_model.py"], 
                                  capture_output=True, text=True, timeout=60)
            if result.returncode != 0:
                print("❌ Model training failed!")
                print("Error:", result.stderr)
                return False
            print("✅ Model trained successfully!")
        except subprocess.TimeoutExpired:
            print("❌ Model training timed out!")
            return False
    else:
        print("✅ ML model already exists")
    
    # Start Flask server
    print("🚀 Starting Flask API server...")
    try:
        # Start the Flask server in a subprocess
        flask_process = subprocess.Popen([sys.executable, "api.py"])
        
        # Wait a bit for the server to start
        time.sleep(3)
        
        # Check if server is running
        try:
            import requests
            response = requests.get("http://localhost:5000", timeout=5)
            if response.status_code == 200:
                print("✅ Flask API server is running on http://localhost:5000")
                return flask_process
            else:
                print("❌ Flask server not responding properly")
                flask_process.terminate()
                return False
        except ImportError:
            print("⚠️  requests library not available, assuming server started")
            return flask_process
        except Exception as e:
            print(f"❌ Could not connect to Flask server: {e}")
            flask_process.terminate()
            return False
            
    except Exception as e:
        print(f"❌ Failed to start Flask server: {e}")
        return False

def setup_frontend():
    """Set up and run the frontend"""
    print("\n🎨 Setting up frontend...")
    
    # Go back to root directory
    os.chdir("..")
    
    frontend_dir = Path("frontend")
    if not frontend_dir.exists():
        print("❌ Frontend directory not found!")
        return False
    
    os.chdir(frontend_dir)
    
    # Check if node_modules exists
    if not Path("node_modules").exists():
        print("📦 Installing npm dependencies...")
        try:
            result = subprocess.run(["npm", "install"], 
                                  capture_output=True, text=True, timeout=120)
            if result.returncode != 0:
                print("❌ npm install failed!")
                print("Error:", result.stderr)
                return False
            print("✅ npm dependencies installed!")
        except subprocess.TimeoutExpired:
            print("❌ npm install timed out!")
            return False
    else:
        print("✅ npm dependencies already installed")
    
    # Start React development server
    print("🚀 Starting React development server...")
    try:
        react_process = subprocess.Popen(["npm", "start"])
        
        # Wait for React to start
        time.sleep(5)
        
        print("✅ React development server is starting on http://localhost:3000")
        return react_process
        
    except Exception as e:
        print(f"❌ Failed to start React server: {e}")
        return False

def main():
    """Main function to run the entire project"""
    print_header()
    
    # Check Python version
    if not check_python_version():
        return
    
    # Check dependencies
    if not check_dependencies():
        return
    
    print("\n🎯 Starting AVP Beach Volleyball Analytics Platform...")
    
    # Start backend
    flask_process = setup_backend()
    if not flask_process:
        print("❌ Backend setup failed!")
        return
    
    # Start frontend
    react_process = setup_frontend()
    if not react_process:
        print("❌ Frontend setup failed!")
        flask_process.terminate()
        return
    
    print("\n🎉 Project is running!")
    print("📊 Dashboard: http://localhost:3000")
    print("🔌 API: http://localhost:5000")
    print("\nPress Ctrl+C to stop all servers")
    
    # Open browser
    try:
        time.sleep(2)
        webbrowser.open("http://localhost:3000")
        print("🌐 Opened browser automatically")
    except:
        print("🌐 Please open http://localhost:3000 in your browser")
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping servers...")
        flask_process.terminate()
        react_process.terminate()
        print("✅ Servers stopped. Goodbye!")

if __name__ == "__main__":
    main() 