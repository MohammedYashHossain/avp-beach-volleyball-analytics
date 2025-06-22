import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PredictForm() {
  const [formData, setFormData] = useState({
    team_a_total_kills: 15,
    team_a_total_digs: 20,
    team_a_total_errors: 5,
    team_a_total_aces: 2,
    team_b_total_kills: 12,
    team_b_total_digs: 18,
    team_b_total_errors: 7,
    team_b_total_aces: 1,
    team_a_kill_efficiency: 0.75,
    team_b_kill_efficiency: 0.63
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sampleData, setSampleData] = useState(null);

  // Load sample prediction on component mount
  useEffect(() => {
    loadSamplePrediction();
  }, []);

  const loadSamplePrediction = async () => {
    try {
      const response = await axios.get('/sample-prediction');
      setSampleData(response.data);
    } catch (err) {
      console.error('Failed to load sample prediction:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post('/predict', formData);
      setPrediction(response.data);
    } catch (err) {
      console.error('Prediction failed:', err);
      setError(err.response?.data?.error || 'Failed to make prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      team_a_total_kills: 15,
      team_a_total_digs: 20,
      team_a_total_errors: 5,
      team_a_total_aces: 2,
      team_b_total_kills: 12,
      team_b_total_digs: 18,
      team_b_total_errors: 7,
      team_b_total_aces: 1,
      team_a_kill_efficiency: 0.75,
      team_b_kill_efficiency: 0.63
    });
    setPrediction(null);
    setError(null);
  };

  const loadSampleData = () => {
    if (sampleData) {
      setFormData(sampleData.sample_data);
    }
  };

  return (
    <div className="section">
      <h2>🔮 AI-Powered Match Prediction</h2>
      <p style={{ marginBottom: '20px', color: '#666', textAlign: 'center' }}>
        Leverage machine learning to predict match outcomes based on comprehensive team statistics and performance metrics.
        This demonstrates how AI can analyze complex sports data to forecast results.
      </p>

      {/* Machine Learning Explanation */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
        padding: '20px', 
        borderRadius: '15px', 
        marginBottom: '20px',
        border: '1px solid #dee2e6'
      }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>🤖 How Our ML Model Works</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Random Forest Algorithm:</strong> Uses multiple decision trees to make predictions
          </div>
          <div>
            <strong>Feature Engineering:</strong> Combines raw stats into meaningful performance metrics
          </div>
          <div>
            <strong>Training Data:</strong> Learned from 300+ professional matches
          </div>
          <div>
            <strong>Accuracy:</strong> Achieves 80%+ prediction accuracy
          </div>
        </div>
      </div>

      {/* Sample Prediction Display */}
      {sampleData && (
        <div style={{ 
          background: '#e8f4fd', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #bee5eb'
        }}>
          <h4>💡 Live Prediction Example</h4>
          <p><strong>AI Prediction:</strong> {sampleData.prediction} wins</p>
          <p><strong>Model Confidence:</strong> {(sampleData.confidence * 100).toFixed(1)}%</p>
          <button 
            onClick={loadSampleData}
            style={{
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Load Sample Data
          </button>
        </div>
      )}

      {/* Prediction Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Team A Stats */}
          <div>
            <h3 style={{ color: '#0088FE', marginBottom: '15px' }}>🏐 Team A Performance Metrics</h3>
            
            <div className="form-group">
              <label>Total Kills:</label>
              <input
                type="number"
                name="team_a_total_kills"
                value={formData.team_a_total_kills}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Offensive scoring plays</small>
            </div>

            <div className="form-group">
              <label>Total Digs:</label>
              <input
                type="number"
                name="team_a_total_digs"
                value={formData.team_a_total_digs}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Defensive saves</small>
            </div>

            <div className="form-group">
              <label>Total Errors:</label>
              <input
                type="number"
                name="team_a_total_errors"
                value={formData.team_a_total_errors}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Mistakes and faults</small>
            </div>

            <div className="form-group">
              <label>Total Aces:</label>
              <input
                type="number"
                name="team_a_total_aces"
                value={formData.team_a_total_aces}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Service winners</small>
            </div>

            <div className="form-group">
              <label>Kill Efficiency (0-1):</label>
              <input
                type="number"
                name="team_a_kill_efficiency"
                value={formData.team_a_kill_efficiency}
                onChange={handleInputChange}
                min="0"
                max="1"
                step="0.01"
              />
              <small style={{ color: '#666' }}>Kills / (Kills + Errors)</small>
            </div>
          </div>

          {/* Team B Stats */}
          <div>
            <h3 style={{ color: '#00C49F', marginBottom: '15px' }}>🏐 Team B Performance Metrics</h3>
            
            <div className="form-group">
              <label>Total Kills:</label>
              <input
                type="number"
                name="team_b_total_kills"
                value={formData.team_b_total_kills}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Offensive scoring plays</small>
            </div>

            <div className="form-group">
              <label>Total Digs:</label>
              <input
                type="number"
                name="team_b_total_digs"
                value={formData.team_b_total_digs}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Defensive saves</small>
            </div>

            <div className="form-group">
              <label>Total Errors:</label>
              <input
                type="number"
                name="team_b_total_errors"
                value={formData.team_b_total_errors}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Mistakes and faults</small>
            </div>

            <div className="form-group">
              <label>Total Aces:</label>
              <input
                type="number"
                name="team_b_total_aces"
                value={formData.team_b_total_aces}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <small style={{ color: '#666' }}>Service winners</small>
            </div>

            <div className="form-group">
              <label>Kill Efficiency (0-1):</label>
              <input
                type="number"
                name="team_b_kill_efficiency"
                value={formData.team_b_kill_efficiency}
                onChange={handleInputChange}
                min="0"
                max="1"
                step="0.01"
              />
              <small style={{ color: '#666' }}>Kills / (Kills + Errors)</small>
            </div>
          </div>
        </div>

        {/* Form Buttons */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
          >
            {loading ? 'Analyzing...' : '🔮 Generate AI Prediction'}
          </button>
          
          <button 
            type="button" 
            onClick={resetForm}
            style={{
              background: '#6c757d',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="result error">
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="result success" style={{ marginTop: '20px' }}>
          <h3>🎯 AI Prediction Results</h3>
          <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
            <strong>Predicted Winner: {prediction.prediction}</strong>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Model Confidence:</strong> {(prediction.confidence * 100).toFixed(1)}%
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <h4>Win Probability Analysis:</h4>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0088FE' }}>
                  Team A: {(prediction.probabilities['Team A'] * 100).toFixed(1)}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00C49F' }}>
                  Team B: {(prediction.probabilities['Team B'] * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
            <p><strong>Analysis Features:</strong> {prediction.features_used.join(', ')}</p>
          </div>
        </div>
      )}

      {/* Model Info */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h4>🤖 Machine Learning Model Details</h4>
        <p>This prediction system utilizes a Random Forest machine learning model trained on comprehensive AVP beach volleyball match data.</p>
        <p>The model analyzes key performance indicators including kills, digs, errors, aces, and kill efficiency to generate accurate match outcome predictions.</p>
        <p><strong>Note:</strong> This is a demonstration of advanced sports analytics and should not be used for gambling or betting purposes.</p>
      </div>

      {/* Feature Importance Explanation */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        borderRadius: '15px',
        color: 'white'
      }}>
        <h4 style={{ marginBottom: '15px' }}>🎯 Understanding the Prediction Factors</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Kill Efficiency:</strong> Most important factor - shows offensive effectiveness
          </div>
          <div>
            <strong>Total Kills:</strong> Direct scoring ability and offensive power
          </div>
          <div>
            <strong>Total Errors:</strong> Negative impact - reduces winning probability
          </div>
          <div>
            <strong>Total Aces:</strong> Service effectiveness and pressure creation
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictForm; 