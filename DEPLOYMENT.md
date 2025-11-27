# Deployment Guide

This project is ready for deployment on various hosting platforms. Follow the steps below for your chosen platform.

## Pre-Deployment Checklist

✅ **All done!** The project is configured for:
- ✅ Environment variable support (PORT, NODE_ENV)
- ✅ CORS configuration for production
- ✅ Health check endpoint (`/health`)
- ✅ Socket.io configured for production
- ✅ Static file serving
- ✅ No hardcoded URLs (works on any domain)

## Quick Deploy

### Railway (Easiest - Recommended)

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects everything from `railway.json`
5. Done! Your app is live

**No configuration needed** - Railway handles everything automatically.

### Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Settings (auto-filled from `render.yaml`):
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** Leave empty (or set to `backend`)
5. Click "Create Web Service"
6. Wait for deployment (2-3 minutes)

### Heroku

1. Install Heroku CLI: `npm install -g heroku-cli`
2. Login: `heroku login`
3. Navigate to backend folder: `cd backend`
4. Initialize git (if not already): `git init`
5. Create Heroku app: `heroku create your-app-name`
6. Deploy: `git push heroku main`

The `Procfile` is already configured!

### Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to backend: `cd backend`
3. Deploy: `vercel`
4. Follow prompts

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repo
3. Build settings:
   - **Base directory:** `backend`
   - **Build command:** `npm install`
   - **Publish directory:** `backend/public`
   - **Functions directory:** (leave empty)
4. Add environment variable: `NODE_ENV=production`
5. Deploy!

**Note:** Netlify works best with serverless functions. For Socket.io, consider Railway, Render, or Heroku.

## Post-Deployment

After deployment, your app will be available at:
- Railway: `https://your-app-name.up.railway.app`
- Render: `https://your-app-name.onrender.com`
- Heroku: `https://your-app-name.herokuapp.com`

### Testing

1. Visit your deployed URL
2. Click "Create New Game"
3. Share the Room ID with a friend
4. Test the multiplayer functionality

### Troubleshooting

**Socket.io not connecting?**
- Check that your hosting platform supports WebSockets
- Verify CORS settings if using a custom domain
- Check browser console for errors

**Port errors?**
- Most platforms set PORT automatically
- If needed, set `PORT` environment variable in your platform's settings

**Static files not loading?**
- Ensure `backend/public` folder is included in deployment
- Check that the build process includes all files

## Environment Variables

Set these in your hosting platform's dashboard (if needed):

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port (auto-set by most platforms) |
| `NODE_ENV` | `development` | Set to `production` for production |
| `CORS_ORIGIN` | `*` | CORS origin (use `*` or your domain) |

## Custom Domain

To use a custom domain:

1. Add your domain in your hosting platform's settings
2. Update DNS records as instructed
3. Set `CORS_ORIGIN` environment variable to your domain (optional)
4. Wait for DNS propagation (can take up to 48 hours)

## Support

If you encounter issues:
1. Check the hosting platform's logs
2. Verify all files are committed to git
3. Ensure Node.js version is 18+ (check `package.json` engines)
4. Test locally first: `cd backend && npm start`

