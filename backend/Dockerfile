FROM python:3.9-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Train the model
RUN python train_model.py

# Expose port
EXPOSE 8000

# Start the application
CMD ["gunicorn", "api:app", "--bind", "0.0.0.0:8000", "--workers", "1", "--timeout", "120"] 