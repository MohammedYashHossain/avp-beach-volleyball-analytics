"""
Machine Learning Model Training Script
CS 301 Final Project - ML part
Uses Random Forest to predict match winners
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import warnings
import os
import sys
warnings.filterwarnings('ignore')  # Professor said this is okay for demos

def create_sample_data():
    """Create some sample data for testing if real data isn't available"""
    print("Creating sample data for testing...")
    
    np.random.seed(42)
    n_samples = 100
    
    # Generate realistic volleyball match data
    data = {
        'match_date': pd.date_range('2022-01-01', periods=n_samples),
        'team_a_score': np.random.randint(15, 25, n_samples),
        'team_b_score': np.random.randint(15, 25, n_samples),
        'player_a1_kills': np.random.randint(5, 15, n_samples),
        'player_a2_kills': np.random.randint(5, 15, n_samples),
        'player_a1_digs': np.random.randint(8, 20, n_samples),
        'player_a2_digs': np.random.randint(8, 20, n_samples),
        'player_a1_errors': np.random.randint(2, 8, n_samples),
        'player_a2_errors': np.random.randint(2, 8, n_samples),
        'player_a1_aces': np.random.randint(0, 4, n_samples),
        'player_a2_aces': np.random.randint(0, 4, n_samples),
        'player_b1_kills': np.random.randint(5, 15, n_samples),
        'player_b2_kills': np.random.randint(5, 15, n_samples),
        'player_b1_digs': np.random.randint(8, 20, n_samples),
        'player_b2_digs': np.random.randint(8, 20, n_samples),
        'player_b1_errors': np.random.randint(2, 8, n_samples),
        'player_b2_errors': np.random.randint(2, 8, n_samples),
        'player_b1_aces': np.random.randint(0, 4, n_samples),
        'player_b2_aces': np.random.randint(0, 4, n_samples),
    }
    
    df = pd.DataFrame(data)
    
    # Ensure data directory exists
    os.makedirs('data', exist_ok=True)
    
    df.to_csv('data/avp_matches_2022.csv', index=False)
    print("Sample data created as 'data/avp_matches_2022.csv'")
    return df

def clean_avp_data():
    """Clean the AVP matches data - this was harder than I thought"""
    
    # Load the data
    print("Loading data...")
    try:
        df = pd.read_csv('data/avp_matches_2022.csv')
        print(f"Loaded {len(df)} rows of data")
    except FileNotFoundError:
        print("ERROR: Couldn't find the CSV file!")
        print("Creating sample data for demo...")
        df = create_sample_data()
    
    # Check what we have
    print(f"Columns: {list(df.columns)}")
    print(f"Shape: {df.shape}")
    
    # Remove rows with missing data (professor said this is important)
    print("Removing rows with missing data...")
    initial_rows = len(df)
    df = df.dropna()
    print(f"Removed {initial_rows - len(df)} rows with missing data")
    
    # Convert date column
    print("Converting dates...")
    df['match_date'] = pd.to_datetime(df['match_date'], errors='coerce')
    
    # Create team-level stats by adding player stats together
    print("Creating team stats...")
    
    # Team A stats
    df['team_a_total_kills'] = df['player_a1_kills'] + df['player_a2_kills']
    df['team_a_total_digs'] = df['player_a1_digs'] + df['player_a2_digs']
    df['team_a_total_errors'] = df['player_a1_errors'] + df['player_a2_errors']
    df['team_a_total_aces'] = df['player_a1_aces'] + df['player_a2_aces']
    
    # Team B stats
    df['team_b_total_kills'] = df['player_b1_kills'] + df['player_b2_kills']
    df['team_b_total_digs'] = df['player_b1_digs'] + df['player_b2_digs']
    df['team_b_total_errors'] = df['player_b1_errors'] + df['player_b2_errors']
    df['team_b_total_aces'] = df['player_b1_aces'] + df['player_b2_aces']
    
    # Create some derived features (this is what we learned in class)
    df['team_a_kill_efficiency'] = df['team_a_total_kills'] / (df['team_a_total_kills'] + df['team_a_total_errors'])
    df['team_b_kill_efficiency'] = df['team_b_total_kills'] / (df['team_b_total_kills'] + df['team_b_total_errors'])
    
    # Fill NaN values with 0 (had to google this)
    df = df.fillna(0)
    
    # Save cleaned data
    print("Saving cleaned data...")
    df.to_csv('data/cleaned_avp.csv', index=False)
    print(f"Saved {len(df)} cleaned rows to data/cleaned_avp.csv")
    
    # Show some basic stats
    print("\n=== Data Summary ===")
    print(f"Total matches: {len(df)}")
    print(f"Date range: {df['match_date'].min()} to {df['match_date'].max()}")
    print(f"Average team A kills: {df['team_a_total_kills'].mean():.2f}")
    print(f"Average team B kills: {df['team_b_total_kills'].mean():.2f}")
    
    return df

def train_match_prediction_model():
    """Train a model to predict which team will win"""
    
    print("=== Training Beach Volleyball Match Prediction Model ===")
    
    # Load cleaned data
    try:
        df = pd.read_csv('data/cleaned_avp.csv')
        print(f"Loaded {len(df)} matches for training")
    except FileNotFoundError:
        print("No cleaned data found. Creating sample data for demo...")
        clean_avp_data()
        df = pd.read_csv('data/cleaned_avp.csv')
    
    # Create target variable (1 if Team A wins, 0 if Team B wins)
    print("Creating target variable...")
    df['team_a_wins'] = (df['team_a_score'] > df['team_b_score']).astype(int)
    
    # Select features for the model (these seem important based on volleyball)
    feature_columns = [
        'team_a_total_kills', 'team_a_total_digs', 'team_a_total_errors', 'team_a_total_aces',
        'team_b_total_kills', 'team_b_total_digs', 'team_b_total_errors', 'team_b_total_aces',
        'team_a_kill_efficiency', 'team_b_kill_efficiency'
    ]
    
    # Check if all features exist
    missing_features = [col for col in feature_columns if col not in df.columns]
    if missing_features:
        print(f"ERROR: Missing features: {missing_features}")
        return None
    
    X = df[feature_columns]
    y = df['team_a_wins']
    
    print(f"Features: {feature_columns}")
    print(f"Target distribution: {y.value_counts().to_dict()}")
    
    # Split data into training and testing sets (80/20 split)
    print("Splitting data into train/test sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"Training set: {len(X_train)} samples")
    print(f"Test set: {len(X_test)} samples")
    
    # Train Random Forest model (learned this in class)
    print("Training Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100,  # 100 trees
        random_state=42,   # for reproducibility
        max_depth=10       # prevent overfitting
    )
    
    model.fit(X_train, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Evaluate model
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n=== Model Performance ===")
    print(f"Accuracy: {accuracy:.3f} ({accuracy*100:.1f}%)")
    
    # Show classification report
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['Team B Wins', 'Team A Wins']))
    
    # Feature importance (this is cool!)
    print("\n=== Feature Importance ===")
    feature_importance = pd.DataFrame({
        'feature': feature_columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    for idx, row in feature_importance.iterrows():
        print(f"{row['feature']}: {row['importance']:.3f}")
    
    # Save the model
    print("\nSaving model...")
    joblib.dump(model, 'model.pkl')
    print("Model saved as 'model.pkl'")
    
    # Save feature names for later use
    joblib.dump(feature_columns, 'feature_columns.pkl')
    print("Feature columns saved as 'feature_columns.pkl'")
    
    # Test the model with a sample prediction
    print("\n=== Sample Prediction ===")
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
    
    sample_df = pd.DataFrame([sample_data])
    prediction = model.predict(sample_df)[0]
    probability = model.predict_proba(sample_df)[0]
    
    winner = "Team A" if prediction == 1 else "Team B"
    print(f"Sample prediction: {winner} wins")
    print(f"Confidence: {max(probability):.2f}")
    
    return model

if __name__ == "__main__":
    print("=== Beach Volleyball ML Model Training ===")
    print("This script trains a model to predict match winners")
    print()
    
    try:
        # Train the model
        model = train_match_prediction_model()
        
        if model is not None:
            print("\n=== Training Complete! ===")
            print("You can now run api.py to start the web server")
            sys.exit(0)
        else:
            print("\nTraining failed. Check the error messages above.")
            sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected error during training: {e}")
        sys.exit(1) 