# Foremost Machine, Inc. Marketing + Access Request Site

Astro + Tailwind static site for Foremost Machine, Inc.

## Features

- Public marketing pages (`/`, `/capabilities`, `/industries`, `/about`, `/contact`, `/request-access`)
- Commercial-only positioning statement
- Netlify-form-compatible markup currently used in Request Access and RFQ forms
- Private portal pages (`/portal`, `/portal/rfq`, `/portal/docs`) hidden from nav and guarded by shared password login (`/portal-login`)
- SEO basics: metadata, Open Graph image, sitemap integration, favicon, robots rules

## Tech Stack

- Astro (static output)
- Tailwind CSS
- GitHub Pages deployment via GitHub Actions

## 1) Install dependencies

```bash
npm install
```

## 2) Run locally

```bash
PUBLIC_PORTAL_PASSWORD=your-temp-password npm run dev
```

Open `http://localhost:4321`.

## 3) Deploy to GitHub Pages

This repository is configured to deploy on push to `main` using `.github/workflows/deploy.yml`.

### Required one-time GitHub setup

1. Push this repository to GitHub.
2. In **Repo Settings → Pages**, set **Source** to **GitHub Actions**.
3. In **Repo Settings → Secrets and variables → Actions**, add:
   - `PUBLIC_PORTAL_PASSWORD` = shared password for `/portal-login`.
4. Ensure your default deployment branch is `main` (or adjust workflow trigger).

### Custom domain setup in GitHub

A `public/CNAME` file is included with:

```txt
foremostmachineinc.com
```

After your first successful deployment:

1. Go to **Repo Settings → Pages**.
2. Confirm **Custom domain** is `foremostmachineinc.com`.
3. Enable **Enforce HTTPS** once DNS is fully propagated.

## 4) Point GoDaddy DNS to GitHub Pages

In GoDaddy DNS for `foremostmachineinc.com`, set these records:

- `A` record for host `@` to `185.199.108.153`
- `A` record for host `@` to `185.199.109.153`
- `A` record for host `@` to `185.199.110.153`
- `A` record for host `@` to `185.199.111.153`
- `CNAME` record for host `www` to `<your-github-username>.github.io`

Notes:
- Remove conflicting `A`, `AAAA`, or `CNAME` records on `@`/`www`.
- DNS propagation can take from a few minutes up to 24–48 hours.

## 5) Verify deployment

1. Push a commit to `main`.
2. Confirm the **Deploy Astro site to GitHub Pages** action succeeds.
3. Visit both:
   - `https://foremostmachineinc.com`
   - `https://www.foremostmachineinc.com`
4. If `www` should redirect to apex, configure forwarding in GoDaddy or canonical handling in GitHub/domain settings.

## Important form-handling note

GitHub Pages is static hosting and does **not** process Netlify Forms submissions.

Current forms still render, but submissions will not be captured unless you add a new backend/form provider (for example Formspree, Getform, or a custom serverless endpoint).
