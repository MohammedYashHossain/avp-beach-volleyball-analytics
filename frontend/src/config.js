// Configuration for API endpoints
const config = {
  // Development environment
  development: {
    apiUrl: 'http://localhost:5000'
  },
  // Production environment - replace with your actual backend URL
  production: {
    apiUrl: 'https://your-backend-url.railway.app' // You'll update this after deploying backend
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate config
export const API_BASE_URL = config[environment].apiUrl;

export default config[environment]; 