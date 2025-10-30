# GitHub Actions Workflows

## Deploy to GitHub Pages

**File**: `deploy-pages.yml`

This workflow automatically deploys the AutoForge demo to GitHub Pages.

### Prerequisites

⚠️ **IMPORTANT**: GitHub Pages must be enabled in repository settings before this workflow can deploy successfully.

**To enable GitHub Pages:**
1. Go to: [Settings → Pages](https://github.com/NickScherbakov/AutoForge/settings/pages)
2. Set **Source** to **"GitHub Actions"**
3. Save

See [GITHUB_PAGES_SETUP.md](../../GITHUB_PAGES_SETUP.md) for detailed setup instructions.

### How It Works

**Triggers:**
- Push to `main` or `master` branch
- Manual workflow dispatch

**Jobs:**
1. **Build**: 
   - Installs Node.js dependencies
   - Builds Next.js static export with demo mode
   - Uploads build artifact

2. **Deploy**:
   - Deploys artifact to GitHub Pages
   - Makes site available at: `https://nickscherbakov.github.io/AutoForge/`

### Configuration

**Environment Variables:**
- `NEXT_PUBLIC_DEMO_MODE=true` - Enables demo mode with mock backend
- `NEXT_PUBLIC_BASE_PATH=/AutoForge` - Sets base path for GitHub Pages

**Permissions Required:**
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Required for Pages deployment

### Troubleshooting

**404 Error During Deployment:**
- **Cause**: GitHub Pages not enabled
- **Solution**: Follow setup instructions in [GITHUB_PAGES_SETUP.md](../../GITHUB_PAGES_SETUP.md)

**Build Failures:**
- Check the Actions tab for detailed logs
- Verify all dependencies are correctly specified
- Test build locally: `cd frontend && npm ci && npm run build`

**Deployment Succeeds but Site Not Accessible:**
- Wait 1-2 minutes for DNS propagation
- Clear browser cache
- Verify Pages is enabled and source is "GitHub Actions"

### Local Testing

To test the build locally before deploying:

```bash
cd frontend
npm ci
NEXT_PUBLIC_DEMO_MODE=true NEXT_PUBLIC_BASE_PATH=/AutoForge npm run build
npx serve out
```

Visit `http://localhost:3000` to preview the site.

### More Information

- [Full GitHub Pages Documentation](../../GITHUB_PAGES.md)
- [Quick Setup Guide](../../GITHUB_PAGES_SETUP.md)
- [GitHub Pages Official Docs](https://docs.github.com/en/pages)
