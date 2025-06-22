import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('/predict', formData);
      setPrediction(response.data);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to generate prediction. Please check your input values and try again.');
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
    <div className="section">
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

        {/* Results and Information */}
        <div>
          <h3>Prediction Results</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            The machine learning model analyzes the input statistics and provides a prediction with confidence level. 
            This demonstrates how AI can process complex sports data to forecast outcomes based on historical patterns.
          </p>

          {loading && (
            <div className="loading">
              Analyzing team statistics and generating prediction...
            </div>
          )}

          {error && (
            <div className="result error">
              <h4>Prediction Error</h4>
              <p>{error}</p>
            </div>
          )}

          {prediction && (
            <div className="result success">
              <h4>Match Prediction</h4>
              <div style={{ marginBottom: '15px' }}>
                <strong>Predicted Winner:</strong> {prediction.predicted_winner}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Confidence Level:</strong> {prediction.confidence}%
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Model Accuracy:</strong> 80%+ (based on historical data)
              </div>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                This prediction is based on the Random Forest algorithm analyzing patterns from 300+ professional matches.
              </p>
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

          {/* Strategy Insights */}
          <div style={{ 
            marginTop: '20px', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '15px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>Strategic Insights</h4>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#555' }}>
              <p><strong>Kill Efficiency:</strong> Teams with higher kill counts typically win more matches, as offensive success directly translates to points.</p>
              <p><strong>Defensive Consistency:</strong> Digs indicate defensive skill and the ability to extend rallies, creating more scoring opportunities.</p>
              <p><strong>Error Management:</strong> Minimizing unforced errors is crucial, as each error gives the opponent a point and momentum.</p>
              <p><strong>Service Pressure:</strong> Aces provide immediate points and can disrupt opponent rhythm, making them valuable despite being less frequent.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div style={{ 
        marginTop: '40px', 
        padding: '25px', 
        background: 'white', 
        borderRadius: '15px',
        border: '2px solid #ecf0f1'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>Technical Implementation</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#3498db', marginBottom: '10px' }}>Data Processing</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
              Raw match statistics are processed and normalized to ensure consistent model performance. 
              Feature engineering creates derived metrics that better capture performance patterns.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#3498db', marginBottom: '10px' }}>Model Training</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
              The Random Forest algorithm is trained on historical match data, learning patterns 
              that distinguish winning from losing performance combinations.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#3498db', marginBottom: '10px' }}>Real-Time Prediction</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
              New match statistics are processed through the trained model to generate predictions 
              with confidence scores, enabling real-time strategic insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictForm; 