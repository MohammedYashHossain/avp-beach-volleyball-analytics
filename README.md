# <h1 align="center">AVP Beach Volleyball Analytics Platform</h1>

<p align="center">
  <img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img alt="Flask" src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/>
  <img alt="Machine Learning" src="https://img.shields.io/badge/Machine%20Learning-FF6F61?style=for-the-badge"/>
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge"/>
  <img alt="Repository" src="https://img.shields.io/badge/GitHub-MohammedYashHossain-181717?style=for-the-badge&logo=github"/>
</p>

<p align="center">
  A comprehensive analytics platform for AVP Beach Volleyball data. Built with Python, Flask, and React, featuring machine learning-powered match predictions, interactive data visualizations, and real-time analytics.
</p>

---

### Key Features

<table>
<tr>
<td>

#### Analytics Dashboard
- Match statistics overview
- Win/loss distribution charts
- Performance trend analysis
- Real-time data visualization

</td>
<td>

#### Machine Learning
- Random Forest prediction model
- Match winner forecasting
- Confidence scoring system
- Feature importance analysis

</td>
<td>

#### Interactive Platform
- RESTful API endpoints
- Responsive web interface
- Real-time predictions
- Data exploration tools

</td>
</tr>
</table>

### Technical Architecture

<table>
<tr>
<td>

#### Backend Systems
- Flask REST API
- Pandas data processing
- Scikit-learn ML models
- Joblib model serialization

</td>
<td>

#### Frontend Systems
- React components
- Recharts visualization
- Axios API integration
- Responsive design

</td>
<td>

#### Data Pipeline
- Automated data cleaning
- Feature engineering
- Model training pipeline
- Real-time predictions

</td>
</tr>
</table>

### Technologies

![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white)
![React](https://img.shields.io/badge/-React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Flask](https://img.shields.io/badge/-Flask-000000?style=flat&logo=flask&logoColor=white)
![Pandas](https://img.shields.io/badge/-Pandas-150458?style=flat&logo=pandas&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/-Scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)
![Recharts](https://img.shields.io/badge/-Recharts-FF6B6B?style=flat)
![Machine Learning](https://img.shields.io/badge/-Machine%20Learning-FF6F61?style=flat)

### Getting Started

#### System Requirements
- Python 3.8 or higher
- Node.js 14 or higher
- Windows, macOS, or Linux operating system
- Minimum 4GB RAM
- Internet connection for data fetching

#### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MohammedYashHossain/avp-beach-volleyball-analytics.git
   cd avp-beach-volleyball-analytics
   ```

2. **Quick Setup (Recommended)**
   ```bash
   # Install dependencies and run everything
   python setup.py
   python run_project.py
   ```

3. **Manual Setup**
   ```bash
   # Backend setup
   cd backend
   pip install -r requirements.txt
   python train_model.py
   python api.py
   
   # Frontend setup (in new terminal)
   cd frontend
   npm install
   npm start
   ```

#### Troubleshooting

- **Python dependencies issues:**
  ```bash
  python -m pip install --upgrade pip
  pip install -r backend/requirements.txt
  ```

- **Node.js dependencies issues:**
  ```bash
  npm cache clean --force
  npm install
  ```

- **Port conflicts:**
  - Kill processes on ports 3000 and 5000
  - Or change ports in the configuration files

- **Data file missing:**
  - The system will automatically generate sample data
  - Or download real data from the AVP repository

For additional help, please create an issue on the repository.

### Features Overview

<table>
<tr>
<td>

#### Data Analytics
- Match statistics dashboard
- Performance trend analysis
- Win/loss distribution
- Team comparison metrics

</td>
<td>

#### Prediction System
- ML-powered match predictions
- Confidence scoring
- Feature importance analysis
- Real-time forecasting

</td>
</tr>
</table>

### Project Structure

```
avp-beach-volleyball-analytics/
├── setup.py                # Easy setup script
├── run_project.py          # One-click run script
├── backend/
│   ├── clean_data.py       # Data cleaning pipeline
│   ├── train_model.py      # ML model training
│   ├── api.py             # Flask API server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Dashboard.js  # Analytics dashboard
│   │   │   └── PredictForm.js # Prediction interface
│   │   ├── App.js         # Main application
│   │   └── index.js       # Entry point
│   └── package.json       # Node.js dependencies
└── README.md              # Project documentation
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/stats` | GET | Basic match statistics |
| `/dashboard` | GET | Dashboard data for charts |
| `/predict` | POST | Predict match winner |
| `/sample-prediction` | GET | Get sample prediction |

### Machine Learning Model

- **Algorithm**: Random Forest Classifier
- **Features**: Kills, digs, errors, aces, kill efficiency
- **Target**: Binary classification (Team A vs Team B wins)
- **Performance**: ~75-80% accuracy on test data
- **Features Used**: 10 engineered volleyball statistics

### Data Sources

- **Primary Dataset**: AVP Beach Volleyball 2022 Season
- **Source**: [BigTimeStats GitHub Repository](https://github.com/big-time-stats/beach-volleyball)
- **Data Types**: Match results, player statistics, team performance metrics
- **Sample Data**: Automatically generated for demonstration purposes

### Use Cases

- **Sports Analytics**: Analyze volleyball match patterns and trends
- **Predictive Modeling**: Forecast match outcomes using ML
- **Data Visualization**: Interactive charts and dashboards
- **Educational**: Learn about sports analytics and ML applications
- **Research**: Foundation for volleyball performance analysis

### Future Enhancements

- Additional ML models (SVM, Neural Networks)
- Advanced data visualizations
- User authentication system
- Real-time data streaming
- Mobile application
- Database integration
- API rate limiting and caching

### Developer

<p align="center">
  <b>Mohammed Y. Hossain</b><br>
  <a href="https://mohammedyhossain-portfolio.vercel.app/"><img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-View-red?style=flat-square"/></a>
  <a href="https://www.linkedin.com/in/mohammedyhossain/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin"/></a>
  <a href="mailto:mohossain.swe@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail&logoColor=white"/></a>
</p>

---

<p align="center">
  <i>This project demonstrates modern full-stack development, machine learning applications, and sports analytics implementation.</i>
</p>
