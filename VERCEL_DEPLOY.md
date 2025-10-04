# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kumasachin/quokka-react-template&project-name=quokka-react-template&framework=vite&root-directory=apps/frontend)

## Manual Deployment Steps

### 1. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository: `kumasachin/quokka-react-template`

### 2. Configure Project Settings

- **Framework Preset**: Vite
- **Root Directory**: `apps/frontend`
- **Build Command**: `cd ../.. && pnpm turbo build --filter=frontend`
- **Output Directory**: `apps/frontend/dist`
- **Install Command**: `pnpm install`

### 3. Environment Variables

Add these environment variables in your Vercel project settings:

```bash
VITE_ENABLE_MOCKING=false
VITE_API_BASE_URL=https://your-backend-api.vercel.app
```

### 4. Deploy

Click "Deploy" and Vercel will build and deploy your frontend application.

## Local Production Build Test

Before deploying, test the production build locally:

```bash
# Install dependencies
pnpm install

# Build the frontend
pnpm turbo build --filter=frontend

# Preview the production build
cd apps/frontend
pnpm preview
```

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Ensure the backend API URL is accessible from Vercel's build environment
- Verify that all dependencies are properly listed in `package.json`

### Runtime Issues

- Check browser console for errors
- Verify API endpoints are working
- Check Vercel Function logs for backend issues

## Backend Deployment

If you need to deploy the backend, consider:

- Deploy backend as Vercel Functions
- Use a separate service like Railway, Render, or Heroku
- Update the `VITE_API_BASE_URL` environment variable accordingly
