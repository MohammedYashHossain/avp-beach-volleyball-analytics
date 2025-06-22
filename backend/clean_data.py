"""
Data cleaning script for AVP beach volleyball data
CS 301 Final Project - Data cleaning part
"""

import pandas as pd
import numpy as np

def clean_avp_data():
    """Clean the AVP matches data - this was harder than I thought"""
    
    # Load the data
    print("Loading data...")
    try:
        df = pd.read_csv('data/avp_matches_2022.csv')
        print(f"Loaded {len(df)} rows of data")
    except FileNotFoundError:
        print("ERROR: Couldn't find the CSV file!")
        print("Make sure to download avp_matches_2022.csv from the GitHub repo")
        return None
    
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

if __name__ == "__main__":
    print("=== AVP Data Cleaning Script ===")
    print("This script cleans the beach volleyball data for my ML model")
    print()
    
    cleaned_df = clean_avp_data()
    
    if cleaned_df is not None:
        print("\nData cleaning completed successfully!")
        print("You can now run train_model.py to train the ML model")
    else:
        print("\nData cleaning failed. Check the error messages above.") 