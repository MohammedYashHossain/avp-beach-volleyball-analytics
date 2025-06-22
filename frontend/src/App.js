import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>🏐 AVP Beach Volleyball Analytics</h1>
          <p>CS 301 Final Project - Data Science Applications</p>
          <p>Machine Learning Match Prediction Platform</p>
        </div>

        <div className="section">
          <h2>🚀 Frontend Deployed Successfully!</h2>
          <p>This is a test deployment to ensure the build works.</p>
          <p>Backend URL: https://avp-beach-volleyball-analytics-production-xxxx.up.railway.app</p>
        </div>

        <div className="section" style={{ textAlign: 'center', marginTop: '40px' }}>
          <p><strong>CS 301 Final Project</strong> - Spring 2024</p>
          <p>Built with React, Flask, and Machine Learning</p>
        </div>
      </div>
    </div>
  );
}

export default App; 