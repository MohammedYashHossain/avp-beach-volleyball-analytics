#!/bin/bash

echo "=== Starting AVP Beach Volleyball API ==="
echo "Current directory: $(pwd)"
echo "Python version: $(python --version)"

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create data directory
mkdir -p data

# Create simple sample data
echo "Creating sample data..."
python -c "
import pandas as pd
import numpy as np
import os

# Create simple sample data
np.random.seed(42)
n_samples = 50
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

# Create a simple model file
echo "Creating simple model..."
python -c "
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Create a simple model
X = np.random.rand(100, 10)
y = np.random.randint(0, 2, 100)
model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X, y)

# Save the model
joblib.dump(model, 'model.pkl')
print('Simple model created successfully')
"

echo "🚀 Starting the application..."
echo "📍 API will be available on port: $PORT"

# Start the application
gunicorn api:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120 