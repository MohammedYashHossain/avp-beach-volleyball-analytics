# Railway Backend Deployment Guide

This guide will help you deploy your Flask backend to Railway so your frontend can connect to it.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Backend Code**: Ensure your backend folder contains all necessary files

## Step 1: Prepare Your Backend

Your backend is already configured for Railway deployment with these files:

- `backend/railway.toml` - Railway configuration
- `backend/start.sh` - Startup script
- `backend/requirements.txt` - Python dependencies
- `backend/api.py` - Flask application
- `backend/train_model.py` - ML model training
- `backend/data/volleyball_data.csv` - Sample dataset

## Step 2: Deploy to Railway

### Option A: Deploy via Railway Dashboard

1. **Login to Railway**: Go to [railway.app](https://railway.app) and sign in
2. **Create New Project**: Click "New Project"
3. **Deploy from GitHub**: Select "Deploy from GitHub repo"
4. **Select Repository**: Choose your beach volleyball analytics repository
5. **Configure Deployment**:
   - **Root Directory**: Set to `backend` (since your Flask app is in the backend folder)
   - **Build Command**: Leave empty (Railway will auto-detect)
   - **Start Command**: Leave empty (uses `start.sh`)

### Option B: Deploy via Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize Project**:
   ```bash
   cd backend
   railway init
   ```

4. **Deploy**:
   ```bash
   railway up
   ```

## Step 3: Get Your Railway URL

After deployment, Railway will provide you with a URL like:
```
https://your-app-name-production-xxxx.up.railway.app
```

## Step 4: Update Frontend Configuration

1. **Update Config File**: Edit `frontend/src/config.js`
2. **Replace Backend URL**: Update the `BACKEND_URL` with your Railway URL:

```javascript
export const BACKEND_URL = 'https://your-app-name-production-xxxx.up.railway.app';
```

## Step 5: Test Your Deployment

1. **Health Check**: Visit `https://your-railway-url/health`
   - Should return: `{"status": "healthy", "message": "AVP Beach Volleyball Analytics API is running"}`

2. **API Info**: Visit `https://your-railway-url/`
   - Should return API information and available endpoints

3. **Test Predictions**: Visit `https://your-railway-url/sample-prediction`
   - Should return a sample prediction

## Step 6: Deploy Updated Frontend

After updating the backend URL in your config:

1. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Update backend URL for Railway deployment"
   git push
   ```

2. **Vercel Auto-Deploy**: Your frontend will automatically redeploy on Vercel

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are in `requirements.txt`
   - Ensure `start.sh` has execute permissions
   - Verify Python version compatibility

2. **Model Training Issues**:
   - The `start.sh` script automatically trains the model if it doesn't exist
   - Check Railway logs for training errors

3. **CORS Issues**:
   - CORS is already configured in `api.py`
   - If you still have issues, check the CORS configuration

4. **Port Issues**:
   - Railway automatically sets the `PORT` environment variable
   - The `start.sh` script uses this port

### Checking Logs

1. **Railway Dashboard**: Go to your project → Deployments → View logs
2. **CLI**: Run `railway logs` to see real-time logs

### Environment Variables

Railway automatically provides:
- `PORT`: The port your app should listen on
- `RAILWAY_STATIC_URL`: Static file serving URL

## API Endpoints

Your deployed backend will have these endpoints:

- `GET /` - API information
- `GET /health` - Health check
- `GET /stats` - Basic match statistics
- `GET /dashboard` - Dashboard data for charts
- `POST /predict` - Predict match winner
- `GET /sample-prediction` - Get sample prediction

## Monitoring

1. **Railway Dashboard**: Monitor your app's performance and logs
2. **Health Checks**: Railway will automatically check `/health` endpoint
3. **Auto-restart**: Railway will restart your app if it crashes

## Cost Considerations

- Railway offers a free tier with limited usage
- Monitor your usage in the Railway dashboard
- Consider upgrading if you exceed free tier limits

## Security Notes

- Your API is public by default
- Consider adding authentication if needed
- Monitor for abuse and implement rate limiting if necessary

## Next Steps

Once deployed:
1. Test all frontend features with the new backend
2. Monitor performance and logs
3. Consider adding more advanced features
4. Set up monitoring and alerts

## Support

If you encounter issues:
1. Check Railway documentation: [docs.railway.app](https://docs.railway.app)
2. Review your application logs
3. Verify all configuration files are correct
4. Test locally first before deploying 