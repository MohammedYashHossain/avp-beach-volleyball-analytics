#!/usr/bin/env python3
"""
Setup script for AVP Beach Volleyball Analytics Platform
CS 301 Final Project - Easy setup
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Error: Python 3.8 or higher is required")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    print(f"✅ Python {sys.version.split()[0]} detected")

def install_backend_dependencies():
    """Install Python backend dependencies"""
    print("CS 301 Final Project - Setup Script")
    print("Installing backend dependencies...")
    
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])
        print("✅ Backend dependencies installed successfully")
    except subprocess.CalledProcessError:
        print("❌ Failed to install backend dependencies")
        sys.exit(1)

def install_frontend_dependencies():
    """Install Node.js frontend dependencies"""
    print("Installing frontend dependencies...")
    
    try:
        subprocess.check_call(["npm", "install"], cwd="frontend")
        print("✅ Frontend dependencies installed successfully")
    except subprocess.CalledProcessError:
        print("❌ Failed to install frontend dependencies")
        print("Make sure Node.js is installed and npm is available")
        sys.exit(1)

def train_model():
    """Train the machine learning model"""
    print("Training machine learning model...")
    
    try:
        subprocess.check_call([sys.executable, "backend/train_model.py"])
        print("✅ Model trained successfully")
    except subprocess.CalledProcessError:
        print("❌ Failed to train model")
        sys.exit(1)

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
    print("🏐 AVP Beach Volleyball Analytics Platform Setup")
    print("Professional sports analytics platform with machine learning capabilities")
    print("=" * 60)
    
    # Check Python version
    check_python_version()
    
    # Create directories
    if not create_directories():
        return
    
    # Install dependencies
    install_backend_dependencies()
    install_frontend_dependencies()
    
    # Train model
    train_model()
    
    # Check data file
    check_data_file()
    
    print("\n🎉 Setup completed successfully!")
    print("You can now run the application with: python run_project.py")
    print("\nThe platform includes:")
    print("- Advanced data analytics dashboard")
    print("- Machine learning prediction system")
    print("- Interactive data visualizations")
    print("- Real-time match analysis")

if __name__ == "__main__":
    main() 