// Configuration for API endpoints
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://avp-beach-volleyball-analytics-production-xxxx.up.railway.app');

export { API_BASE_URL };
export default { apiUrl: API_BASE_URL }; 