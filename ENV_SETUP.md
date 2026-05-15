# Environment Variables Setup

This document explains the required environment variables for BobFlow.

## Quick Setup

1. Copy the template below to a new `.env` file in the project root
2. Fill in your actual IBM Bob API key
3. Never commit the `.env` file to version control

## Environment Variables Template

```bash
# ============================================
# IBM Bob API Configuration (Server-side only)
# ============================================

# IBM Bob API Key - Required for live workflow analysis
# Get your API key from: https://ibm.com/bob (or appropriate URL)
# This key is ONLY used server-side and never exposed to the browser
BOB_API_KEY=your_bob_api_key_here

# IBM Bob API Endpoint (optional, defaults to official endpoint)
# BOB_API_ENDPOINT=https://api.bob.ibm.com/v1

# ============================================
# Application Configuration
# ============================================

# Enable live API mode (set to 'true' to enable, 'false' for demo-only)
# When false, only sample reports are shown
VITE_ENABLE_LIVE_MODE=false

# API base URL for frontend (automatically set by Vercel/deployment)
# For local development, this defaults to http://localhost:3000
# VITE_API_BASE_URL=http://localhost:3000
```

## Security Notes

### CRITICAL Security Requirements

- ✅ `BOB_API_KEY` is server-side only (no `VITE_` prefix)
- ✅ Never expose API keys in frontend code
- ✅ Use `VITE_` prefix only for non-sensitive config
- ✅ Review all environment variables before deployment
- ✅ The `.env` file is already in `.gitignore`

### For GitHub Pages Deployment

- Set `BOB_API_KEY` in Vercel/deployment platform secrets
- GitHub Pages alone cannot securely call APIs with keys
- Use Vercel or similar platform for API proxy

## Variable Explanations

### `BOB_API_KEY` (Required for live mode)
Your IBM Bob API key. This is used server-side only to authenticate with the Bob API.

**Security**: Never prefix with `VITE_` as that would expose it to the browser.

### `BOB_API_ENDPOINT` (Optional)
The IBM Bob API endpoint URL. Defaults to the official endpoint if not specified.

### `VITE_ENABLE_LIVE_MODE` (Optional)
Controls whether the live analysis features are shown in the UI.
- `true`: Show live analysis input forms
- `false`: Demo mode only with sample reports

### `VITE_API_BASE_URL` (Optional)
The base URL for API calls. Automatically detected in most deployment scenarios.

## Local Development Setup

1. Create `.env` file:
   ```bash
   cp ENV_SETUP.md .env
   # Edit .env and add your actual BOB_API_KEY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Production Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `BOB_API_KEY`: Your IBM Bob API key
   - `VITE_ENABLE_LIVE_MODE`: `true`
3. Deploy

### Other Platforms

Ensure your deployment platform supports:
- Serverless functions or API routes
- Secure environment variable storage
- HTTPS endpoints

## Troubleshooting

### "API key not configured" error
- Verify `BOB_API_KEY` is set in your environment
- Check that you're not using `VITE_BOB_API_KEY` (wrong prefix)
- Restart your development server after adding environment variables

### Live mode not showing
- Check `VITE_ENABLE_LIVE_MODE` is set to `true`
- Clear browser cache and reload

### API calls failing
- Verify `BOB_API_ENDPOINT` is correct (if set)
- Check API key is valid
- Review server logs for detailed error messages