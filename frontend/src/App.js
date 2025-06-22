import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import PredictForm from './components/PredictForm';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');
  const [error, setError] = useState(null);

  // Check if the backend API is running
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await axios.get('/');
        console.log('API is running:', response.data);
        setApiStatus('connected');
      } catch (err) {
        console.error('API connection failed:', err);
        setApiStatus('disconnected');
        setError('Backend API is not running. Please start the Flask server first.');
      }
    };

    checkApiStatus();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {/* Header with project info */}
        <div className="header">
          <h1>🏐 AVP Beach Volleyball Analytics</h1>
          <p>CS 301 Final Project - Data Science Applications</p>
          <p>Machine Learning Match Prediction Platform</p>
        </div>

        {/* API Status */}
        {apiStatus === 'checking' && (
          <div className="section">
            <div className="loading">Checking API connection...</div>
          </div>
        )}

        {apiStatus === 'disconnected' && (
          <div className="section">
            <div className="error-message">
              <h3>⚠️ Backend Not Connected</h3>
              <p>{error}</p>
              <p><strong>To fix this:</strong></p>
              <ol>
                <li>Open a terminal and navigate to the <code>backend</code> folder</li>
                <li>Run: <code>pip install -r requirements.txt</code></li>
                <li>Run: <code>python train_model.py</code></li>
                <li>Run: <code>python api.py</code></li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        )}

        {/* Main content when API is connected */}
        {apiStatus === 'connected' && (
          <>
            {/* Dashboard Section */}
            <Dashboard />
            
            {/* Prediction Form Section */}
            <PredictForm />
          </>
        )}

        {/* Footer */}
        <div className="section" style={{ textAlign: 'center', marginTop: '40px' }}>
          <p><strong>CS 301 Final Project</strong> - Spring 2024</p>
          <p>Built with React, Flask, and Machine Learning</p>
          <p>Dataset: AVP Beach Volleyball 2022 Season</p>
        </div>
      </div>
    </div>
  );
}

export default App; 