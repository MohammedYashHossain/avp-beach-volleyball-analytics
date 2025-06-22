# Deployment Guide

This guide covers deploying both the frontend and backend components of the Beach Volleyball Analytics Platform.

## Backend Deployment (Railway)

### Prerequisites
- Railway account
- Git repository with the project

### Deployment Steps

1. **Connect to Railway**
   - Go to [Railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configure Repository Settings**
   - Select your repository
   - **IMPORTANT**: Set the root directory to `backend`
   - Railway will automatically detect it's a Python project

3. **Environment Variables**
   - Add these environment variables in Railway dashboard:
   ```
   PORT=8000
   ```

4. **Deploy**
   - Railway will automatically build and deploy using the configuration files:
     - `nixpacks.toml` - Build configuration
     - `Procfile` - Process definition
     - `requirements.txt` - Python dependencies

### Troubleshooting Nixpacks Build Issues

If you encounter "Nixpacks were unable to generate a build" errors:

1. **Check Root Directory**
   - Ensure the root directory is set to `backend` in Railway settings
   - This is crucial for finding the correct configuration files

2. **Verify Configuration Files**
   - `nixpacks.toml` - Explicit build configuration
   - `Procfile` - Process definition
   - `requirements.txt` - Python dependencies
   - `runtime.txt` - Python version

3. **Common Solutions**
   - **Redeploy**: Sometimes a simple redeploy fixes build issues
   - **Clear Cache**: In Railway dashboard, try "Clear Build Cache"
   - **Check Logs**: Review build logs for specific error messages

4. **Alternative Deployment**
   If Nixpacks continues to fail, you can:
   - Use Railway's "Deploy from Dockerfile" option
   - Create a simple Dockerfile in the backend directory

### Backend URL
After successful deployment, Railway will provide a URL like:
```
https://your-app-name.railway.app
```

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- Node.js installed locally (for testing)

### Deployment Steps

1. **Connect to Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"

2. **Configure Repository**
   - Import your GitHub repository
   - Set the root directory to `frontend`
   - Vercel will auto-detect it's a React project

3. **Environment Variables**
   - Add the backend URL as an environment variable:
   ```
   REACT_APP_API_URL=https://your-railway-app.railway.app
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - The app will be available at the provided Vercel URL

### Frontend URL
After deployment, Vercel will provide a URL like:
```
https://your-app-name.vercel.app
```

## Testing the Deployment

1. **Test Backend API**
   ```bash
   curl https://your-railway-app.railway.app/health
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Try making a prediction using the form
   - Check that it connects to the backend API

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
python train_model.py
python api.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the backend has CORS configured properly
   - Check that the frontend API URL is correct

2. **Model Not Found**
   - Verify that `train_model.py` ran successfully
   - Check that `model.pkl` exists in the backend directory

3. **Build Failures**
   - Check Railway logs for specific error messages
   - Verify all required files are in the correct directories

### Getting Help

If you continue to have issues:
1. Check the Railway build logs for specific error messages
2. Verify all configuration files are present and correct
3. Try deploying with a simpler configuration first

## Railway Monorepo Configuration

### If you get "monorepo without correct root directory" error:

1. **In Railway Project Settings:**
   - Go to your Railway project
   - Click "Settings"
   - Find "Root Directory" or "Source Directory"
   - Set it to: `backend`

2. **Alternative - Use Railway Configuration:**
   - The `railway.json` file in the root should help
   - Or use the `backend/railway.toml` file

3. **Manual Configuration:**
   - In Railway deployment settings
   - Set "Root Directory" to `backend`
   - Set "Start Command" to `bash start.sh`

## Option 2: Full-stack on Vercel (Alternative)

### Limitations:
- Vercel has a 50MB function size limit
- ML models might be too large
- Cold start times for ML inference

### Setup:
1. Create `vercel.json` in the root directory
2. Configure serverless functions
3. Deploy both frontend and backend to Vercel

## URLs to Update

After deployment, update these URLs:

1. **README.md**: Add live demo links
2. **Portfolio**: Add project links
3. **GitHub**: Update repository description

## Cost Considerations

- **Railway**: Free tier available, then pay-as-you-go
- **Vercel**: Free tier available, generous limits
- **Total cost**: Usually $0-10/month for small projects

## Monitoring

- **Railway**: Built-in logs and monitoring
- **Vercel**: Built-in analytics and performance monitoring
- **Health checks**: Use `/health` endpoint to monitor backend

## Next Steps

1. Set up custom domains (optional)
2. Configure environment variables
3. Set up monitoring and alerts
4. Add CI/CD pipeline
5. Implement caching strategies 