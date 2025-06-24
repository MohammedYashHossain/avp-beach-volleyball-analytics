#!/usr/bin/env python3
"""
AVP Beach Volleyball Analytics Platform - ARIMA Forecasting System
One-click setup and run script for the complete analytics platform
"""

import os
import sys
import subprocess
import time
import webbrowser
from pathlib import Path

def print_banner():
    """Print the project banner"""
    banner = """
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║  🔮 AVP Beach Volleyball Analytics Platform                 ║
    ║  📊 ARIMA Time Series Forecasting System                    ║
    ║                                                              ║
    ║  Built with Python, Flask, React, and Machine Learning      ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    """
    print(banner)

def check_requirements():
    """Check if required software is installed"""
    print("🔍 Checking system requirements...")
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        return False
    
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    
    # Check if Node.js is installed
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js {result.stdout.strip()} detected")
        else:
            print("❌ Node.js is not installed")
            return False
    except FileNotFoundError:
        print("❌ Node.js is not installed")
        return False
    
    # Check if npm is installed
    try:
        result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ npm {result.stdout.strip()} detected")
        else:
            print("❌ npm is not installed")
            return False
    except FileNotFoundError:
        print("❌ npm is not installed")
        return False
    
    return True

def install_backend_dependencies():
    """Install Python backend dependencies"""
    print("\n🐍 Installing Python backend dependencies...")
    
    backend_dir = Path("backend")
    if not backend_dir.exists():
        print("❌ Backend directory not found")
        return False
    
    requirements_file = backend_dir / "requirements.txt"
    if not requirements_file.exists():
        print("❌ requirements.txt not found in backend directory")
        return False
    
    try:
        # Upgrade pip first
        subprocess.run([sys.executable, "-m", "pip", "install", "--upgrade", "pip"], 
                      check=True, capture_output=True)
        
        # Install requirements
        result = subprocess.run([
            sys.executable, "-m", "pip", "install", "-r", str(requirements_file)
        ], check=True, capture_output=True, text=True)
        
        print("✅ Backend dependencies installed successfully")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install backend dependencies: {e}")
        print(f"Error output: {e.stderr}")
        return False

def install_frontend_dependencies():
    """Install Node.js frontend dependencies"""
    print("\n📦 Installing Node.js frontend dependencies...")
    
    frontend_dir = Path("frontend")
    if not frontend_dir.exists():
        print("❌ Frontend directory not found")
        return False
    
    package_json = frontend_dir / "package.json"
    if not package_json.exists():
        print("❌ package.json not found in frontend directory")
        return False
    
    try:
        # Change to frontend directory
        os.chdir(frontend_dir)
        
        # Install dependencies
        result = subprocess.run(['npm', 'install'], check=True, capture_output=True, text=True)
        
        # Change back to root directory
        os.chdir("..")
        
        print("✅ Frontend dependencies installed successfully")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install frontend dependencies: {e}")
        print(f"Error output: {e.stderr}")
        return False

def start_backend():
    """Start the Flask backend server"""
    print("\n🚀 Starting ARIMA Analytics Backend...")
    
    backend_dir = Path("backend")
    if not backend_dir.exists():
        print("❌ Backend directory not found")
        return None
    
    try:
        # Change to backend directory
        os.chdir(backend_dir)
        
        # Start the Flask server
        process = subprocess.Popen([
            sys.executable, "api.py"
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Change back to root directory
        os.chdir("..")
        
        # Wait a moment for the server to start
        time.sleep(3)
        
        # Check if the process is still running
        if process.poll() is None:
            print("✅ Backend server started successfully")
            print("📍 Backend URL: http://localhost:5000")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"❌ Backend server failed to start")
            print(f"Error: {stderr}")
            return None
            
    except Exception as e:
        print(f"❌ Failed to start backend: {e}")
        return None

def start_frontend():
    """Start the React frontend development server"""
    print("\n🌐 Starting React Frontend...")
    
    frontend_dir = Path("frontend")
    if not frontend_dir.exists():
        print("❌ Frontend directory not found")
        return None
    
    try:
        # Change to frontend directory
        os.chdir(frontend_dir)
        
        # Start the React development server
        process = subprocess.Popen([
            'npm', 'start'
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Change back to root directory
        os.chdir("..")
        
        # Wait a moment for the server to start
        time.sleep(5)
        
        # Check if the process is still running
        if process.poll() is None:
            print("✅ Frontend server started successfully")
            print("📍 Frontend URL: http://localhost:3000")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"❌ Frontend server failed to start")
            print(f"Error: {stderr}")
            return None
            
    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")
        return None

def open_browser():
    """Open the application in the default browser"""
    print("\n🌍 Opening application in browser...")
    
    try:
        # Wait a bit more for servers to fully start
        time.sleep(2)
        
        # Open the frontend URL
        webbrowser.open('http://localhost:3000')
        print("✅ Browser opened successfully")
        
    except Exception as e:
        print(f"⚠️  Could not open browser automatically: {e}")
        print("📝 Please manually open: http://localhost:3000")

def main():
    """Main function to run the complete setup and start the application"""
    print_banner()
    
    print("🎯 Starting AVP Beach Volleyball Analytics Platform with ARIMA Forecasting")
    print("=" * 70)
    
    # Check system requirements
    if not check_requirements():
        print("\n❌ System requirements not met. Please install the required software.")
        return
    
    # Install dependencies
    if not install_backend_dependencies():
        print("\n❌ Failed to install backend dependencies")
        return
    
    if not install_frontend_dependencies():
        print("\n❌ Failed to install frontend dependencies")
        return
    
    print("\n🎉 All dependencies installed successfully!")
    print("=" * 70)
    
    # Start servers
    backend_process = start_backend()
    if not backend_process:
        print("\n❌ Failed to start backend server")
        return
    
    frontend_process = start_frontend()
    if not frontend_process:
        print("\n❌ Failed to start frontend server")
        backend_process.terminate()
        return
    
    print("\n🎉 Application started successfully!")
    print("=" * 70)
    print("📊 ARIMA Analytics Dashboard: http://localhost:3000")
    print("🔧 Backend API: http://localhost:5000")
    print("📈 Features:")
    print("   • ARIMA Time Series Forecasting")
    print("   • Interactive Data Visualizations")
    print("   • Real-time Performance Analytics")
    print("   • Machine Learning Predictions")
    print("=" * 70)
    
    # Open browser
    open_browser()
    
    print("\n🔄 Application is running...")
    print("💡 Press Ctrl+C to stop the servers")
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
            
            # Check if processes are still running
            if backend_process.poll() is not None:
                print("\n❌ Backend server stopped unexpectedly")
                break
                
            if frontend_process.poll() is not None:
                print("\n❌ Frontend server stopped unexpectedly")
                break
                
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping servers...")
        
        # Terminate processes
        if backend_process:
            backend_process.terminate()
            print("✅ Backend server stopped")
            
        if frontend_process:
            frontend_process.terminate()
            print("✅ Frontend server stopped")
            
        print("\n👋 Application stopped successfully!")

if __name__ == "__main__":
    main() 