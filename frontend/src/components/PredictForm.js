import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

function PredictForm() {
  const [formData, setFormData] = useState({
    team_a_kills: '',
    team_a_digs: '',
    team_a_errors: '',
    team_a_aces: '',
    team_b_kills: '',
    team_b_digs: '',
    team_b_errors: '',
    team_b_aces: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/predict`, formData);
      setPrediction(response.data);
    } catch (err) {
      console.error('Prediction error:', err);
      if (err.response?.status === 404) {
        setError('Backend service not available. Please ensure the Railway backend is deployed and running.');
      } else if (err.code === 'NETWORK_ERROR') {
        setError('Unable to connect to the backend service. Please check your internet connection and try again.');
      } else {
        setError('Failed to generate prediction. Please check your input values and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      team_a_kills: '',
      team_a_digs: '',
      team_a_errors: '',
      team_a_aces: '',
      team_b_kills: '',
      team_b_digs: '',
      team_b_errors: '',
      team_b_aces: ''
    });
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="presentation-slide">
      <h2>Machine Learning Predictions</h2>
      <p style={{ marginBottom: '20px', color: '#666', textAlign: 'center' }}>
        Our advanced machine learning model analyzes team performance statistics to predict match outcomes 
        with high accuracy. This demonstrates how artificial intelligence can provide valuable insights 
        for sports strategy and competitive analysis.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        {/* Input Form */}
        <div>
          <h3>Match Statistics Input</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Enter the performance statistics for both teams to generate a prediction. The model considers 
            kills (offensive success), digs (defensive plays), errors (unforced mistakes), and aces 
            (service winners) to determine the likely winner.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Team A Statistics</h4>
              <div className="form-group">
                <label>Kills (Offensive Success):</label>
                <input
                  type="number"
                  name="team_a_kills"
                  value={formData.team_a_kills}
                  onChange={handleInputChange}
                  placeholder="e.g., 25"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Successful offensive attacks that result in points</small>
              </div>
              <div className="form-group">
                <label>Digs (Defensive Plays):</label>
                <input
                  type="number"
                  name="team_a_digs"
                  value={formData.team_a_digs}
                  onChange={handleInputChange}
                  placeholder="e.g., 15"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Successful defensive plays that keep the ball in play</small>
              </div>
              <div className="form-group">
                <label>Errors (Unforced Mistakes):</label>
                <input
                  type="number"
                  name="team_a_errors"
                  value={formData.team_a_errors}
                  onChange={handleInputChange}
                  placeholder="e.g., 8"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Mistakes that give points to the opponent</small>
              </div>
              <div className="form-group">
                <label>Aces (Service Winners):</label>
                <input
                  type="number"
                  name="team_a_aces"
                  value={formData.team_a_aces}
                  onChange={handleInputChange}
                  placeholder="e.g., 3"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Service plays that result in immediate points</small>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Team B Statistics</h4>
              <div className="form-group">
                <label>Kills (Offensive Success):</label>
                <input
                  type="number"
                  name="team_b_kills"
                  value={formData.team_b_kills}
                  onChange={handleInputChange}
                  placeholder="e.g., 22"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Successful offensive attacks that result in points</small>
              </div>
              <div className="form-group">
                <label>Digs (Defensive Plays):</label>
                <input
                  type="number"
                  name="team_b_digs"
                  value={formData.team_b_digs}
                  onChange={handleInputChange}
                  placeholder="e.g., 18"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Successful defensive plays that keep the ball in play</small>
              </div>
              <div className="form-group">
                <label>Errors (Unforced Mistakes):</label>
                <input
                  type="number"
                  name="team_b_errors"
                  value={formData.team_b_errors}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Mistakes that give points to the opponent</small>
              </div>
              <div className="form-group">
                <label>Aces (Service Winners):</label>
                <input
                  type="number"
                  name="team_b_aces"
                  value={formData.team_b_aces}
                  onChange={handleInputChange}
                  placeholder="e.g., 2"
                  min="0"
                  required
                />
                <small style={{ color: '#666' }}>Service plays that result in immediate points</small>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Analyzing...' : 'Generate Prediction'}
              </button>
              <button type="button" className="btn" onClick={resetForm} style={{ background: '#95a5a6' }}>
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Results Display */}
        <div>
          <h3>Prediction Results</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            The machine learning model analyzes the input statistics and provides a prediction with confidence level. 
            This demonstrates how AI can process complex sports data to forecast outcomes based on historical patterns.
          </p>

          {error && (
            <div style={{ 
              padding: '15px', 
              background: '#fee', 
              border: '1px solid #fcc', 
              borderRadius: '8px', 
              color: '#c33',
              marginBottom: '20px'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading && (
            <div style={{ 
              padding: '20px', 
              background: '#f8f9fa', 
              borderRadius: '8px', 
              textAlign: 'center',
              border: '1px solid #dee2e6'
            }}>
              <p style={{ color: '#666', margin: 0 }}>Processing prediction...</p>
            </div>
          )}

          {prediction && !loading && (
            <div style={{ 
              padding: '20px', 
              background: 'white', 
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
              border: '2px solid #ecf0f1'
            }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>AI Prediction Result</h4>
              
              <div style={{ 
                padding: '15px', 
                background: prediction.prediction === 'Team A' ? '#e8f5e8' : '#fff3cd',
                borderRadius: '8px',
                marginBottom: '15px',
                border: `2px solid ${prediction.prediction === 'Team A' ? '#28a745' : '#ffc107'}`
              }}>
                <h5 style={{ 
                  color: prediction.prediction === 'Team A' ? '#155724' : '#856404',
                  margin: '0 0 10px 0'
                }}>
                  Predicted Winner: {prediction.prediction}
                </h5>
                <p style={{ 
                  color: prediction.prediction === 'Team A' ? '#155724' : '#856404',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: '#2c3e50', marginBottom: '10px' }}>Win Probabilities</h5>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ 
                      background: '#3498db', 
                      color: 'white', 
                      padding: '10px', 
                      borderRadius: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Team A: {(prediction.probabilities['Team A'] * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ 
                      background: '#e74c3c', 
                      color: 'white', 
                      padding: '10px', 
                      borderRadius: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Team B: {(prediction.probabilities['Team B'] * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                <h5 style={{ color: '#2c3e50', marginBottom: '10px' }}>Model Analysis</h5>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                  The Random Forest model analyzed {Object.keys(prediction.features_used).length} key performance metrics 
                  to generate this prediction. The model considers kill efficiency, defensive consistency, 
                  error management, and service pressure to determine the likely winner.
                </p>
              </div>
            </div>
          )}

          {/* Model Information */}
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '15px',
            color: 'white'
          }}>
            <h4 style={{ marginBottom: '15px' }}>Machine Learning Model Details</h4>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p><strong>Algorithm:</strong> Random Forest Classifier</p>
              <p><strong>Training Data:</strong> 300+ professional AVP matches</p>
              <p><strong>Key Features:</strong> Kills, digs, errors, and aces for both teams</p>
              <p><strong>Model Performance:</strong> 80%+ accuracy on test data</p>
              <p><strong>Prediction Logic:</strong> Analyzes statistical patterns to identify winning combinations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictForm; 