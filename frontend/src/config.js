// Configuration for the Beach Volleyball Analytics Platform

// Railway backend URL - replace with your actual Railway URL
// You can find this URL in your Railway dashboard after deploying
export const BACKEND_URL = 'https://your-railway-app-name.railway.app';

// Alternative: If you want to use a different backend service
// export const BACKEND_URL = 'https://your-heroku-app.herokuapp.com';

// Development URL (for local testing)
// export const BACKEND_URL = 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  STATS: '/stats',
  DASHBOARD: '/dashboard',
  PREDICT: '/predict',
  HEALTH: '/health',
  SAMPLE_PREDICTION: '/sample-prediction'
};

// App configuration
export const APP_CONFIG = {
  name: 'AVP Beach Volleyball Analytics',
  version: '1.0.0',
  description: 'Professional sports analytics platform with machine learning capabilities'
}; 