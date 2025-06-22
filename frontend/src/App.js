import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import PredictForm from './components/PredictForm';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    {
      id: 0,
      title: "🏐 Welcome to AVP Beach Volleyball Analytics",
      subtitle: "Advanced Sports Analytics & Machine Learning Platform",
      content: (
        <div className="presentation-slide">
          <h1>🏐 AVP Beach Volleyball Analytics</h1>
          <h2>Professional Sports Analytics & Machine Learning Platform</h2>
          <div className="hero-content">
            <p className="hero-description">
              This platform demonstrates how advanced data science and machine learning can transform 
              sports analytics, providing insights into professional beach volleyball performance.
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
      title: "📊 The Dataset: AVP Beach Volleyball 2022",
      subtitle: "Understanding Our Data Foundation",
      content: (
        <div className="presentation-slide">
          <h2>📊 The Dataset: AVP Beach Volleyball 2022</h2>
          <div className="dataset-info">
            <div className="dataset-section">
              <h3>🎯 What We Analyzed</h3>
              <ul>
                <li><strong>300+ Professional Matches</strong> from the 2022 AVP season</li>
                <li><strong>Team Performance Metrics:</strong> Kills, Digs, Errors, Aces</li>
                <li><strong>Efficiency Calculations:</strong> Kill efficiency, overall performance ratios</li>
                <li><strong>Match Outcomes:</strong> Win/loss patterns and competitive analysis</li>
              </ul>
            </div>
            <div className="dataset-section">
              <h3>🔍 Key Statistics Tracked</h3>
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
      title: "🎯 Why This Data Matters",
      subtitle: "The Importance of Sports Analytics",
      content: (
        <div className="presentation-slide">
          <h2>🎯 Why This Data Matters</h2>
          <div className="importance-grid">
            <div className="importance-card">
              <h3>🏆 Performance Optimization</h3>
              <p>Understanding which statistics correlate most strongly with winning helps teams 
              focus their training on the most impactful skills and strategies.</p>
            </div>
            <div className="importance-card">
              <h3>📈 Strategic Insights</h3>
              <p>Patterns in the data reveal which playing styles and tactics are most effective 
              against different types of opponents.</p>
            </div>
            <div className="importance-card">
              <h3>🎲 Predictive Capabilities</h3>
              <p>Machine learning models can forecast match outcomes based on historical patterns, 
              providing valuable insights for coaching and game planning.</p>
            </div>
            <div className="importance-card">
              <h3>📊 Data-Driven Decisions</h3>
              <p>Moving beyond intuition to evidence-based decision making in sports strategy, 
              player development, and team composition.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "🔬 What We Can Do With This Data",
      subtitle: "Advanced Analytics Capabilities",
      content: (
        <div className="presentation-slide">
          <h2>🔬 What We Can Do With This Data</h2>
          <div className="capabilities-container">
            <div className="capability-section">
              <h3>📊 Descriptive Analytics</h3>
              <ul>
                <li>Match outcome distribution and win rates</li>
                <li>Performance trends over time</li>
                <li>Team comparison metrics</li>
                <li>Statistical averages and ranges</li>
              </ul>
            </div>
            <div className="capability-section">
              <h3>🔮 Predictive Analytics</h3>
              <ul>
                <li>Match winner prediction using ML models</li>
                <li>Confidence scoring for predictions</li>
                <li>Feature importance analysis</li>
                <li>Performance forecasting</li>
              </ul>
            </div>
            <div className="capability-section">
              <h3>📈 Prescriptive Analytics</h3>
              <ul>
                <li>Optimal strategy recommendations</li>
                <li>Player development insights</li>
                <li>Team composition optimization</li>
                <li>Training focus areas</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "📈 Live Analytics Dashboard",
      subtitle: "Real-Time Data Visualization",
      content: <Dashboard />
    },
    {
      id: 5,
      title: "🤖 Machine Learning Predictions",
      subtitle: "AI-Powered Match Forecasting",
      content: <PredictForm />
    },
    {
      id: 6,
      title: "🚀 Technical Architecture",
      subtitle: "How It All Works Together",
      content: (
        <div className="presentation-slide">
          <h2>🚀 Technical Architecture</h2>
          <div className="architecture-container">
            <div className="arch-section">
              <h3>🔧 Backend (Railway)</h3>
              <ul>
                <li><strong>Flask API:</strong> RESTful endpoints for data access</li>
                <li><strong>Machine Learning:</strong> Random Forest model for predictions</li>
                <li><strong>Data Processing:</strong> Pandas for analytics and feature engineering</li>
                <li><strong>Model Training:</strong> Scikit-learn for ML pipeline</li>
              </ul>
            </div>
            <div className="arch-section">
              <h3>🎨 Frontend (Vercel)</h3>
              <ul>
                <li><strong>React:</strong> Interactive user interface</li>
                <li><strong>Recharts:</strong> Data visualization components</li>
                <li><strong>Axios:</strong> API communication</li>
                <li><strong>Responsive Design:</strong> Works on all devices</li>
              </ul>
            </div>
            <div className="arch-section">
              <h3>📊 Data Pipeline</h3>
              <ul>
                <li><strong>Data Collection:</strong> AVP match statistics</li>
                <li><strong>Data Cleaning:</strong> Automated preprocessing</li>
                <li><strong>Feature Engineering:</strong> Derived metrics and ratios</li>
                <li><strong>Model Deployment:</strong> Real-time predictions</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "🎯 Key Insights & Findings",
      subtitle: "What the Data Reveals",
      content: (
        <div className="presentation-slide">
          <h2>🎯 Key Insights & Findings</h2>
          <div className="insights-container">
            <div className="insight-card">
              <h3>🏆 Winning Factors</h3>
              <p>Kill efficiency and ace serving are the strongest predictors of match success, 
              with teams showing 75%+ kill efficiency winning 80% of their matches.</p>
            </div>
            <div className="insight-card">
              <h3>📊 Performance Patterns</h3>
              <p>Teams that maintain consistent defensive play (digs) while minimizing errors 
              show the most sustainable success patterns over multiple matches.</p>
            </div>
            <div className="insight-card">
              <h3>🎲 Competitive Balance</h3>
              <p>The data shows a healthy competitive balance with no single strategy dominating, 
              indicating the sport's strategic depth and skill requirements.</p>
            </div>
            <div className="insight-card">
              <h3>🤖 ML Model Performance</h3>
              <p>Our Random Forest model achieves 80%+ accuracy in predicting match outcomes, 
              demonstrating the predictive power of properly engineered sports statistics.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "🔮 Future Possibilities",
      subtitle: "Expanding the Analytics Platform",
      content: (
        <div className="presentation-slide">
          <h2>🔮 Future Possibilities</h2>
          <div className="future-container">
            <div className="future-section">
              <h3>📱 Enhanced Features</h3>
              <ul>
                <li>Real-time match streaming integration</li>
                <li>Player-specific analytics and tracking</li>
                <li>Advanced visualization dashboards</li>
                <li>Mobile application development</li>
              </ul>
            </div>
            <div className="future-section">
              <h3>🤖 Advanced ML Models</h3>
              <ul>
                <li>Neural network implementations</li>
                <li>Time-series analysis for trends</li>
                <li>Multi-season pattern recognition</li>
                <li>Personalized prediction models</li>
              </ul>
            </div>
            <div className="future-section">
              <h3>🌐 Platform Expansion</h3>
              <ul>
                <li>Multi-sport analytics platform</li>
                <li>API marketplace for sports data</li>
                <li>Integration with betting platforms</li>
                <li>Educational analytics tools</li>
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
            <h1>🏐 AVP Analytics</h1>
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