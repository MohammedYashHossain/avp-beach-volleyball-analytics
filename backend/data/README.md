# Data Directory

This directory contains the beach volleyball match data used for the analytics platform.

## Getting the Data

### Option 1: Download from GitHub
1. Go to: https://github.com/big-time-stats/beach-volleyball
2. Navigate to the `data/` folder
3. Download `avp_matches_2022.csv`

### Option 2: Clone the Repository
```bash
git clone https://github.com/big-time-stats/beach-volleyball.git
cp beach-volleyball/data/avp_matches_2022.csv ./avp_matches_2022.csv
```

### Option 3: Use Sample Data
If you can't get the real data, the training script will automatically create sample data for demonstration purposes.

## File Structure
- `avp_matches_2022.csv` - Raw match data (you need to download this)
- `cleaned_avp.csv` - Processed data (created by clean_data.py)
- `model.pkl` - Trained ML model (created by train_model.py)
- `feature_columns.pkl` - Feature names for the model

## Data Format
The CSV file contains columns like:
- match_date
- team_a_score, team_b_score
- player_a1_kills, player_a2_kills, etc.
- player_b1_kills, player_b2_kills, etc.

## Notes
- The cleaning script will automatically process the raw data
- Sample data will be generated if real data is not available
- This is for educational purposes only 