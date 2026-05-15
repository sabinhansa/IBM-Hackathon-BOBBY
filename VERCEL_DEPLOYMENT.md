# BobFlow Vercel Deployment Guide

Complete guide for deploying BobFlow to Vercel with secure live API functionality.

## 🎯 Overview

BobFlow is designed as a **Vercel-first** application that:
- ✅ Serves a Vite React frontend
- ✅ Runs serverless API functions at `/api/*`
- ✅ Securely handles IBM Bob API keys server-side
- ✅ Never exposes secrets to the browser
- ✅ Supports both demo mode and live API mode

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - Your code repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free tier available)
3. **IBM Bob API Key** - Obtain from IBM Bob platform
4. **Git Repository** - Code pushed to GitHub

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `IBM-Hackathon-BOBBY` repository
4. Click **"Import"**

### Step 3: Configure Project Settings

Vercel should auto-detect the framework, but verify:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Root Directory** | `./` |

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add the following:

#### Required Variables

| Name | Value | Description |
|------|-------|-------------|
| `BOB_API_KEY` | `your_actual_bob_api_key_here` | IBM Bob API key (server-side only) |
| `VITE_ENABLE_LIVE_MODE` | `true` | Enables live analysis UI |

#### Optional Variables

| Name | Value | Description |
|------|-------|-------------|
| `BOB_API_ENDPOINT` | `https://api.bob.ibm.com/v1` | Custom Bob API endpoint (if needed) |

**🔒 Security Notes:**
- `BOB_API_KEY` has NO `VITE_` prefix - this keeps it server-side only
- Select all environments: Production, Preview, Development
- Vercel encrypts all environment variables
- Never commit API keys to git

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

## ✅ Verify Deployment

### 1. Check Health Endpoint

```bash
curl https://your-project.vercel.app/api/health
```

**Expected Response:**
```json
{
  "ok": true,
  "status": "healthy",
  "timestamp": "2026-05-15T21:00:00.000Z",
  "config": {
    "apiKeyConfigured": true,
    "apiEndpoint": "https://api.bob.ibm.com/v1",
    "liveModeEnabled": true
  },
  "message": "API is ready for live workflow analysis"
}
```

### 2. Test Live Analysis

1. Visit your deployed URL
2. Navigate to **"Repo Onboarding"** workflow
3. Verify **"Live Analysis"** panel appears
4. Enter a test repository URL (e.g., `https://github.com/vercel/next.js`)
5. Click **"Run Analysis"**
6. Verify the analysis completes (or shows appropriate error if Bob API not fully configured)

### 3. Check All Workflows

Test live mode on all workflow pages:
- ✅ Repo Onboarding
- ✅ Architecture Map
- ✅ Documentation Gap Finder
- ✅ Test Plan Generator
- ✅ Risk Review
- ✅ PR Pack Generator

## 🔧 Vercel CLI Deployment (Alternative)

For developers who prefer command-line deployment:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow interactive prompts)
vercel

# Add environment variables
vercel env add BOB_API_KEY
# Enter your IBM Bob API key when prompted
# Select: Production, Preview, Development

vercel env add VITE_ENABLE_LIVE_MODE
# Enter: true
# Select: Production, Preview, Development

# Deploy to production
vercel --prod
```

## 🏠 Local Development with Vercel

To test the full stack locally with Vercel functions:

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Link to your Vercel project
vercel link

# 3. Pull environment variables from Vercel
vercel env pull

# 4. Start Vercel dev server
vercel dev
```

The app will run at `http://localhost:3000` with:
- ✅ Frontend served by Vite
- ✅ API functions at `/api/*`
- ✅ Environment variables loaded
- ✅ Hot module reloading

## 📁 Project Structure

```
IBM-Hackathon-BOBBY/
├── api/                      # Vercel serverless functions
│   ├── run-workflow.ts      # Main workflow API endpoint
│   └── health.ts            # Health check endpoint
├── src/                      # React frontend
│   ├── pages/               # Workflow pages with live mode
│   ├── components/          # UI components
│   └── utils/api.ts         # API client utilities
├── dist/                     # Build output (auto-generated)
├── vercel.json              # Vercel configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies
```

## 🔐 Security Best Practices

### ✅ DO

- Store `BOB_API_KEY` in Vercel environment variables
- Use `BOB_API_KEY` (no `VITE_` prefix) for secrets
- Keep `.env` in `.gitignore`
- Use HTTPS for all API calls
- Validate all user inputs server-side
- Review Vercel function logs regularly

### ❌ DON'T

- Never use `VITE_BOB_API_KEY` (would expose to browser)
- Never commit `.env` files to git
- Never log API keys in console or errors
- Never expose API keys in error messages
- Never trust client-side validation alone

## 🐛 Troubleshooting

### "API key not configured" Error

**Symptoms:**
- Health endpoint shows `apiKeyConfigured: false`
- Live analysis fails with configuration error

**Solutions:**
1. Verify `BOB_API_KEY` is set in Vercel dashboard
2. Check environment variable name (no `VITE_` prefix)
3. Ensure variable is set for correct environment
4. Redeploy after adding environment variables

```bash
# Check environment variables
vercel env ls

# Add missing variable
vercel env add BOB_API_KEY
```

### Live Mode Not Showing

**Symptoms:**
- No "Live Analysis" panel on workflow pages
- Only demo samples visible

**Solutions:**
1. Verify `VITE_ENABLE_LIVE_MODE=true` in Vercel
2. Clear browser cache and hard reload
3. Check browser console for errors
4. Verify build completed successfully

### API Calls Failing

**Symptoms:**
- "Failed to run workflow" errors
- 503 Service Unavailable responses

**Solutions:**
1. Check `/api/health` endpoint status
2. Verify Bob API endpoint URL is correct
3. Review Vercel function logs in dashboard
4. Ensure API key has correct permissions
5. Check IBM Bob API status

**View Vercel Logs:**
```bash
vercel logs
# Or visit: https://vercel.com/your-project/logs
```

### Build Failures

**Symptoms:**
- Deployment fails during build
- TypeScript errors

**Solutions:**
1. Run `npm run build` locally first
2. Fix any TypeScript errors
3. Ensure all dependencies are in `package.json`
4. Check Node.js version compatibility

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint
```

## 🔄 Updating Deployment

### Update Code

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel auto-deploys on push to main
```

### Update Environment Variables

```bash
# Via CLI
vercel env rm BOB_API_KEY production
vercel env add BOB_API_KEY production

# Or via dashboard:
# https://vercel.com/your-project/settings/environment-variables
```

### Rollback Deployment

```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url>
```

## 📊 Monitoring

### Vercel Dashboard

Monitor your deployment at:
- **Overview**: https://vercel.com/your-project
- **Deployments**: https://vercel.com/your-project/deployments
- **Logs**: https://vercel.com/your-project/logs
- **Analytics**: https://vercel.com/your-project/analytics

### Key Metrics to Watch

- ✅ Build success rate
- ✅ Function execution time
- ✅ Error rates
- ✅ API response times
- ✅ Bandwidth usage

## 🎓 Next Steps

### Complete IBM Bob Integration

The serverless function at `api/run-workflow.ts` includes a TODO placeholder for the actual IBM Bob API call. To complete:

1. Open `api/run-workflow.ts`
2. Find the `callBobAPI` function (line 135)
3. Replace placeholder with actual Bob API calls
4. Test with real repository URLs

**What you need from IBM Bob API docs:**
- Exact endpoint URL format
- Authentication method
- Request/response schemas
- Error handling patterns

### Custom Domain

Add a custom domain in Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records
4. Enable HTTPS (automatic)

### Performance Optimization

- Enable Vercel Edge Network
- Configure caching headers
- Optimize bundle size
- Use Vercel Analytics

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Project Issues**: https://github.com/hansasabin/IBM-Hackathon-BOBBY/issues

## ✨ Success Checklist

Before considering deployment complete:

- [ ] Build succeeds locally (`npm run build`)
- [ ] No secrets in source code or dist bundle
- [ ] Health endpoint returns `apiKeyConfigured: true`
- [ ] Live analysis panel appears on workflow pages
- [ ] Test workflow completes successfully
- [ ] All 6 workflows support live mode
- [ ] Environment variables configured correctly
- [ ] Custom domain configured (optional)
- [ ] Monitoring and alerts set up
- [ ] Documentation updated

---

**Made with ❤️ for the IBM Bob Hackathon 2026**

*Secure, scalable, and presentation-ready deployment*