#!/bin/bash

echo "=== Starting AVP Beach Volleyball API ==="
echo "Current directory: $(pwd)"
echo "Python version: $(python --version)"

# Create data directory if it doesn't exist
mkdir -p data

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if we need to train the model
echo "Checking if model exists..."
if [ ! -f "model.pkl" ]; then
    echo "🤖 Model not found. Training model..."
    python train_model.py
    if [ $? -eq 0 ]; then
        echo "✅ Model training completed successfully"
    else
        echo "⚠️  Model training failed, but continuing startup..."
    fi
else
    echo "✅ Model already exists"
fi

# Check if data exists
if [ ! -f "data/volleyball_data.csv" ]; then
    echo "📊 Data not found. Creating sample data..."
    python -c "
import pandas as pd
import numpy as np
from train_model import create_sample_data
df = create_sample_data()
df.to_csv('data/volleyball_data.csv', index=False)
print('Sample data created successfully')
"
fi

echo "🚀 Starting the application..."
echo "📍 API will be available on port: $PORT"
echo "🔍 Health check will be available at: /health"

# Start the application
gunicorn api:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120 