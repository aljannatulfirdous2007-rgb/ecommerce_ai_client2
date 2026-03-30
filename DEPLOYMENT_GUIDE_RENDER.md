# 🚀 DEPLOY AL FIRDOUS LUXE TO RENDER

## Quick Deploy Steps

### Option 1: One-Click Deploy (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in or create account

2. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - OR upload the `client/dist` folder directly

3. **Configure Build Settings**
   ```
   Name: al-firdous-luxe
   Branch: main
   Build Command: cd client && npm install && npm run build
   Publish Directory: client/dist
   ```

4. **Environment Variables** (if needed)
   ```
   NODE_VERSION=20
   ```

5. **Deploy!**
   - Click "Create Static Site"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at: `https://al-firdous-luxe.onrender.com`

---

### Option 2: Using Render CLI

```bash
# Install Render CLI
npm install -g @render-cloud/render-cli

# Login to Render
render login

# Deploy from render.yaml file
cd c:\fullstackAI
render up
```

---

### Manual Upload (Fastest - No Git Required)

1. **Build is already ready!** ✅
   - Location: `c:\fullstackAI\client\dist`
   
2. **Upload to Render:**
   - Go to https://dashboard.render.com
   - Create new "Static Site"
   - Choose "Deploy from disk" option
   - Upload the entire `dist` folder
   - Click Deploy

---

## Backend Deployment (Optional)

If you want to deploy the backend API:

1. **Create New Web Service on Render**
   - Type: Node.js
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Set Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   NODE_ENV=production
   ```

3. **Update Frontend API URL**
   - Edit `client/src/context/StoreContext.jsx`
   - Change API_BASE_URL to your Render backend URL

---

## Post-Deployment Checklist

✅ Test all pages load correctly
✅ Verify images display properly
✅ Test Add to Cart functionality
✅ Check mobile responsiveness
✅ Verify search works
✅ Test occasion selector
✅ Check dark mode toggle

---

## Custom Domain (Optional)

1. Go to Render Dashboard → Your Site → Settings
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `alfirdousluxe.com`)
4. Update DNS records as instructed
5. Enable SSL certificate (free with Render)

---

## Troubleshooting

**Build Fails:**
- Check Node version is set to 20
- Ensure build command runs locally first
- Review build logs in Render dashboard

**Images Not Loading:**
- All images use absolute URLs or are bundled in dist
- Check asset paths in Vite config

**API Errors:**
- Backend not deployed yet
- Update API_BASE_URL in StoreContext.jsx
- Check CORS settings in server

---

## Live Demo URL

After deployment, your site will be accessible at:
```
https://YOUR-SITE-NAME.onrender.com
```

Share this link for your competition! 🏆

---

## Need Help?

Render Support: https://render.com/docs
Community: https://community.render.com

Good luck with your competition! 💯🔥
