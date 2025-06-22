# AVP Beach Volleyball Analytics Platform - Data Processing
# Professional sports analytics data cleaning and preparation

import pandas as pd
import numpy as np
import os
from datetime import datetime

def create_sample_data():
    """Create comprehensive sample volleyball data for demonstration"""
    print("📊 Creating sample volleyball data...")
    
    np.random.seed(42)
    n_samples = 300
    
    # Generate realistic volleyball match data
    data = {
        'match_date': pd.date_range('2022-01-01', periods=n_samples),
        'team_a_total_kills': np.random.randint(10, 35, n_samples),
        'team_a_total_digs': np.random.randint(15, 40, n_samples),
        'team_a_total_errors': np.random.randint(2, 15, n_samples),
        'team_a_total_aces': np.random.randint(0, 8, n_samples),
        'team_b_total_kills': np.random.randint(10, 35, n_samples),
        'team_b_total_digs': np.random.randint(15, 40, n_samples),
        'team_b_total_errors': np.random.randint(2, 15, n_samples),
        'team_b_total_aces': np.random.randint(0, 8, n_samples),
        'team_a_kill_efficiency': np.random.uniform(0.4, 0.95, n_samples),
        'team_b_kill_efficiency': np.random.uniform(0.4, 0.95, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Create performance-based scoring system
    df['team_a_score'] = (
        df['team_a_total_kills'] * 0.4 + 
        df['team_a_total_aces'] * 0.3 + 
        df['team_a_kill_efficiency'] * 25 - 
        df['team_a_total_errors'] * 0.2
    )
    
    df['team_b_score'] = (
        df['team_b_total_kills'] * 0.4 + 
        df['team_b_total_aces'] * 0.3 + 
        df['team_b_kill_efficiency'] * 25 - 
        df['team_b_total_errors'] * 0.2
    )
    
    # Add realistic variability
    df['team_a_score'] += np.random.normal(0, 3, n_samples)
    df['team_b_score'] += np.random.normal(0, 3, n_samples)
    
    # Determine winners
    df['winner'] = np.where(df['team_a_score'] > df['team_b_score'], 'Team A', 'Team B')
    df['winner_binary'] = np.where(df['winner'] == 'Team A', 1, 0)
    
    # Add additional derived features
    df['total_kills'] = df['team_a_total_kills'] + df['team_b_total_kills']
    df['kill_difference'] = df['team_a_total_kills'] - df['team_b_total_kills']
    df['efficiency_difference'] = df['team_a_kill_efficiency'] - df['team_b_kill_efficiency']
    
    return df

def clean_data(df):
    """Clean and validate the volleyball data"""
    print("🧹 Cleaning and validating data...")
    
    initial_rows = len(df)
    
    # Remove rows with missing values
    df_cleaned = df.dropna()
    print(f"  Removed {initial_rows - len(df_cleaned)} rows with missing data")
    
    # Validate kill efficiency values
    df_cleaned = df_cleaned[
        (df_cleaned['team_a_kill_efficiency'] >= 0) & 
        (df_cleaned['team_a_kill_efficiency'] <= 1) &
        (df_cleaned['team_b_kill_efficiency'] >= 0) & 
        (df_cleaned['team_b_kill_efficiency'] <= 1)
    ]
    print(f"  Removed {len(df) - len(df_cleaned)} rows with invalid efficiency values")
    
    # Remove outliers (statistics that are too extreme)
    for col in ['team_a_total_kills', 'team_b_total_kills', 'team_a_total_digs', 'team_b_total_digs']:
        Q1 = df_cleaned[col].quantile(0.25)
        Q3 = df_cleaned[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        before_count = len(df_cleaned)
        df_cleaned = df_cleaned[(df_cleaned[col] >= lower_bound) & (df_cleaned[col] <= upper_bound)]
        removed_count = before_count - len(df_cleaned)
        if removed_count > 0:
            print(f"  Removed {removed_count} outliers from {col}")
    
    # Ensure all numeric columns are properly typed
    numeric_columns = [
        'team_a_total_kills', 'team_a_total_digs', 'team_a_total_errors', 'team_a_total_aces',
        'team_b_total_kills', 'team_b_total_digs', 'team_b_total_errors', 'team_b_total_aces',
        'team_a_kill_efficiency', 'team_b_kill_efficiency', 'team_a_score', 'team_b_score',
        'total_kills', 'kill_difference', 'efficiency_difference', 'winner_binary'
    ]
    
    for col in numeric_columns:
        if col in df_cleaned.columns:
            df_cleaned[col] = pd.to_numeric(df_cleaned[col], errors='coerce')
    
    # Final cleanup of any remaining NaN values
    df_cleaned = df_cleaned.dropna()
    
    print(f"✅ Data cleaning completed. Final dataset: {len(df_cleaned)} rows")
    return df_cleaned

def add_features(df):
    """Add engineered features for better analysis"""
    print("🔧 Adding engineered features...")
    
    # Performance ratios
    df['team_a_kill_ratio'] = df['team_a_total_kills'] / (df['team_a_total_kills'] + df['team_a_total_errors'])
    df['team_b_kill_ratio'] = df['team_b_total_kills'] / (df['team_b_total_kills'] + df['team_b_total_errors'])
    
    # Efficiency metrics
    df['team_a_overall_efficiency'] = (df['team_a_total_kills'] + df['team_a_total_aces']) / (df['team_a_total_kills'] + df['team_a_total_aces'] + df['team_a_total_errors'])
    df['team_b_overall_efficiency'] = (df['team_b_total_kills'] + df['team_b_total_aces']) / (df['team_b_total_kills'] + df['team_b_total_aces'] + df['team_b_total_errors'])
    
    # Match intensity (total actions)
    df['match_intensity'] = df['total_kills'] + df['team_a_total_digs'] + df['team_b_total_digs']
    
    # Competitive balance
    df['score_difference'] = abs(df['team_a_score'] - df['team_b_score'])
    df['competitive_match'] = df['score_difference'] <= 5
    
    print(f"✅ Added {len(df.columns) - 16} new features")
    return df

def validate_data(df):
    """Validate the cleaned data"""
    print("✅ Validating data quality...")
    
    # Check for required columns
    required_columns = [
        'team_a_total_kills', 'team_a_total_digs', 'team_a_total_errors', 'team_a_total_aces',
        'team_b_total_kills', 'team_b_total_digs', 'team_b_total_errors', 'team_b_total_aces',
        'team_a_kill_efficiency', 'team_b_kill_efficiency', 'winner', 'winner_binary'
    ]
    
    missing_columns = [col for col in required_columns if col not in df.columns]
    if missing_columns:
        print(f"❌ Missing required columns: {missing_columns}")
        return False
    
    # Check data types
    print(f"  Dataset shape: {df.shape}")
    print(f"  Date range: {df['match_date'].min()} to {df['match_date'].max()}")
    print(f"  Winner distribution: {df['winner'].value_counts().to_dict()}")
    
    # Check for reasonable value ranges
    print(f"  Team A kills range: {df['team_a_total_kills'].min()}-{df['team_a_total_kills'].max()}")
    print(f"  Team B kills range: {df['team_b_total_kills'].min()}-{df['team_b_total_kills'].max()}")
    print(f"  Efficiency range: {df['team_a_kill_efficiency'].min():.2f}-{df['team_a_kill_efficiency'].max():.2f}")
    
    return True

def save_data(df, filename='volleyball_data.csv'):
    """Save the processed data"""
    print(f"💾 Saving data to {filename}...")
    
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    filepath = os.path.join('data', filename)
    df.to_csv(filepath, index=False)
    
    print(f"✅ Data saved successfully to {filepath}")
    print(f"📊 File size: {os.path.getsize(filepath) / 1024:.1f} KB")

def main():
    """Main data processing function"""
    print("🏐 AVP Beach Volleyball Analytics - Data Processing")
    print("Professional sports analytics data preparation")
    print("=" * 60)
    
    # Create or load data
    data_path = os.path.join('data', 'volleyball_data.csv')
    if os.path.exists(data_path):
        print("📊 Loading existing data...")
        df = pd.read_csv(data_path)
        df['match_date'] = pd.to_datetime(df['match_date'])
    else:
        print("📊 Creating new sample data...")
        df = create_sample_data()
    
    # Clean the data
    df_cleaned = clean_data(df)
    
    # Add engineered features
    df_enhanced = add_features(df_cleaned)
    
    # Validate the data
    if not validate_data(df_enhanced):
        print("❌ Data validation failed!")
        return
    
    # Save the processed data
    save_data(df_enhanced)
    
    print("\n🎉 Data processing completed successfully!")
    print("The dataset is ready for machine learning model training.")
    print("\nDataset features:")
    print("- Match statistics (kills, digs, errors, aces)")
    print("- Performance metrics (efficiency, ratios)")
    print("- Derived features (intensity, competitive balance)")
    print("- Target variables (winner prediction)")

if __name__ == "__main__":
    main() 