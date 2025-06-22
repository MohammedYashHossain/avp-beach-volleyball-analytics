// Configuration for API endpoints
const config = {
  // Development environment
  development: {
    apiUrl: 'http://localhost:5000'
  },
  // Production environment - uses environment variable
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://your-backend-url.railway.app'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate config
export const API_BASE_URL = config[environment].apiUrl;

export default config[environment]; 