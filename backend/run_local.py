#!/usr/bin/env python3
"""
Local development server for AVP Beach Volleyball Analytics API
Run this script to test the backend locally before deploying to Railway
"""

import os
import sys
from api import app

if __name__ == '__main__':
    print("🏐 Starting AVP Beach Volleyball Analytics API (Local Development)")
    print("=" * 60)
    
    # Check if model exists, if not train it
    if not os.path.exists('model.pkl'):
        print("🤖 Training ML model...")
        try:
            from train_model import main as train_main
            train_main()
        except Exception as e:
            print(f"❌ Error training model: {e}")
            print("Continuing without model...")
    
    # Check if data exists
    if not os.path.exists('data/volleyball_data.csv'):
        print("📊 Creating sample data...")
        try:
            from train_model import create_sample_data
            import pandas as pd
            df = create_sample_data()
            os.makedirs('data', exist_ok=True)
            df.to_csv('data/volleyball_data.csv', index=False)
            print("✅ Sample data created")
        except Exception as e:
            print(f"❌ Error creating data: {e}")
    
    print("🚀 Starting Flask development server...")
    print("📍 API will be available at: http://localhost:5000")
    print("🔍 Health check: http://localhost:5000/health")
    print("📊 Stats: http://localhost:5000/stats")
    print("🎯 Sample prediction: http://localhost:5000/sample-prediction")
    print("=" * 60)
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000) 