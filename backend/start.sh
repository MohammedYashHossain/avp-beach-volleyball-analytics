#!/bin/bash

echo "=== Starting AVP Beach Volleyball API ==="
echo "Current directory: $(pwd)"
echo "Python version: $(python --version)"

# Create data directory if it doesn't exist
mkdir -p data

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create sample data if it doesn't exist
if [ ! -f "data/volleyball_data.csv" ]; then
    echo "📊 Creating sample data..."
    python -c "
import pandas as pd
import numpy as np
import os
os.makedirs('data', exist_ok=True)

# Create simple sample data
np.random.seed(42)
n_samples = 100
data = {
    'match_date': pd.date_range('2024-01-01', periods=n_samples).strftime('%Y-%m-%d'),
    'team_a_total_kills': np.random.randint(10, 30, n_samples),
    'team_a_total_digs': np.random.randint(15, 35, n_samples),
    'team_a_total_errors': np.random.randint(2, 12, n_samples),
    'team_a_total_aces': np.random.randint(0, 6, n_samples),
    'team_b_total_kills': np.random.randint(10, 30, n_samples),
    'team_b_total_digs': np.random.randint(15, 35, n_samples),
    'team_b_total_errors': np.random.randint(2, 12, n_samples),
    'team_b_total_aces': np.random.randint(0, 6, n_samples),
    'team_a_kill_efficiency': np.random.uniform(0.5, 0.9, n_samples),
    'team_b_kill_efficiency': np.random.uniform(0.5, 0.9, n_samples),
    'winner': np.random.choice(['Team A', 'Team B'], n_samples)
}
df = pd.DataFrame(data)
df.to_csv('data/volleyball_data.csv', index=False)
print('Sample data created successfully')
"
fi

# Train model if it doesn't exist
if [ ! -f "model.pkl" ]; then
    echo "🤖 Training model..."
    python train_model.py || echo "⚠️  Model training failed, but continuing..."
fi

echo "🚀 Starting the application..."
echo "📍 API will be available on port: $PORT"
echo "🔍 Test endpoint: /test"
echo "🔍 Health check: /health"

# Start the application with more verbose output
gunicorn api:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120 --log-level debug 