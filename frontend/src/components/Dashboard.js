import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch basic stats
        const statsResponse = await axios.get('/stats');
        setStats(statsResponse.data);
        
        // Fetch dashboard data for charts
        const dashboardResponse = await axios.get('/dashboard');
        setDashboardData(dashboardResponse.data);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="section">
        <h2>📊 Live Analytics Dashboard</h2>
        <div className="loading">Loading comprehensive volleyball statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <h2>📊 Live Analytics Dashboard</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>📊 Live Analytics Dashboard</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Real-time analysis of AVP beach volleyball match data, showcasing key performance metrics and trends.
      </p>
      
      {/* Basic Statistics Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Matches Analyzed</h3>
            <div className="value">{stats.total_matches}</div>
            <p>Professional matches in dataset</p>
          </div>
          <div className="stat-card">
            <h3>Team A Win Rate</h3>
            <div className="value">{stats.team_a_wins}</div>
            <p>({stats.win_percentage.team_a}% success rate)</p>
          </div>
          <div className="stat-card">
            <h3>Team B Win Rate</h3>
            <div className="value">{stats.team_b_wins}</div>
            <p>({stats.win_percentage.team_b}% success rate)</p>
          </div>
          <div className="stat-card">
            <h3>Avg Team A Kills</h3>
            <div className="value">{stats.average_stats.team_a_kills}</div>
            <p>Per match average</p>
          </div>
          <div className="stat-card">
            <h3>Avg Team B Kills</h3>
            <div className="value">{stats.average_stats.team_b_kills}</div>
            <p>Per match average</p>
          </div>
          <div className="stat-card">
            <h3>Avg Team A Digs</h3>
            <div className="value">{stats.average_stats.team_a_digs}</div>
            <p>Defensive plays per match</p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {dashboardData && (
        <div style={{ marginTop: '30px' }}>
          <h3>📈 Performance Analytics & Trends</h3>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Interactive visualizations showing performance patterns and statistical insights from professional beach volleyball matches.
          </p>
          
          {/* Win/Loss Distribution Pie Chart */}
          {stats && (
            <div style={{ marginBottom: '30px' }}>
              <h4>Match Outcome Distribution</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                Overall win distribution across all analyzed matches, providing insights into competitive balance.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart width={400} height={300}>
                  <Pie
                    data={[
                      { name: 'Team A Wins', value: stats.team_a_wins },
                      { name: 'Team B Wins', value: stats.team_b_wins }
                    ]}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#0088FE" />
                    <Cell fill="#00C49F" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          )}

          {/* Kill Efficiency Trend */}
          {dashboardData.efficiency_trend && dashboardData.efficiency_trend.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h4>Kill Efficiency Progression</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                Tracking kill efficiency over time to identify performance trends and improvement patterns.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LineChart width={800} height={300} data={dashboardData.efficiency_trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="match_number" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="team_a_kill_efficiency" stroke="#0088FE" name="Team A Efficiency" />
                  <Line type="monotone" dataKey="team_b_kill_efficiency" stroke="#00C49F" name="Team B Efficiency" />
                </LineChart>
              </div>
            </div>
          )}

          {/* Recent Matches Bar Chart */}
          {dashboardData.recent_matches && dashboardData.recent_matches.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h4>Recent Match Scoring Analysis</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                Score comparison across recent matches, highlighting offensive performance and scoring patterns.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BarChart width={800} height={300} data={dashboardData.recent_matches}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="match_date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="team_a_score" fill="#0088FE" name="Team A Score" />
                  <Bar dataKey="team_b_score" fill="#00C49F" name="Team B Score" />
                </BarChart>
              </div>
            </div>
          )}

          {/* Top Matches Table */}
          {dashboardData.top_matches && dashboardData.top_matches.length > 0 && (
            <div>
              <h4>🏆 High-Performance Match Analysis</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                Matches with the highest combined kill counts, representing peak offensive performance.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Match Date</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Team A Kills</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Team B Kills</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Total Kills</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.top_matches.map((match, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                          {new Date(match.match_date).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                          {match.team_a_total_kills}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                          {match.team_b_total_kills}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>
                          {match.team_a_total_kills + match.team_b_total_kills}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard; 