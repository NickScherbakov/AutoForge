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

The demo automatically deploys via GitHub Actions when you push to main/master branch.

### Manual Deployment

```bash
# Trigger workflow manually from GitHub Actions tab
# Or push to main branch
git push origin main
```

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
