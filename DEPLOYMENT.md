# Deployment Guide

This guide will help you deploy your AVP Beach Volleyball Analytics Platform to production.

## Option 1: Frontend on Vercel + Backend on Railway (Recommended)

### Step 1: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set the root directory to `backend`
   - Railway will automatically detect it's a Python app

3. **Configure Environment**
   - Railway will install dependencies from `requirements.txt`
   - The app will start automatically using the `Procfile`

4. **Get Your Backend URL**
   - Once deployed, Railway will give you a URL like: `https://your-app-name.railway.app`
   - Copy this URL

### Step 2: Update Frontend Configuration

1. **Update API URL**
   - Edit `frontend/src/config.js`
   - Replace `https://your-backend-url.railway.app` with your actual Railway URL

2. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

### Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Deploy Frontend**
   - Click "New Project"
   - Import your GitHub repository
   - Set the root directory to `frontend`
   - Vercel will automatically detect it's a React app

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

### Step 4: Test Your Deployment

1. **Test Backend**
   - Visit your Railway URL + `/health`
   - Should return: `{"status": "healthy", "model_loaded": true, "data_loaded": true}`

2. **Test Frontend**
   - Visit your Vercel URL
   - Should connect to your backend and show the dashboard

## Option 2: Full-stack on Vercel (Alternative)

### Limitations:
- Vercel has a 50MB function size limit
- ML models might be too large
- Cold start times for ML inference

### Setup:
1. Create `vercel.json` in the root directory
2. Configure serverless functions
3. Deploy both frontend and backend to Vercel

## Troubleshooting

### Backend Issues:
- **Model not loading**: Make sure `train_model.py` runs successfully
- **CORS errors**: Backend should handle CORS automatically
- **Port issues**: Railway handles port configuration automatically

### Frontend Issues:
- **API connection failed**: Check the API URL in `config.js`
- **Build errors**: Check for missing dependencies
- **CORS errors**: Backend should allow all origins

### Environment Variables:
- **Backend**: Railway automatically sets `PORT`
- **Frontend**: Update `config.js` with correct API URL

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