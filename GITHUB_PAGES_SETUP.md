# GitHub Pages Setup Guide

## Quick Setup (First Time)

If you're seeing a **404 Not Found** error when deploying to GitHub Pages, follow these steps:

### 1. Enable GitHub Pages ⚙️

**This is the most important step!**

1. Navigate to: **[Repository Settings → Pages](https://github.com/NickScherbakov/AutoForge/settings/pages)**
2. Under **"Build and deployment"**:
   - Set **Source** to: **"GitHub Actions"** ← This is critical!
   - Do NOT select a branch (gh-pages, main, etc.)
3. Click **Save**

### 2. Run or Re-run the Workflow 🔄

After enabling Pages:

**Option A: Automatic deployment**
```bash
git push origin main
```

**Option B: Manual trigger**
1. Go to: [Actions tab](https://github.com/NickScherbakov/AutoForge/actions)
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select branch and click "Run workflow"

### 3. Verify Deployment ✅

1. Wait for the workflow to complete (usually 2-5 minutes)
2. Visit: **https://nickscherbakov.github.io/AutoForge/**
3. Your site should be live!

---

## Common Issues & Solutions

### ❌ Error: "Failed to create deployment (status: 404)"

**Problem**: GitHub Pages is not enabled or source is not set to "GitHub Actions"

**Solution**:
1. Go to [Settings → Pages](https://github.com/NickScherbakov/AutoForge/settings/pages)
2. Ensure **Source** is set to **"GitHub Actions"** (not a branch)
3. Save and re-run the workflow

### ❌ Error: "Resource not accessible by integration"

**Problem**: Workflow lacks necessary permissions

**Solution**:
The workflow already includes the correct permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```
If this error persists, check repository settings → Actions → General → Workflow permissions

### ❌ Site loads but pages return 404

**Problem**: Jekyll processing interfering with Next.js routes

**Solution**:
A `.nojekyll` file is already included in `frontend/public/` and automatically copied during build. Verify it exists in the deployed site.

### ❌ Assets/CSS not loading

**Problem**: Base path misconfiguration

**Solution**:
The workflow sets `NEXT_PUBLIC_BASE_PATH=/AutoForge` which should match your repository name. If you forked this repo with a different name, update this in `.github/workflows/deploy-pages.yml`:
```yaml
env:
  NEXT_PUBLIC_BASE_PATH: '/YourRepoName'
```

---

## Workflow Configuration

The deployment workflow is located at: `.github/workflows/deploy-pages.yml`

**Key configuration:**
- **Trigger**: Pushes to `main` or `master` branches
- **Build**: Compiles Next.js with demo mode enabled
- **Deploy**: Uses official GitHub Pages actions
- **Output**: Static files from `frontend/out`

**Environment variables:**
- `NEXT_PUBLIC_DEMO_MODE=true` - Enables demo mode with mock data
- `NEXT_PUBLIC_BASE_PATH=/AutoForge` - Sets base path for routing

---

## Repository Structure

```
AutoForge/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml       # GitHub Pages deployment workflow
├── frontend/
│   ├── public/
│   │   └── .nojekyll              # Prevents Jekyll processing
│   ├── next.config.js             # Next.js configuration
│   └── out/                       # Build output (generated)
└── GITHUB_PAGES.md                # Detailed documentation
```

---

## Verification Checklist

Before deployment, ensure:

- [ ] GitHub Pages is enabled in repository settings
- [ ] Source is set to "GitHub Actions" (not a branch)
- [ ] Workflow file exists at `.github/workflows/deploy-pages.yml`
- [ ] `.nojekyll` file exists in `frontend/public/`
- [ ] `next.config.js` has `output: 'export'` configured
- [ ] Workflow permissions include `pages: write` and `id-token: write`

After deployment, verify:

- [ ] Workflow completes successfully
- [ ] Site is accessible at `https://<username>.github.io/<repo-name>/`
- [ ] All pages load correctly
- [ ] CSS and assets load properly
- [ ] Navigation works between pages

---

## Need Help?

1. **Check workflow logs**: [Actions tab](https://github.com/NickScherbakov/AutoForge/actions)
2. **Review this guide**: Make sure all steps are completed
3. **Check GitHub Status**: [https://www.githubstatus.com/](https://www.githubstatus.com/)
4. **Read full documentation**: [GITHUB_PAGES.md](./GITHUB_PAGES.md)

---

## Related Documentation

- [GITHUB_PAGES.md](./GITHUB_PAGES.md) - Full GitHub Pages documentation
- [README.md](./README.md) - Main project documentation
- [Official GitHub Pages Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
