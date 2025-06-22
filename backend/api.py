# AVP Beach Volleyball Analytics Platform - Web API
# Professional sports analytics API with machine learning capabilities

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
model = None
try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print("✅ Model loaded successfully")
    else:
        print("⚠️  Model file not found. Will train model on first request.")
except Exception as e:
    print(f"⚠️  Error loading model: {e}. Will train model on first request.")
    model = None

# Load or create sample data
data_path = os.path.join(os.path.dirname(__file__), 'data', 'volleyball_data.csv')
df = None
try:
    if os.path.exists(data_path):
        df = pd.read_csv(data_path)
        print("✅ Data loaded successfully")
    else:
        print("⚠️  Data file not found. Will use sample data.")
except Exception as e:
    print(f"⚠️  Error loading data: {e}. Will use sample data.")
    df = None

@app.route('/health')
def health_check():
    """Health check endpoint for Railway"""
    return jsonify({
        "status": "healthy",
        "message": "AVP Beach Volleyball Analytics API is running",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/')
def home():
    """API information endpoint"""
    return jsonify({
        "message": "AVP Beach Volleyball Analytics API",
        "description": "Professional sports analytics platform with machine learning capabilities",
        "version": "1.0.0",
        "endpoints": {
            "/": "API information",
            "/health": "Health check",
            "/stats": "Basic match statistics",
            "/dashboard": "Dashboard data for visualizations",
            "/predict": "Predict match winner (POST)",
            "/sample-prediction": "Get sample prediction"
        },
        "author": "Professional Analytics Platform",
        "features": [
            "Advanced data analytics",
            "Machine learning predictions",
            "Real-time statistics",
            "Interactive visualizations"
        ]
    })

@app.route('/stats')
def get_stats():
    """Get basic match statistics"""
    if df is None:
        # Generate sample stats
        total_matches = 150
        team_a_wins = 78
        team_b_wins = 72
        
        return jsonify({
            "total_matches": total_matches,
            "team_a_wins": team_a_wins,
            "team_b_wins": team_b_wins,
            "win_percentage": {
                "team_a": round((team_a_wins / total_matches) * 100, 1),
                "team_b": round((team_b_wins / total_matches) * 100, 1)
            },
            "average_stats": {
                "team_a_kills": 18.5,
                "team_b_kills": 17.2,
                "team_a_digs": 22.3,
                "team_b_digs": 21.8,
                "team_a_errors": 6.1,
                "team_b_errors": 6.8,
                "team_a_aces": 2.3,
                "team_b_aces": 2.1
            }
        })
    
    # Calculate real stats from data
    total_matches = len(df)
    team_a_wins = len(df[df['winner'] == 'Team A'])
    team_b_wins = len(df[df['winner'] == 'Team B'])
    
    return jsonify({
        "total_matches": total_matches,
        "team_a_wins": team_a_wins,
        "team_b_wins": team_b_wins,
        "win_percentage": {
            "team_a": round((team_a_wins / total_matches) * 100, 1),
            "team_b": round((team_b_wins / total_matches) * 100, 1)
        },
        "average_stats": {
            "team_a_kills": round(df['team_a_total_kills'].mean(), 1),
            "team_b_kills": round(df['team_b_total_kills'].mean(), 1),
            "team_a_digs": round(df['team_a_total_digs'].mean(), 1),
            "team_b_digs": round(df['team_b_total_digs'].mean(), 1),
            "team_a_errors": round(df['team_a_total_errors'].mean(), 1),
            "team_b_errors": round(df['team_b_total_errors'].mean(), 1),
            "team_a_aces": round(df['team_a_total_aces'].mean(), 1),
            "team_b_aces": round(df['team_b_total_aces'].mean(), 1)
        }
    })

@app.route('/dashboard')
def get_dashboard_data():
    """Get data for dashboard visualizations"""
    if df is None:
        # Generate sample dashboard data
        return jsonify({
            "efficiency_trend": [
                {"match_number": i, "team_a_kill_efficiency": round(random.uniform(0.6, 0.9), 2), 
                 "team_b_kill_efficiency": round(random.uniform(0.6, 0.9), 2)}
                for i in range(1, 21)
            ],
            "recent_matches": [
                {"match_date": (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d"),
                 "team_a_score": random.randint(15, 25),
                 "team_b_score": random.randint(15, 25)}
                for i in range(10, 0, -1)
            ],
            "top_matches": [
                {"match_date": (datetime.now() - timedelta(days=i*3)).strftime("%Y-%m-%d"),
                 "team_a_total_kills": random.randint(20, 35),
                 "team_b_total_kills": random.randint(20, 35)}
                for i in range(5, 0, -1)
            ]
        })
    
    # Generate real dashboard data
    efficiency_trend = []
    for i in range(min(20, len(df))):
        row = df.iloc[i]
        efficiency_trend.append({
            "match_number": i + 1,
            "team_a_kill_efficiency": round(row['team_a_kill_efficiency'], 2),
            "team_b_kill_efficiency": round(row['team_b_kill_efficiency'], 2)
        })
    
    recent_matches = []
    for i in range(min(10, len(df))):
        row = df.iloc[i]
        recent_matches.append({
            "match_date": row.get('match_date', datetime.now().strftime("%Y-%m-%d")),
            "team_a_score": row['team_a_total_kills'],
            "team_b_score": row['team_b_total_kills']
        })
    
    # Top matches by total kills
    df_with_total = df.copy()
    df_with_total['total_kills'] = df['team_a_total_kills'] + df['team_b_total_kills']
    top_matches = df_with_total.nlargest(5, 'total_kills')[['match_date', 'team_a_total_kills', 'team_b_total_kills']].to_dict('records')
    
    return jsonify({
        "efficiency_trend": efficiency_trend,
        "recent_matches": recent_matches,
        "top_matches": top_matches
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Predict match winner using ML model"""
    global model, df
    
    # Train model if not available
    if model is None:
        try:
            print("🤖 Training model on-demand...")
            from train_model import main as train_main
            train_main()
            
            # Reload model
            if os.path.exists(model_path):
                model = joblib.load(model_path)
                print("✅ Model trained and loaded successfully")
            else:
                return jsonify({"error": "Failed to train model. Please try again."}), 500
        except Exception as e:
            print(f"❌ Error training model: {e}")
            return jsonify({"error": f"Model training failed: {str(e)}"}), 500
    
    try:
        data = request.get_json()
        
        # Map frontend field names to model field names
        features = [
            data.get('team_a_kills', 0),  # team_a_total_kills
            data.get('team_a_digs', 0),   # team_a_total_digs
            data.get('team_a_errors', 0), # team_a_total_errors
            data.get('team_a_aces', 0),   # team_a_total_aces
            data.get('team_b_kills', 0),  # team_b_total_kills
            data.get('team_b_digs', 0),   # team_b_total_digs
            data.get('team_b_errors', 0), # team_b_total_errors
            data.get('team_b_aces', 0),   # team_b_total_aces
            # Calculate kill efficiency (kills / (kills + errors))
            data.get('team_a_kills', 0) / max((data.get('team_a_kills', 0) + data.get('team_a_errors', 0)), 1),
            data.get('team_b_kills', 0) / max((data.get('team_b_kills', 0) + data.get('team_b_errors', 0)), 1)
        ]
        
        # Make prediction
        prediction = model.predict([features])[0]
        probabilities = model.predict_proba([features])[0]
        
        # Determine confidence
        confidence = max(probabilities)
        
        return jsonify({
            "prediction": "Team A" if prediction == 1 else "Team B",
            "confidence": round(confidence, 3),
            "probabilities": {
                "Team A": round(probabilities[0], 3),
                "Team B": round(probabilities[1], 3)
            },
            "features_used": {
                "team_a_kills": features[0],
                "team_a_digs": features[1],
                "team_a_errors": features[2],
                "team_a_aces": features[3],
                "team_b_kills": features[4],
                "team_b_digs": features[5],
                "team_b_errors": features[6],
                "team_b_aces": features[7],
                "team_a_kill_efficiency": round(features[8], 3),
                "team_b_kill_efficiency": round(features[9], 3)
            }
        })
        
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

@app.route('/sample-prediction')
def sample_prediction():
    """Get a sample prediction with sample data"""
    if model is None:
        return jsonify({"error": "Model not available. Please run train_model.py first."}), 500
    
    # Sample data
    sample_data = {
        "team_a_total_kills": 20,
        "team_a_total_digs": 25,
        "team_a_total_errors": 4,
        "team_a_total_aces": 3,
        "team_b_total_kills": 18,
        "team_b_total_digs": 22,
        "team_b_total_errors": 6,
        "team_b_total_aces": 2,
        "team_a_kill_efficiency": 0.78,
        "team_b_kill_efficiency": 0.72
    }
    
    features = list(sample_data.values())
    prediction = model.predict([features])[0]
    probabilities = model.predict_proba([features])[0]
    confidence = max(probabilities)
    
    return jsonify({
        "sample_data": sample_data,
        "prediction": prediction,
        "confidence": round(confidence, 3)
    })

if __name__ == '__main__':
    print("🏐 Starting AVP Beach Volleyball Analytics API...")
    print("Professional sports analytics platform with machine learning capabilities")
    print("API will be available at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000) 