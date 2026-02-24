# Image Optimization Plan (Aligned to This Repo)

## Goal
Create a repeatable image pipeline for the **frontend app in `client/`** so that:
- Existing gallery photos are optimized in one batch.
- New photos are automatically optimized during frontend build/deploy.
- Gallery serves responsive AVIF/WebP assets with better load performance.

---

## Current Repo Reality (What this plan matches)
- Frontend build lives in `client/package.json` (`vite build`).
- Gallery currently renders from a hardcoded list in `client/src/components/Gallery.jsx`.
- Static images are currently served from `client/public/images/`.
- There is no root `package.json`; build wiring must be done in `client/package.json`.

---

## Success Criteria
- ✅ No empty gallery blocks from missing assets.
- ✅ Optimized responsive variants are generated (AVIF + WebP, optional JPEG).
- ✅ Frontend build runs optimizer automatically.
- ✅ Incremental processing skips unchanged originals.
- ✅ Originals stay untouched.

---

## Repo Layout (Recommended for this codebase)

**Source of truth (unoptimized originals):**
- `client/assets/photos/original/`

**Generated outputs (served by Vite as static assets):**
- `client/public/images/optimized/`

**Generated metadata for React gallery:**
- `client/src/data/gallery-images.json`

**Build script:**
- `client/scripts/optimize-images.mjs`

**Incremental processing cache:**
- `client/photos.manifest.json`

Example:
```
mwarren-construction/
  client/
    assets/
      photos/
        original/
          img_001.jpg
    public/
      images/
        optimized/
          img_001@400w.avif
          img_001@800w.webp
    src/
      data/
        gallery-images.json
    scripts/
      optimize-images.mjs
    photos.manifest.json
```

---

## Decisions to Lock In

### Output Formats
- AVIF (primary)
- WebP (fallback)
- Optional JPEG fallback if needed for compatibility

### Responsive Widths
- `400, 800, 1200, 2000`

### Quality
- AVIF: `55`
- WebP: `80`
- JPEG: `82` (optional)

---

## Implementation Steps

### 1) Add dependencies (frontend only)
From repo root:
```bash
cd client
npm i -D sharp fast-glob
```

### 2) Add optimization script
Create:
- `client/scripts/optimize-images.mjs`

Responsibilities:
1. Discover source images in `client/assets/photos/original/**/*.{jpg,jpeg,png,webp}`.
2. Auto-orient images from EXIF.
3. Generate responsive AVIF/WebP variants to `client/public/images/optimized/`.
4. Avoid upscaling beyond source width.
5. Write/update `client/src/data/gallery-images.json` for the React gallery.
6. Use `client/photos.manifest.json` to skip unchanged inputs.
7. Print summary (`processed/skipped/errors`).

Naming:
- `img_001@800w.avif`
- `img_001@800w.webp`

### 3) Add manifest for incremental builds
Create:
- `client/photos.manifest.json`

Store per-source hash + generated variants.

### 4) Wire into frontend build
Update `client/package.json` scripts:
```json
{
  "scripts": {
    "images:build": "node scripts/optimize-images.mjs",
    "build": "npm run images:build && vite build"
  }
}
```

### 5) Update gallery rendering pattern
Current gallery uses a hardcoded `images` array in `client/src/components/Gallery.jsx`.

Target pattern:
- Import `client/src/data/gallery-images.json`.
- Render `<picture>` per card:
  - `<source type="image/avif" srcSet="...">`
  - `<source type="image/webp" srcSet="...">`
  - `<img src="...jpg" srcSet="..." sizes="...">`
- Keep existing lazy loading and lightbox behavior.

Suggested sizing in gallery grid:
- `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`

### 6) Validate performance
- Confirm AVIF requests in modern browsers.
- Confirm responsive widths selected via DevTools network.
- Compare total image transfer size before/after.
- Check LCP on a gallery-heavy page.

### 7) CI/CD integration
- Ensure Node version is pinned for CI (compatible with `sharp`).
- In frontend build job:
  - `cd client`
  - `npm ci`
  - `npm run build`
- Deploy `client/dist` (Vite output).

---

## Operational Guidelines

### Add photos
1. Drop originals into `client/assets/photos/original/`.
2. Run build/deploy.
3. Optimized variants + metadata regenerate automatically.

### Replace photos
1. Replace original file with same name.
2. Hash changes trigger regeneration.

### Remove photos
1. Delete original.
2. Run optimizer with optional cleanup mode to remove stale outputs.

---

## Edge Cases
- Preserve transparency for PNG inputs.
- Auto-orient from EXIF metadata.
- Never upscale small images.
- Ensure largest width is sufficient for lightbox display.
- Keep fallback image for browsers without AVIF support.

---

## Nice-to-Haves
- Cleanup mode (`--clean`) to remove orphaned generated files.
- CI stale check (`--check`) to fail if outputs are outdated.
- Blur placeholders (`blurDataURL`) in generated metadata.

---

## Deliverables Checklist
- [ ] `client/scripts/optimize-images.mjs` created
- [ ] `client/assets/photos/original/` established
- [ ] `client/public/images/optimized/` generated
- [ ] `client/photos.manifest.json` working
- [ ] `client/package.json` build runs optimizer
- [ ] `client/src/components/Gallery.jsx` uses generated metadata + responsive images
- [ ] Performance verified in browser/network tools
