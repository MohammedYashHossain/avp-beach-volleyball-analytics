"""
Flask API for Beach Volleyball Analytics
CS 301 Final Project - Web API part
This is my first time building a REST API!
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to connect (had CORS issues before)

# Global variables to store model and data
model = None
feature_columns = None
df = None

def load_model_and_data():
    """Load the trained model and data"""
    global model, feature_columns, df
    
    try:
        # Load the trained model
        model = joblib.load('model.pkl')
        print("✓ Model loaded successfully")
        
        # Load feature columns
        feature_columns = joblib.load('feature_columns.pkl')
        print("✓ Feature columns loaded")
        
        # Load cleaned data
        df = pd.read_csv('data/cleaned_avp.csv')
        print("✓ Data loaded successfully")
        
        return True
    except FileNotFoundError as e:
        print(f"ERROR: Could not load model or data: {e}")
        print("Make sure to run train_model.py first!")
        return False

@app.route('/')
def home():
    """Home endpoint - just says hello"""
    return jsonify({
        "message": "Welcome to AVP Beach Volleyball Analytics API!",
        "endpoints": {
            "/": "This info page",
            "/predict": "POST - Predict match winner",
            "/stats": "GET - Get match statistics",
            "/dashboard": "GET - Get dashboard data"
        },
        "author": "CS 301 Student",
        "project": "Beach Volleyball Analytics",
        "status": "running"
    })

@app.route('/predict', methods=['POST'])
def predict_match():
    """Predict which team will win based on stats"""
    
    if model is None:
        return jsonify({"error": "Model not loaded. Run train_model.py first!"}), 500
    
    try:
        # Get data from request
        data = request.json
        
        # Check if we have all required features
        missing_features = [col for col in feature_columns if col not in data]
        if missing_features:
            return jsonify({
                "error": f"Missing features: {missing_features}",
                "required_features": feature_columns
            }), 400
        
        # Create feature vector
        features = [data[col] for col in feature_columns]
        features_df = pd.DataFrame([features], columns=feature_columns)
        
        # Make prediction
        prediction = model.predict(features_df)[0]
        probabilities = model.predict_proba(features_df)[0]
        
        # Determine winner and confidence
        winner = "Team A" if prediction == 1 else "Team B"
        confidence = max(probabilities)
        
        return jsonify({
            "prediction": winner,
            "confidence": round(confidence, 3),
            "probabilities": {
                "Team A": round(probabilities[1], 3),
                "Team B": round(probabilities[0], 3)
            },
            "features_used": feature_columns
        })
        
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get basic statistics about the dataset"""
    
    if df is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    try:
        # Calculate some basic stats
        total_matches = len(df)
        team_a_wins = (df['team_a_score'] > df['team_b_score']).sum()
        team_b_wins = total_matches - team_a_wins
        
        # Average stats
        avg_stats = {
            "team_a_kills": round(df['team_a_total_kills'].mean(), 2),
            "team_a_digs": round(df['team_a_total_digs'].mean(), 2),
            "team_a_errors": round(df['team_a_total_errors'].mean(), 2),
            "team_b_kills": round(df['team_b_total_kills'].mean(), 2),
            "team_b_digs": round(df['team_b_total_digs'].mean(), 2),
            "team_b_errors": round(df['team_b_total_errors'].mean(), 2)
        }
        
        return jsonify({
            "total_matches": total_matches,
            "team_a_wins": team_a_wins,
            "team_b_wins": team_b_wins,
            "win_percentage": {
                "team_a": round(team_a_wins / total_matches * 100, 1),
                "team_b": round(team_b_wins / total_matches * 100, 1)
            },
            "average_stats": avg_stats
        })
        
    except Exception as e:
        return jsonify({"error": f"Stats calculation failed: {str(e)}"}), 500

@app.route('/dashboard', methods=['GET'])
def get_dashboard_data():
    """Get data for the dashboard charts"""
    
    if df is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    try:
        # Get recent matches (last 10)
        recent_matches = df.tail(10)[['match_date', 'team_a_score', 'team_b_score']].to_dict('records')
        
        # Calculate kill efficiency over time
        df['match_number'] = range(len(df))
        efficiency_data = df[['match_number', 'team_a_kill_efficiency', 'team_b_kill_efficiency']].to_dict('records')
        
        # Top performing matches (highest combined kills)
        df['total_kills'] = df['team_a_total_kills'] + df['team_b_total_kills']
        top_matches = df.nlargest(5, 'total_kills')[['match_date', 'team_a_total_kills', 'team_b_total_kills']].to_dict('records')
        
        return jsonify({
            "recent_matches": recent_matches,
            "efficiency_trend": efficiency_data,
            "top_matches": top_matches,
            "total_matches": len(df)
        })
        
    except Exception as e:
        return jsonify({"error": f"Dashboard data failed: {str(e)}"}), 500

@app.route('/sample-prediction', methods=['GET'])
def get_sample_prediction():
    """Get a sample prediction with example data"""
    
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    # Sample data for demonstration
    sample_data = {
        'team_a_total_kills': 15,
        'team_a_total_digs': 20,
        'team_a_total_errors': 5,
        'team_a_total_aces': 2,
        'team_b_total_kills': 12,
        'team_b_total_digs': 18,
        'team_b_total_errors': 7,
        'team_b_total_aces': 1,
        'team_a_kill_efficiency': 0.75,
        'team_b_kill_efficiency': 0.63
    }
    
    # Make prediction
    features = [sample_data[col] for col in feature_columns]
    features_df = pd.DataFrame([features], columns=feature_columns)
    
    prediction = model.predict(features_df)[0]
    probabilities = model.predict_proba(features_df)[0]
    
    winner = "Team A" if prediction == 1 else "Team B"
    confidence = max(probabilities)
    
    return jsonify({
        "sample_data": sample_data,
        "prediction": winner,
        "confidence": round(confidence, 3),
        "probabilities": {
            "Team A": round(probabilities[1], 3),
            "Team B": round(probabilities[0], 3)
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for deployment platforms"""
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "data_loaded": df is not None
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("=== Starting AVP Beach Volleyball API ===")
    print("Loading model and data...")
    
    if load_model_and_data():
        print("✓ Everything loaded successfully!")
        print("API is ready to serve requests")
        
        # Get port from environment variable (for deployment platforms)
        port = int(os.environ.get('PORT', 5000))
        
        print(f"Frontend can connect to: http://localhost:{port}")
        print("Press Ctrl+C to stop the server")
        print()
        
        # Run the Flask app
        app.run(debug=False, host='0.0.0.0', port=port)
    else:
        print("❌ Failed to load model or data")
        print("Please run train_model.py first to create the model") 