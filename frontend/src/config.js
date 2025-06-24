// Configuration for the Beach Volleyball Analytics Platform

// Backend URL configuration
// For local development, use localhost
export const API_BASE_URL = 'http://localhost:5000';

// For production deployment on Railway, uncomment and replace with your actual Railway URL
// export const API_BASE_URL = 'https://avp-beach-volleyball-analytics-production.up.railway.app';

// Alternative: If you want to use a different backend service
// export const API_BASE_URL = 'https://your-heroku-app.herokuapp.com';

// IMPORTANT: To fix the connection errors:
// 1. For local development: Make sure your backend is running on port 5000
// 2. For production: Deploy your backend to Railway (see RAILWAY_DEPLOYMENT.md)
// 3. Replace the API_BASE_URL above with your actual Railway URL
// 4. The URL should look like: https://your-app-name-production-xxxx.up.railway.app

// API endpoints
export const API_ENDPOINTS = {
  STATS: '/stats',
  DASHBOARD: '/dashboard',
  PREDICT: '/predict',
  HEALTH: '/health',
  SAMPLE_PREDICTION: '/sample-prediction',
  TIMESERIES: '/timeseries',
  FORECAST: '/forecast',
  VISUALIZATION: '/visualization',
  STATIONARITY: '/stationarity'
};

// App configuration
export const APP_CONFIG = {
  name: 'AVP Beach Volleyball Analytics',
  version: '1.0.0',
  description: 'Professional sports analytics platform with ARIMA forecasting capabilities'
}; 