#!/bin/bash

echo "🚀 Starting AVP Beach Volleyball Analytics ML System..."

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Initialize ML system
echo "🤖 Initializing ML system..."
python -c "
import sys
sys.path.append('.')
from api import initialize_ml_system
initialize_ml_system()
print('✅ ML system initialized successfully!')
"

# Start the application
echo "🌐 Starting Flask application..."
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --timeout 300 api:app 