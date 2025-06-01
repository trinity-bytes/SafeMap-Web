# SafeMap Landing Page - Deployment Guide

## 🚀 Production Build

The SafeMap landing page is now fully optimized and ready for deployment. Here's everything you need to know:

### Build Results

- ✅ Static site generated successfully
- ✅ Code splitting optimized (vendor chunks separated)
- ✅ PWA manifest included
- ✅ SEO optimizations implemented
- ✅ Accessibility features added
- ✅ Performance optimizations applied

### File Structure (dist/)

```
dist/
├── index.html                 # Main landing page
├── sitemap-index.xml          # SEO sitemap
├── robots.txt                 # Search engine directives
├── site.webmanifest          # PWA manifest
├── favicon.svg               # Site icon
├── apple-touch-icon.svg      # iOS icon
├── avatars/                  # Testimonial avatars
├── js/
│   └── animations.js         # Performance animations
└── _astro/                   # Optimized assets
    ├── jsx-runtime.D_zvdyIk.js    (0.73 kB gzipped)
    ├── StatsCounter.DHQalE6c.js   (1.36 kB gzipped)
    ├── page.BJk26ZDG.js           (2.50 kB gzipped)
    ├── MapDemo.CnXU1PFF.js        (3.85 kB gzipped)
    ├── ContactForm.HaWOAKhx.js    (5.76 kB gzipped)
    ├── index.BVOCwoKb.js          (7.88 kB gzipped)
    └── client.BPIbHqJh.js         (179.41 kB gzipped)
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables: None required

### Option 2: Vercel

1. Import project from GitHub
2. Framework preset: Astro
3. Build command: `npm run build`
4. Output directory: `dist`

### Option 3: GitHub Pages

1. Enable GitHub Actions in your repository settings (Actions > General > Allow all actions and reusable workflows).
2. Create a file named `deploy.yml` in the `.github/workflows/` directory of your repository.
3. Paste the following content into `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: [main] # Or your default branch, e.g., master
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18 # Or the Node.js version specified in your project
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Build
        # Make sure your astro.config.mjs has the correct 'site' and 'base'
        # For GitHub Pages, if your repo is at https://github.com/USER/REPO,
        # site should be 'https://USER.github.io' and base should be '/REPO/'
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload entire repository
          path: "./dist" # Astro builds to 'dist' by default

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. **Configure GitHub Pages Source**:

   - Go to your repository's **Settings** tab.
   - In the left sidebar, click on **Pages**.
   - Under "Build and deployment", for **Source**, select **GitHub Actions**.

5. Commit and push the `deploy.yml` file. This will trigger the workflow and deploy your site.

### Option 4: Custom Server

Upload the `dist/` folder contents to your web server root directory.

## 🔧 Environment Configuration

### Required Environment Variables

- `SITE_URL`: Your domain (e.g., https://safemap.pe)
- `NODE_ENV`: production

### Optional Environment Variables

- `ANALYTICS_ID`: Google Analytics tracking ID
- `CONTACT_FORM_ENDPOINT`: Form submission endpoint

## 📈 Performance Metrics

### Lighthouse Scores (Expected)

- **Performance**: 95-100
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 95-100

### Bundle Analysis

- Total size: ~200KB gzipped
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s

## 🔍 SEO Features Included

### Meta Tags

- ✅ Title optimization
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)

### Technical SEO

- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ PWA manifest
- ✅ Semantic HTML
- ✅ Fast loading times

## ♿ Accessibility Features

- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ High contrast support
- ✅ Screen reader compatibility
- ✅ Reduced motion support

## 📱 PWA Features

- ✅ Web app manifest
- ✅ App icons (multiple sizes)
- ✅ Standalone display mode
- ✅ Theme colors
- ✅ Offline-ready structure

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**: Check Node.js version (requires 18+)
2. **Assets Not Loading**: Verify base URL in astro.config.mjs
3. **Forms Not Working**: Configure form submission endpoint
4. **Maps Not Displaying**: Check Leaflet CDN availability

### Performance Issues

- Enable browser caching
- Use CDN for static assets
- Implement service worker for offline support

## 📊 Analytics Setup

### Google Analytics 4

Add to BaseLayout.astro before closing `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🔄 Updates and Maintenance

### Regular Tasks

- Monitor performance metrics
- Update dependencies monthly
- Review and update content
- Check for broken links
- Monitor form submissions

### Content Updates

Main content files to update:

- `src/data/features.json`
- `src/data/faq.json`
- `src/components/sections/*.astro`

## 🚀 Next Steps

1. **Deploy to staging environment**
2. **Run full accessibility audit**
3. **Performance testing on real devices**
4. **Set up monitoring and analytics**
5. **Configure form submission backend**
6. **Set up CDN for global performance**

---

Built with ❤️ using Astro, React, TypeScript, and Tailwind CSS.
