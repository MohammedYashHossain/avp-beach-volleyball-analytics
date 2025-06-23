import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

const PredictForm = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    metric: 'team_a_kills',
    days_ahead: 7
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'days_ahead' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictionData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate ARIMA prediction');
      }

      const data = await response.json();
      setPredictionData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMetricDescription = (metric) => {
    const descriptions = {
      'team_a_kills': 'Number of successful offensive plays by Team A',
      'team_b_kills': 'Number of successful offensive plays by Team B',
      'team_a_efficiency': 'Team A\'s kill efficiency ratio (kills/total attempts)',
      'team_b_efficiency': 'Team B\'s kill efficiency ratio (kills/total attempts)',
      'total_kills': 'Combined kill count from both teams',
      'kill_difference': 'Difference between Team A and Team B kills'
    };
    return descriptions[metric] || 'Performance metric for analysis';
  };

  return (
    <div className="predict-form-container">
      <div className="form-header">
        <h2>ARIMA Time Series Forecasting</h2>
        <p>
          Predict future volleyball performance using advanced ARIMA (AutoRegressive Integrated Moving Average) 
          time series analysis. This model captures trends, seasonality, and patterns in historical data to 
          forecast future performance metrics.
        </p>
      </div>

      <div className="form-content">
        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="form-group">
            <label htmlFor="metric">Select Performance Metric:</label>
            <select
              id="metric"
              name="metric"
              value={formData.metric}
              onChange={handleInputChange}
              required
            >
              <option value="team_a_kills">Team A Kills</option>
              <option value="team_b_kills">Team B Kills</option>
              <option value="team_a_efficiency">Team A Efficiency</option>
              <option value="team_b_efficiency">Team B Efficiency</option>
              <option value="total_kills">Total Kills</option>
              <option value="kill_difference">Kill Difference</option>
            </select>
            <p className="metric-description">
              {getMetricDescription(formData.metric)}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="days_ahead">Forecast Horizon (Days):</label>
            <select
              id="days_ahead"
              name="days_ahead"
              value={formData.days_ahead}
              onChange={handleInputChange}
              required
            >
              <option value={7}>7 days (1 week)</option>
              <option value={14}>14 days (2 weeks)</option>
              <option value={30}>30 days (1 month)</option>
              <option value={60}>60 days (2 months)</option>
            </select>
            <p className="forecast-description">
              How far into the future to predict. Longer horizons have higher uncertainty.
            </p>
          </div>

          <button 
            type="submit" 
            className="predict-button"
            disabled={loading}
          >
            {loading ? 'Generating ARIMA Forecast...' : 'Generate ARIMA Forecast'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <h3>Forecast Error</h3>
            <p>{error}</p>
            <p className="error-help">
              This could be due to insufficient historical data or model training issues. 
              Please try a different metric or shorter forecast horizon.
            </p>
          </div>
        )}

        {predictionData && (
          <div className="prediction-results">
            <h3>ARIMA Forecast Results</h3>
            
            <div className="model-info">
              <h4>Model Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Model Type:</span>
                  <span className="value">{predictionData.model_info.type}</span>
                </div>
                <div className="info-item">
                  <span className="label">ARIMA Order:</span>
                  <span className="value">{predictionData.model_info.order}</span>
                </div>
                <div className="info-item">
                  <span className="label">AIC Score:</span>
                  <span className="value">{predictionData.model_info.aic}</span>
                </div>
                <div className="info-item">
                  <span className="label">Current Value:</span>
                  <span className="value">{predictionData.current_value}</span>
                </div>
              </div>
            </div>

            <div className="forecast-table">
              <h4>Detailed Forecast</h4>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Predicted Value</th>
                      <th>Confidence Interval</th>
                      <th>Change (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictionData.predictions.map((pred, index) => (
                      <tr key={index}>
                        <td>{new Date(pred.date).toLocaleDateString()}</td>
                        <td>{pred.predicted_value}</td>
                        <td>
                          {pred.confidence_lower} - {pred.confidence_upper}
                        </td>
                        <td className={pred.percent_change > 0 ? 'positive' : pred.percent_change < 0 ? 'negative' : 'neutral'}>
                          {pred.percent_change > 0 ? '+' : ''}{pred.percent_change}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="forecast-insights">
              <h4>Forecast Insights</h4>
              <div className="insights-grid">
                <div className="insight-card">
                  <h5>Trend Direction</h5>
                  <p>
                    {predictionData.predictions[predictionData.predictions.length - 1].percent_change > 0 
                      ? 'The forecast shows an upward trend, indicating improving performance.' 
                      : predictionData.predictions[predictionData.predictions.length - 1].percent_change < 0 
                      ? 'The forecast shows a downward trend, suggesting declining performance.' 
                      : 'The forecast shows a stable trend with minimal change.'}
                  </p>
                </div>
                <div className="insight-card">
                  <h5>Confidence Level</h5>
                  <p>
                    The confidence intervals show the range of possible values. 
                    Wider intervals indicate higher uncertainty in the forecast.
                  </p>
                </div>
                <div className="insight-card">
                  <h5>Model Reliability</h5>
                  <p>
                    ARIMA models are most reliable for short-term forecasts. 
                    Longer horizons have increasing uncertainty due to accumulated errors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="arima-explanation">
        <h3>Understanding ARIMA Forecasting</h3>
        <div className="explanation-content">
          <div className="explanation-section">
            <h4>What is ARIMA?</h4>
            <p>
              ARIMA (AutoRegressive Integrated Moving Average) is a statistical method for analyzing 
              and forecasting time series data. It combines three components:
            </p>
            <ul>
              <li><strong>AutoRegressive (AR):</strong> Uses past values to predict future values</li>
              <li><strong>Integrated (I):</strong> Makes the time series stationary by differencing</li>
              <li><strong>Moving Average (MA):</strong> Uses past forecast errors to improve predictions</li>
            </ul>
          </div>
          
          <div className="explanation-section">
            <h4>Why ARIMA for Volleyball?</h4>
            <p>
              Volleyball performance data exhibits temporal patterns, trends, and seasonality. 
              ARIMA models can capture these patterns to provide reliable forecasts for:
            </p>
            <ul>
              <li>Performance trends over time</li>
              <li>Seasonal variations in player/team performance</li>
              <li>Predicting future match outcomes</li>
              <li>Identifying improvement or decline patterns</li>
            </ul>
          </div>

          <div className="explanation-section">
            <h4>Interpreting Results</h4>
            <p>
              The forecast provides predicted values with confidence intervals. 
              Positive percentage changes indicate improving performance, while negative 
              changes suggest declining performance. The confidence intervals show the 
              range of likely values, with wider intervals indicating higher uncertainty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictForm; 