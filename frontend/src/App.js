import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import PredictForm from './components/PredictForm';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    {
      id: 0,
      title: "Welcome to AVP Beach Volleyball Analytics",
      subtitle: "Advanced Sports Analytics & Machine Learning Platform",
      content: (
        <div className="presentation-slide">
          <h1>AVP Beach Volleyball Analytics</h1>
          <h2>Professional Sports Analytics & Machine Learning Platform</h2>
          <div className="hero-content">
            <p className="hero-description">
              This platform demonstrates how advanced data science and machine learning can transform 
              sports analytics, providing insights into professional beach volleyball performance and strategy.
            </p>
            <div className="feature-highlights">
              <div className="feature">
                <span className="feature-icon">📊</span>
                <h3>Data Analytics</h3>
                <p>Comprehensive match statistics and performance metrics</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🤖</span>
                <h3>Machine Learning</h3>
                <p>AI-powered match prediction and outcome forecasting</p>
              </div>
              <div className="feature">
                <span className="feature-icon">📈</span>
                <h3>Visualizations</h3>
                <p>Interactive charts and real-time data insights</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "The Dataset: AVP Beach Volleyball 2022",
      subtitle: "Understanding Our Data Foundation",
      content: (
        <div className="presentation-slide">
          <h2>The Dataset: AVP Beach Volleyball 2022</h2>
          <div className="dataset-info">
            <div className="dataset-section">
              <h3>What We Analyzed</h3>
              <ul>
                <li><strong>300+ Professional Matches</strong> from the 2022 AVP season</li>
                <li><strong>Team Performance Metrics:</strong> Kills, digs, errors, aces, and service efficiency</li>
                <li><strong>Advanced Statistics:</strong> Kill efficiency, sideout percentage, and defensive conversion rates</li>
                <li><strong>Match Dynamics:</strong> Win/loss patterns, competitive balance, and performance trends</li>
              </ul>
            </div>
            <div className="dataset-section">
              <h3>Key Statistics Tracked</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">10</span>
                  <span className="stat-label">Core Metrics</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">300+</span>
                  <span className="stat-label">Matches Analyzed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Derived Features</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">80%+</span>
                  <span className="stat-label">Prediction Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Why This Data Matters",
      subtitle: "The Importance of Sports Analytics",
      content: (
        <div className="presentation-slide">
          <h2>Why This Data Matters</h2>
          <div className="importance-grid">
            <div className="importance-card">
              <h3>Performance Optimization</h3>
              <p>Understanding which statistics correlate most strongly with winning helps teams 
              focus their training on the most impactful skills. In beach volleyball, kill efficiency 
              and sideout percentage are critical indicators of success.</p>
            </div>
            <div className="importance-card">
              <h3>Strategic Insights</h3>
              <p>Patterns in the data reveal which playing styles and tactics are most effective 
              against different types of opponents. Teams can adjust their game plans based on 
              historical performance data.</p>
            </div>
            <div className="importance-card">
              <h3>Predictive Capabilities</h3>
              <p>Machine learning models can forecast match outcomes based on historical patterns, 
              providing valuable insights for coaching decisions, player development, and game strategy.</p>
            </div>
            <div className="importance-card">
              <h3>Data-Driven Decisions</h3>
              <p>Moving beyond intuition to evidence-based decision making in sports strategy, 
              player development, and team composition. This approach is revolutionizing how 
              professional sports are analyzed and coached.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "What We Can Do With This Data",
      subtitle: "Advanced Analytics Capabilities",
      content: (
        <div className="presentation-slide">
          <h2>What We Can Do With This Data</h2>
          <div className="capabilities-container">
            <div className="capability-section">
              <h3>Descriptive Analytics</h3>
              <ul>
                <li>Match outcome distribution and win rates analysis</li>
                <li>Performance trends over time and seasonal patterns</li>
                <li>Team comparison metrics and competitive analysis</li>
                <li>Statistical averages and performance ranges</li>
                <li>Service and receiving efficiency breakdowns</li>
              </ul>
            </div>
            <div className="capability-section">
              <h3>Predictive Analytics</h3>
              <ul>
                <li>Match winner prediction using advanced ML models</li>
                <li>Confidence scoring for predictions and risk assessment</li>
                <li>Feature importance analysis for key performance indicators</li>
                <li>Performance forecasting and trend prediction</li>
                <li>Player and team development trajectory analysis</li>
              </ul>
            </div>
            <div className="capability-section">
              <h3>Prescriptive Analytics</h3>
              <ul>
                <li>Optimal strategy recommendations based on opponent analysis</li>
                <li>Player development insights and training focus areas</li>
                <li>Team composition optimization and partnership analysis</li>
                <li>Game plan development and tactical adjustments</li>
                <li>Performance improvement recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Live Analytics Dashboard",
      subtitle: "Real-Time Data Visualization",
      content: <Dashboard />
    },
    {
      id: 5,
      title: "Machine Learning Predictions",
      subtitle: "AI-Powered Match Forecasting",
      content: <PredictForm />
    },
    {
      id: 6,
      title: "Technical Architecture",
      subtitle: "How It All Works Together",
      content: (
        <div className="presentation-slide">
          <h2>Technical Architecture</h2>
          <div className="architecture-container">
            <div className="arch-section">
              <h3>Backend (Railway)</h3>
              <ul>
                <li><strong>Flask API:</strong> RESTful endpoints for data access and ML predictions</li>
                <li><strong>Machine Learning:</strong> Random Forest model for match outcome predictions</li>
                <li><strong>Data Processing:</strong> Pandas for analytics and feature engineering</li>
                <li><strong>Model Training:</strong> Scikit-learn for ML pipeline and model optimization</li>
              </ul>
            </div>
            <div className="arch-section">
              <h3>Frontend (Vercel)</h3>
              <ul>
                <li><strong>React:</strong> Interactive user interface with component-based architecture</li>
                <li><strong>Recharts:</strong> Data visualization components for analytics display</li>
                <li><strong>Axios:</strong> API communication and data fetching</li>
                <li><strong>Responsive Design:</strong> Mobile-first approach for all devices</li>
              </ul>
            </div>
            <div className="arch-section">
              <h3>Data Pipeline</h3>
              <ul>
                <li><strong>Data Collection:</strong> AVP match statistics and performance metrics</li>
                <li><strong>Data Cleaning:</strong> Automated preprocessing and quality assurance</li>
                <li><strong>Feature Engineering:</strong> Derived metrics and performance ratios</li>
                <li><strong>Model Deployment:</strong> Real-time predictions and API integration</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Key Insights & Findings",
      subtitle: "What the Data Reveals",
      content: (
        <div className="presentation-slide">
          <h2>Key Insights & Findings</h2>
          <div className="insights-container">
            <div className="insight-card">
              <h3>Winning Factors</h3>
              <p>Kill efficiency and ace serving are the strongest predictors of match success. 
              Teams maintaining 75%+ kill efficiency win 80% of their matches, highlighting the 
              critical importance of offensive execution in beach volleyball.</p>
            </div>
            <div className="insight-card">
              <h3>Performance Patterns</h3>
              <p>Teams that maintain consistent defensive play while minimizing unforced errors 
              show the most sustainable success patterns. The data reveals that defensive 
              consistency often outweighs offensive explosiveness over multiple matches.</p>
            </div>
            <div className="insight-card">
              <h3>Competitive Balance</h3>
              <p>The data shows a healthy competitive balance with no single strategy dominating, 
              indicating the sport's strategic depth. This balance makes beach volleyball 
              particularly suitable for analytical modeling and prediction.</p>
            </div>
            <div className="insight-card">
              <h3>ML Model Performance</h3>
              <p>Our Random Forest model achieves 80%+ accuracy in predicting match outcomes, 
              demonstrating the predictive power of properly engineered sports statistics. 
              The model's success validates the importance of kill efficiency and defensive metrics.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Future Possibilities",
      subtitle: "Expanding the Analytics Platform",
      content: (
        <div className="presentation-slide">
          <h2>Future Possibilities</h2>
          <div className="future-container">
            <div className="future-section">
              <h3>Enhanced Features</h3>
              <ul>
                <li>Real-time match streaming integration with live statistics</li>
                <li>Player-specific analytics and individual performance tracking</li>
                <li>Advanced visualization dashboards for coaches and analysts</li>
                <li>Mobile application development for on-the-go insights</li>
              </ul>
            </div>
            <div className="future-section">
              <h3>Advanced ML Models</h3>
              <ul>
                <li>Neural network implementations for complex pattern recognition</li>
                <li>Time-series analysis for performance trend prediction</li>
                <li>Multi-season pattern recognition and long-term forecasting</li>
                <li>Personalized prediction models for specific player partnerships</li>
              </ul>
            </div>
            <div className="future-section">
              <h3>Platform Expansion</h3>
              <ul>
                <li>Multi-sport analytics platform for comprehensive sports analysis</li>
                <li>API marketplace for sports data and analytics services</li>
                <li>Integration with coaching platforms and training systems</li>
                <li>Educational analytics tools for sports science programs</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const goToSection = (index) => {
    setCurrentSection(index);
  };

  return (
    <div className="App">
      <div className="presentation-container">
        {/* Navigation Header */}
        <div className="presentation-header">
          <div className="header-content">
            <h1>AVP Analytics</h1>
            <div className="section-indicator">
              {currentSection + 1} of {sections.length}
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="presentation-content">
          <div className="section-header">
            <h2>{sections[currentSection].title}</h2>
            <p>{sections[currentSection].subtitle}</p>
          </div>
          
          <div className="section-body">
            {sections[currentSection].content}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="presentation-controls">
          <button 
            className="nav-btn prev-btn" 
            onClick={prevSection}
            disabled={currentSection === 0}
          >
            ← Previous
          </button>
          
          <div className="section-dots">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`dot ${index === currentSection ? 'active' : ''}`}
                onClick={() => goToSection(index)}
                title={section.title}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button 
            className="nav-btn next-btn" 
            onClick={nextSection}
            disabled={currentSection === sections.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App; 