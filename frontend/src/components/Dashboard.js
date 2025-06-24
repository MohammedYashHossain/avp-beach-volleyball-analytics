import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('team_a_kills');
  const [visualization, setVisualization] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [timeseriesData, setTimeseriesData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    fetchTimeseriesData();
    fetchForecastData();
  }, []);

  useEffect(() => {
    if (selectedMetric) {
      fetchVisualization(selectedMetric);
    }
  }, [selectedMetric]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/dashboard`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(`Failed to fetch dashboard data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeseriesData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/timeseries`);
      if (response.ok) {
        const data = await response.json();
        setTimeseriesData(data);
      }
    } catch (err) {
      console.error('Timeseries fetch error:', err);
    }
  };

  const fetchForecastData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/forecast`);
      if (response.ok) {
        const data = await response.json();
        setForecastData(data);
      }
    } catch (err) {
      console.error('Forecast fetch error:', err);
    }
  };

  const fetchVisualization = async (metric) => {
    try {
      const response = await fetch(`${API_BASE_URL}/visualization/${metric}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVisualization(data.visualization);
    } catch (err) {
      console.error('Visualization error:', err);
      setVisualization(null);
    }
  };

  const renderTrendIndicator = (trend) => {
    const indicators = {
      increasing: { icon: '↗', color: '#10B981', text: 'Increasing' },
      decreasing: { icon: '↘', color: '#EF4444', text: 'Decreasing' },
      stable: { icon: '→', color: '#6B7280', text: 'Stable' }
    };
    
    const indicator = indicators[trend] || indicators.stable;
    
    return (
      <div className="trend-indicator" style={{ color: indicator.color }}>
        <span className="trend-icon">{indicator.icon}</span>
        <span className="trend-text">{indicator.text}</span>
      </div>
    );
  };

  const renderForecastChart = () => {
    if (!visualization) {
      return (
        <div className="chart-placeholder">
          <p>Loading ARIMA visualization...</p>
        </div>
      );
    }

    try {
      const chartData = JSON.parse(visualization);
      return (
        <div className="chart-container">
          <div 
            id="arima-chart"
            style={{ width: '100%', height: '400px' }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof Plotly !== 'undefined') {
                  Plotly.newPlot('arima-chart', chartData.data, chartData.layout, {
                    responsive: true,
                    displayModeBar: true,
                    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
                  });
                }
              `
            }}
          />
        </div>
      );
    } catch (err) {
      console.error('Chart rendering error:', err);
      return (
        <div className="chart-error">
          <p>Error rendering chart. Please try again.</p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading ARIMA Analytics Dashboard...</p>
          <p className="loading-subtitle">Training models and generating forecasts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h3>⚠️ Connection Error</h3>
          <p>{error}</p>
          <div className="error-solutions">
            <h4>Solutions:</h4>
            <ul>
              <li>Make sure the backend server is running on port 5000</li>
              <li>Check if the backend URL is correct in config.js</li>
              <li>Try running: <code>python backend/api.py</code></li>
              <li>Check the browser console for more details</li>
            </ul>
          </div>
          <button onClick={fetchDashboardData} className="retry-button">
            🔄 Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-container">
        <div className="no-data-message">
          <h3>📊 No Dashboard Data Available</h3>
          <p>The ARIMA analytics system is not responding. Please check the backend connection.</p>
        </div>
      </div>
    );
  }

  const { recent_trends, win_analysis, forecast_summary, data_summary } = dashboardData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>🔮 ARIMA Time Series Analytics Dashboard</h2>
        <p>Real-time volleyball performance forecasting and trend analysis using ARIMA models</p>
        <div className="dashboard-stats">
          <span className="stat-item">
            <strong>Models:</strong> {forecastData?.models_used?.length || 0} ARIMA
          </span>
          <span className="stat-item">
            <strong>Forecast Horizon:</strong> 30 days
          </span>
          <span className="stat-item">
            <strong>Data Points:</strong> {data_summary?.total_observations || 0}
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Performance Trends */}
        <div className="dashboard-card">
          <h3>📈 Recent Performance Trends (30 Days)</h3>
          <div className="trends-grid">
            {Object.entries(recent_trends || {}).map(([metric, trend]) => (
              <div key={metric} className="trend-item">
                <h4>{metric.replace('_', ' ').toUpperCase()}</h4>
                <div className="trend-stats">
                  <div className="trend-value">
                    <span className="current">{trend.current_value}</span>
                    <span className="average">Avg: {trend.average_value}</span>
                  </div>
                  {renderTrendIndicator(trend.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Win Analysis */}
        <div className="dashboard-card">
          <h3>🏆 Win Rate Analysis</h3>
          <div className="win-analysis">
            <div className="win-stat">
              <h4>Recent Win Rate</h4>
              <div className="win-percentage">
                <span className="percentage">{win_analysis?.recent_win_rate || 0}%</span>
                <span className="matches">({win_analysis?.recent_matches || 0} matches)</span>
              </div>
            </div>
            <div className="win-stat">
              <h4>Overall Win Rate</h4>
              <div className="win-percentage">
                <span className="percentage">{win_analysis?.overall_win_rate || 0}%</span>
                <span className="matches">({win_analysis?.total_matches || 0} total)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Summary */}
        <div className="dashboard-card">
          <h3>🔮 ARIMA Forecast Summary (30 Days)</h3>
          <div className="forecast-grid">
            {Object.entries(forecast_summary || {}).map(([metric, forecast]) => (
              <div key={metric} className="forecast-item">
                <h4>{metric.replace('_', ' ').toUpperCase()}</h4>
                <div className="forecast-stats">
                  <div className="forecast-values">
                    <span className="current">Current: {forecast.current_value}</span>
                    <span className="forecasted">Forecast: {forecast.forecasted_value}</span>
                  </div>
                  <div className={`forecast-change ${forecast.trend}`}>
                    {forecast.percent_change > 0 ? '+' : ''}{forecast.percent_change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Visualization */}
        <div className="dashboard-card full-width">
          <h3>📊 Interactive ARIMA Time Series Analysis</h3>
          <div className="visualization-controls">
            <label htmlFor="metric-select">Select Metric:</label>
            <select 
              id="metric-select"
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="team_a_kills">Team A Kills</option>
              <option value="team_b_kills">Team B Kills</option>
              <option value="team_a_efficiency">Team A Efficiency</option>
              <option value="team_b_efficiency">Team B Efficiency</option>
              <option value="total_kills">Total Kills</option>
              <option value="kill_difference">Kill Difference</option>
            </select>
            <button 
              onClick={() => fetchVisualization(selectedMetric)}
              className="refresh-chart-btn"
            >
              🔄 Refresh Chart
            </button>
          </div>
          <div className="visualization-container">
            {renderForecastChart()}
          </div>
        </div>

        {/* Data Summary */}
        <div className="dashboard-card">
          <h3>📋 Data Summary</h3>
          <div className="data-summary">
            <div className="summary-item">
              <strong>Total Observations:</strong> {data_summary?.total_observations || 0}
            </div>
            <div className="summary-item">
              <strong>Date Range:</strong> {data_summary?.date_range?.start || 'N/A'} to {data_summary?.date_range?.end || 'N/A'}
            </div>
            <div className="summary-item">
              <strong>Metrics Available:</strong> {data_summary?.metrics_available?.length || 0}
            </div>
            <div className="summary-item">
              <strong>ARIMA Models:</strong> {forecastData?.models_used?.length || 0}
            </div>
          </div>
        </div>

        {/* Forecast Details */}
        {forecastData && (
          <div className="dashboard-card">
            <h3>🔮 Detailed Forecasts</h3>
            <div className="forecast-details">
              <div className="forecast-info">
                <strong>Forecast Horizon:</strong> {forecastData.forecast_horizon}
              </div>
              <div className="forecast-info">
                <strong>Last Update:</strong> {new Date(forecastData.last_update).toLocaleString()}
              </div>
              <div className="forecast-metrics">
                <strong>Metrics with Forecasts:</strong>
                <ul>
                  {forecastData.models_used?.map(metric => (
                    <li key={metric}>{metric.replace('_', ' ').toUpperCase()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 