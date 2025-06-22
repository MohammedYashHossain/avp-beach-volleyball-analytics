# AVP Beach Volleyball Analytics Platform - ML Model Training
# Professional sports analytics with machine learning capabilities

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
from datetime import datetime

def create_sample_data():
    """Create sample volleyball data for demonstration"""
    np.random.seed(42)
    n_samples = 200
    
    # Generate realistic volleyball statistics
    data = {
        'team_a_total_kills': np.random.randint(10, 30, n_samples),
        'team_a_total_digs': np.random.randint(15, 35, n_samples),
        'team_a_total_errors': np.random.randint(2, 12, n_samples),
        'team_a_total_aces': np.random.randint(0, 6, n_samples),
        'team_b_total_kills': np.random.randint(10, 30, n_samples),
        'team_b_total_digs': np.random.randint(15, 35, n_samples),
        'team_b_total_errors': np.random.randint(2, 12, n_samples),
        'team_b_total_aces': np.random.randint(0, 6, n_samples),
        'team_a_kill_efficiency': np.random.uniform(0.5, 0.9, n_samples),
        'team_b_kill_efficiency': np.random.uniform(0.5, 0.9, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Create target variable (winner) based on performance
    df['team_a_score'] = (df['team_a_total_kills'] * 0.4 + 
                         df['team_a_total_aces'] * 0.3 + 
                         df['team_a_kill_efficiency'] * 20 - 
                         df['team_a_total_errors'] * 0.2)
    
    df['team_b_score'] = (df['team_b_total_kills'] * 0.4 + 
                         df['team_b_total_aces'] * 0.3 + 
                         df['team_b_kill_efficiency'] * 20 - 
                         df['team_b_total_errors'] * 0.2)
    
    # Add some randomness to make it more realistic
    df['team_a_score'] += np.random.normal(0, 2, n_samples)
    df['team_b_score'] += np.random.normal(0, 2, n_samples)
    
    # Determine winner
    df['winner'] = np.where(df['team_a_score'] > df['team_b_score'], 'Team A', 'Team B')
    df['winner_binary'] = np.where(df['winner'] == 'Team A', 1, 0)
    
    return df

def load_or_create_data():
    """Load existing data or create sample data"""
    data_path = os.path.join('data', 'volleyball_data.csv')
    
    if os.path.exists(data_path):
        print("📊 Loading existing volleyball data...")
        df = pd.read_csv(data_path)
        if 'winner_binary' not in df.columns:
            # Add binary target if not present
            df['winner_binary'] = np.where(df['winner'] == 'Team A', 1, 0)
    else:
        print("📊 Creating sample volleyball data...")
        df = create_sample_data()
        
        # Create data directory if it doesn't exist
        os.makedirs('data', exist_ok=True)
        df.to_csv(data_path, index=False)
        print(f"✅ Sample data saved to {data_path}")
    
    return df

def prepare_features(df):
    """Prepare features for machine learning"""
    feature_columns = [
        'team_a_total_kills', 'team_a_total_digs', 'team_a_total_errors', 'team_a_total_aces',
        'team_b_total_kills', 'team_b_total_digs', 'team_b_total_errors', 'team_b_total_aces',
        'team_a_kill_efficiency', 'team_b_kill_efficiency'
    ]
    
    X = df[feature_columns]
    y = df['winner_binary']
    
    return X, y, feature_columns

def train_model(X, y):
    """Train the Random Forest model"""
    print("🤖 Training Random Forest model...")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Create and train model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"✅ Model training completed!")
    print(f"📈 Test Accuracy: {accuracy:.3f} ({accuracy*100:.1f}%)")
    
    # Print detailed classification report
    print("\n📊 Classification Report:")
    print(classification_report(y_test, y_pred, target_names=['Team B', 'Team A']))
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\n🎯 Feature Importance:")
    for _, row in feature_importance.head(5).iterrows():
        print(f"  {row['feature']}: {row['importance']:.3f}")
    
    return model, accuracy

def save_model(model, accuracy):
    """Save the trained model"""
    print("\n💾 Saving model...")
    
    # Save model
    joblib.dump(model, 'model.pkl')
    print("✅ Model saved as 'model.pkl'")
    
    # Save model info
    model_info = {
        'accuracy': accuracy,
        'training_date': datetime.now().isoformat(),
        'model_type': 'RandomForestClassifier',
        'features': [
            'team_a_total_kills', 'team_a_total_digs', 'team_a_total_errors', 'team_a_total_aces',
            'team_b_total_kills', 'team_b_total_digs', 'team_b_total_errors', 'team_b_total_aces',
            'team_a_kill_efficiency', 'team_b_kill_efficiency'
        ]
    }
    
    joblib.dump(model_info, 'model_info.pkl')
    print("✅ Model info saved as 'model_info.pkl'")

def main():
    """Main training function"""
    print("🏐 AVP Beach Volleyball Analytics - Model Training")
    print("Professional sports analytics with machine learning capabilities")
    print("=" * 60)
    
    # Load or create data
    df = load_or_create_data()
    print(f"📊 Dataset size: {len(df)} matches")
    print(f"📊 Features: {len(df.columns)} columns")
    
    # Prepare features
    X, y, feature_columns = prepare_features(df)
    print(f"🎯 Target distribution: {y.value_counts().to_dict()}")
    
    # Train model
    model, accuracy = train_model(X, y)
    
    # Save model
    save_model(model, accuracy)
    
    print("\n🎉 Model training completed successfully!")
    print("The model is ready for predictions in the analytics platform.")
    print("\nModel capabilities:")
    print("- Predicts match winners based on team statistics")
    print("- Provides confidence scores for predictions")
    print("- Analyzes feature importance for insights")
    print("- Supports real-time match analysis")

if __name__ == "__main__":
    main() 