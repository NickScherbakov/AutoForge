# AutoForge - GitHub Pages Demo

This directory contains the GitHub Pages demo configuration for AutoForge.

## 🌐 Live Demo

Visit the live demo at: **https://nickscherbakov.github.io/AutoForge/**

## ✨ Features

The GitHub Pages demo includes:
- 📱 Fully functional UI with simulated backend
- 🎭 Interactive demo mode with sample workflows
- 💼 Dashboard with mock data
- ⚡ Instant workflow execution (simulated)
- 📊 Execution history and transaction logs
- 🎨 Complete AutoForge experience without backend infrastructure

## 🚀 How It Works

The demo uses:
- **Static Export**: Next.js static site generation
- **Mock Data**: Pre-configured sample workflows and executions
- **Client-Side Only**: No backend API calls required
- **Demo Mode Flag**: `NEXT_PUBLIC_DEMO_MODE=true`

## 🛠️ Local Testing

To test the GitHub Pages build locally:

```bash
cd frontend

# Install dependencies
npm install

# Build for GitHub Pages
NEXT_PUBLIC_DEMO_MODE=true NEXT_PUBLIC_BASE_PATH=/AutoForge npm run build

# Serve the static build (install serve if needed: npm i -g serve)
npx serve out
```

Then visit http://localhost:3000

## 📦 Deployment

### Initial Setup - Enable GitHub Pages

**⚠️ IMPORTANT**: Before the workflow can deploy, you must enable GitHub Pages in your repository settings.

#### Step 1: Enable GitHub Pages

1. Go to your repository settings: [GitHub Pages Settings](https://github.com/NickScherbakov/AutoForge/settings/pages)
2. Under "Build and deployment" section:
   - **Source**: Select **"GitHub Actions"** (not a branch)
   - This is required for the workflow to work properly
3. Save the changes

#### Step 2: Verify Workflow Permissions

Ensure your workflow has the necessary permissions (already configured in `.github/workflows/deploy-pages.yml`):
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

#### Step 3: Deploy

The demo automatically deploys via GitHub Actions when you push to main/master branch.

**Manual Deployment:**
```bash
# Trigger workflow manually from GitHub Actions tab
# Or push to main branch
git push origin main
```

### Troubleshooting 404 Errors

If you encounter a "404 Not Found" error during deployment:

1. **Error**: `Failed to create deployment (status: 404)`
   - **Cause**: GitHub Pages is not enabled in repository settings
   - **Solution**: Follow Step 1 above to enable GitHub Pages with source set to "GitHub Actions"

2. **Error**: Workflow fails with permission error
   - **Cause**: Workflow doesn't have necessary permissions
   - **Solution**: Verify the `permissions` section in the workflow file includes `pages: write` and `id-token: write`

3. **Error**: Site is not accessible after deployment
   - **Cause**: Base path misconfiguration
   - **Solution**: Ensure `NEXT_PUBLIC_BASE_PATH=/AutoForge` matches your repository name

4. **Error**: 404 on page navigation
   - **Cause**: Jekyll processing (GitHub's default) interfering with Next.js files
   - **Solution**: The `.nojekyll` file should already be present in `frontend/public/` and will be copied to the output

### Deployment Status

After enabling GitHub Pages and running the workflow:
- ✅ The workflow will build the Next.js app
- ✅ Upload the static files as an artifact
- ✅ Deploy to GitHub Pages
- ✅ Your site will be live at: https://nickscherbakov.github.io/AutoForge/

## 🔧 Configuration

The demo is configured in:
- `next.config.js` - Static export settings
- `.github/workflows/deploy-pages.yml` - GitHub Actions workflow
- `src/lib/demo-data.ts` - Mock data
- `src/lib/api.ts` - Demo mode API interceptor

## 📝 Environment Variables

For GitHub Pages deployment:
- `NEXT_PUBLIC_DEMO_MODE=true` - Enables demo mode
- `NEXT_PUBLIC_BASE_PATH=/AutoForge` - Sets base path for GitHub Pages

## 🎯 Demo vs Production

| Feature | Demo (GitHub Pages) | Production |
|---------|---------------------|------------|
| Backend | Mocked | FastAPI + PostgreSQL |
| Data | Static/Simulated | Real database |
| Authentication | Any credentials | Real JWT auth |
| Payments | Simulated | Stripe integration |
| Execution | Instant (fake) | Celery background jobs |
| Purpose | Showcase/Preview | Actual automation |

## 🔗 Full Version

For the complete AutoForge with backend:
- Clone the repository
- Follow instructions in main [README.md](../README.md)
- Use `docker-compose up` for full stack

## 📄 License

MIT - Same as main project
