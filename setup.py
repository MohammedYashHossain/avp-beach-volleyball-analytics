#!/usr/bin/env python3
"""
Setup script for AVP Beach Volleyball Analytics Platform
CS 301 Final Project - Easy setup
"""

import os
import sys
import subprocess
from pathlib import Path

def print_header():
    """Print project header"""
    print("=" * 60)
    print("🏐 AVP BEACH VOLLEYBALL ANALYTICS PLATFORM")
    print("CS 301 Final Project - Setup Script")
    print("=" * 60)
    print()

def install_python_dependencies():
    """Install Python dependencies"""
    print("📦 Installing Python dependencies...")
    
    backend_dir = Path("backend")
    if not backend_dir.exists():
        print("❌ Backend directory not found!")
        return False
    
    requirements_file = backend_dir / "requirements.txt"
    if not requirements_file.exists():
        print("❌ requirements.txt not found!")
        return False
    
    try:
        result = subprocess.run([
            sys.executable, "-m", "pip", "install", "-r", str(requirements_file)
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print("❌ Failed to install Python dependencies!")
            print("Error:", result.stderr)
            return False
        
        print("✅ Python dependencies installed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error installing Python dependencies: {e}")
        return False

def install_node_dependencies():
    """Install Node.js dependencies"""
    print("📦 Installing Node.js dependencies...")
    
    frontend_dir = Path("frontend")
    if not frontend_dir.exists():
        print("❌ Frontend directory not found!")
        return False
    
    package_json = frontend_dir / "package.json"
    if not package_json.exists():
        print("❌ package.json not found!")
        return False
    
    try:
        # Check if npm is available
        result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
        if result.returncode != 0:
            print("❌ npm is not installed or not in PATH!")
            print("Please install Node.js from https://nodejs.org/")
            return False
        
        print(f"✅ npm version: {result.stdout.strip()}")
        
        # Install dependencies
        os.chdir(frontend_dir)
        result = subprocess.run(["npm", "install"], capture_output=True, text=True)
        
        if result.returncode != 0:
            print("❌ Failed to install Node.js dependencies!")
            print("Error:", result.stderr)
            return False
        
        print("✅ Node.js dependencies installed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error installing Node.js dependencies: {e}")
        return False

def create_directories():
    """Create necessary directories"""
    print("📁 Creating directories...")
    
    directories = [
        "backend/data",
        "frontend/public",
        "frontend/src/components"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✅ Created {directory}")
    
    return True

def check_data_file():
    """Check if data file exists and provide instructions"""
    data_file = Path("backend/data/avp_matches_2022.csv")
    
    if data_file.exists():
        print("✅ Data file found!")
        return True
    else:
        print("⚠️  Data file not found!")
        print("\n📋 To get the data:")
        print("1. Go to: https://github.com/big-time-stats/beach-volleyball")
        print("2. Download avp_matches_2022.csv from the data/ folder")
        print("3. Place it in backend/data/avp_matches_2022.csv")
        print("\n💡 Don't worry! The training script will create sample data if needed.")
        return True

def main():
    """Main setup function"""
    print_header()
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required!")
        print(f"Current version: {sys.version}")
        return
    
    print(f"✅ Python version: {sys.version.split()[0]}")
    
    # Create directories
    if not create_directories():
        return
    
    # Install Python dependencies
    if not install_python_dependencies():
        return
    
    # Install Node.js dependencies
    if not install_node_dependencies():
        return
    
    # Check data file
    check_data_file()
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Run: python run_project.py")
    print("2. Or manually:")
    print("   - cd backend && python train_model.py")
    print("   - cd backend && python api.py")
    print("   - cd frontend && npm start")
    print("\n🌐 The app will be available at http://localhost:3000")
    print("\nGood luck with your project! 🏐")

if __name__ == "__main__":
    main() 