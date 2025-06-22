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
warnings.filterwarnings('ignore')  # Professor said this is okay for demos

def train_match_prediction_model():
    """Train a model to predict which team will win"""
    
    print("=== Training Beach Volleyball Match Prediction Model ===")
    
    # Load cleaned data
    try:
        df = pd.read_csv('data/cleaned_avp.csv')
        print(f"Loaded {len(df)} matches for training")
    except FileNotFoundError:
        print("ERROR: Need to run clean_data.py first!")
        return None
    
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
    df.to_csv('data/avp_matches_2022.csv', index=False)
    print("Sample data created as 'data/avp_matches_2022.csv'")
    return df

if __name__ == "__main__":
    print("=== Beach Volleyball ML Model Training ===")
    print("This script trains a model to predict match winners")
    print()
    
    # Check if cleaned data exists, if not create sample data
    try:
        pd.read_csv('data/cleaned_avp.csv')
        print("Found cleaned data, proceeding with training...")
    except FileNotFoundError:
        print("No cleaned data found. Creating sample data for demo...")
        import os
        os.makedirs('data', exist_ok=True)
        create_sample_data()
        
        # Run data cleaning on sample data
        from clean_data import clean_avp_data
        clean_avp_data()
    
    # Train the model
    model = train_match_prediction_model()
    
    if model is not None:
        print("\n=== Training Complete! ===")
        print("You can now run api.py to start the web server")
    else:
        print("\nTraining failed. Check the error messages above.") 