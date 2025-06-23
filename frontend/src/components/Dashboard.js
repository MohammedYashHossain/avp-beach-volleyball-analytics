import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('team_a_kills');
  const [visualization, setVisualization] = useState(null);

  useEffect(() => {
    fetchDashboardData();
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
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVisualization = async (metric) => {
    try {
      const response = await fetch(`${API_BASE_URL}/visualization/${metric}`);
      if (!response.ok) {
        throw new Error('Failed to fetch visualization');
      }
      const data = await response.json();
      setVisualization(data.visualization);
    } catch (err) {
      console.error('Visualization error:', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading ARIMA Analytics Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-container">
        <p>No dashboard data available</p>
      </div>
    );
  }

  const { recent_trends, win_analysis, forecast_summary, data_summary } = dashboardData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>ARIMA Time Series Analytics Dashboard</h2>
        <p>Real-time volleyball performance forecasting and trend analysis</p>
      </div>

      <div className="dashboard-grid">
        {/* Performance Trends */}
        <div className="dashboard-card">
          <h3>Recent Performance Trends (30 Days)</h3>
          <div className="trends-grid">
            {Object.entries(recent_trends).map(([metric, trend]) => (
              <div key={metric} className="trend-item">
                <h4>{metric.replace('_', ' ').toUpperCase()}</h4>
                <div className="trend-stats">
                  <div className="trend-value">
                    <span className="current">{trend.current_value}</span>
                    <span className="average">Avg: {trend.average_value}</span>
                  </div>
                  <div className={`trend-direction ${trend.trend}`}>
                    {trend.trend === 'increasing' ? '↗' : trend.trend === 'decreasing' ? '↘' : '→'}
                    {trend.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Win Analysis */}
        <div className="dashboard-card">
          <h3>Win Rate Analysis</h3>
          <div className="win-analysis">
            <div className="win-stat">
              <h4>Recent Win Rate</h4>
              <div className="win-percentage">
                <span className="percentage">{win_analysis.recent_win_rate}%</span>
                <span className="matches">({win_analysis.recent_matches} matches)</span>
              </div>
            </div>
            <div className="win-stat">
              <h4>Overall Win Rate</h4>
              <div className="win-percentage">
                <span className="percentage">{win_analysis.overall_win_rate}%</span>
                <span className="matches">({win_analysis.total_matches} total)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Summary */}
        <div className="dashboard-card">
          <h3>ARIMA Forecast Summary (30 Days)</h3>
          <div className="forecast-grid">
            {Object.entries(forecast_summary).map(([metric, forecast]) => (
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
          <h3>Interactive Time Series Analysis</h3>
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
          </div>
          <div className="visualization-container">
            {visualization ? (
              <div 
                className="plotly-chart"
                dangerouslySetInnerHTML={{
                  __html: `
                    <script>
                      var chartData = ${visualization};
                      Plotly.newPlot('chart-container', chartData.data, chartData.layout);
                    </script>
                  `
                }}
              />
            ) : (
              <div className="loading-chart">
                <p>Loading visualization...</p>
              </div>
            )}
            <div id="chart-container" style={{ width: '100%', height: '400px' }}></div>
          </div>
        </div>

        {/* Data Summary */}
        <div className="dashboard-card">
          <h3>Data Summary</h3>
          <div className="data-summary">
            <div className="summary-item">
              <span className="label">Total Observations:</span>
              <span className="value">{data_summary.total_observations}</span>
            </div>
            <div className="summary-item">
              <span className="label">Date Range:</span>
              <span className="value">
                {data_summary.date_range.start} to {data_summary.date_range.end}
              </span>
            </div>
            <div className="summary-item">
              <span className="label">Metrics Available:</span>
              <span className="value">{data_summary.metrics_available.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 