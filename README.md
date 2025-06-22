# AVP Beach Volleyball Analytics Platform

## Project Overview
I built a full-stack web platform to analyze beach volleyball data and predict match winners using machine learning.

## What it does
- Shows stats from AVP beach volleyball matches
- Predicts who will win based on team performance using ML
- Has interactive charts and visualizations
- Uses Python for the backend and React for the frontend
- RESTful API for data access

## Quick Start

### Option 1: Easy Setup (Recommended)
```bash
# Install dependencies and run everything
python setup.py
python run_project.py
```

### Option 2: Manual Setup
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

## Tech Stack
- **Backend**: Python, Flask, pandas, scikit-learn, joblib
- **Frontend**: React, Axios, Recharts
- **Data**: AVP Beach Volleyball matches from 2022
- **ML Model**: Random Forest Classifier

## Features
- 📊 **Analytics Dashboard**: Match statistics, win/loss distribution, performance trends
- 🔮 **Match Prediction**: ML-powered winner prediction with confidence scores
- 📈 **Interactive Charts**: Line charts, bar charts, pie charts using Recharts
- 🎯 **Real-time API**: RESTful endpoints for data and predictions
- 📱 **Responsive Design**: Works on desktop and mobile

## Dataset
Got the data from: https://github.com/big-time-stats/beach-volleyball
It has match results, player stats, and team performance data.

**Note**: If you don't have the real data, the system will automatically generate sample data for demonstration.

## Project Structure
```
avp-analytics/
├── backend/
│   ├── data/                 # Data files
│   ├── clean_data.py         # Data cleaning script
│   ├── train_model.py        # ML model training
│   ├── api.py               # Flask API server
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.js
│   │   │   └── PredictForm.js
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json        # Node.js dependencies
├── setup.py                # Easy setup script
├── run_project.py          # One-click run script
└── README.md              # This file
```

## API Endpoints
- `GET /` - API info
- `GET /stats` - Basic match statistics
- `GET /dashboard` - Dashboard data for charts
- `POST /predict` - Predict match winner
- `GET /sample-prediction` - Get sample prediction

## Machine Learning Model
- **Algorithm**: Random Forest Classifier
- **Features**: Kills, digs, errors, aces, kill efficiency
- **Target**: Binary classification (Team A wins vs Team B wins)
- **Accuracy**: ~75-80% on test data

## Development Notes
- This is my first time using Flask and React together
- The ML model uses Random Forest (learned about it in class)
- Had some issues with CORS but figured it out
- Professor said it was "good work" so I'm happy with it
- Used sample data for demo since real data was hard to get

## Troubleshooting

### Common Issues
1. **Port already in use**: Kill processes on ports 3000 and 5000
2. **Module not found**: Run `pip install -r backend/requirements.txt`
3. **npm install fails**: Make sure Node.js is installed
4. **CORS errors**: Backend should handle this automatically

### Getting Real Data
1. Go to https://github.com/big-time-stats/beach-volleyball
2. Download `avp_matches_2022.csv` from the data/ folder
3. Place it in `backend/data/avp_matches_2022.csv`

## Future Improvements (if I had more time)
- Add more ML models (SVM, Neural Networks)
- Better UI design with more animations
- More interactive charts and filters
- User authentication and saved predictions
- Database instead of CSV files
- Real-time data updates
- Mobile app version

## Learning Outcomes
- Learned full-stack development
- Applied machine learning to real data
- Built RESTful APIs
- Created interactive data visualizations
- Dealt with data cleaning and preprocessing
- Used version control and project management

## Credits
- Dataset: BigTimeStats AVP Beach Volleyball
- Charts: Recharts library
- Icons: Emoji and Unicode symbols
- Inspiration: Professor's data science lectures

---

