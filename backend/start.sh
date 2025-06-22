#!/bin/bash

echo "=== Starting AVP Beach Volleyball API ==="
echo "Current directory: $(pwd)"
echo "Python version: $(python --version)"

# Create data directory if it doesn't exist
mkdir -p data

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Train model if needed
echo "Checking if model exists..."
if [ ! -f "model.pkl" ] || [ ! -f "feature_columns.pkl" ]; then
    echo "Training model..."
    python train_model.py
fi

# Start the application
echo "Starting the application..."
gunicorn api:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120 