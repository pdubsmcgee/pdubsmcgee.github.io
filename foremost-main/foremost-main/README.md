# Foremost Machine, Inc. Marketing + Access Site

Astro + Tailwind static site for Foremost Machine, Inc.

## Features

- Public marketing pages (`/`, `/capabilities`, `/industries`, `/about`, `/contact`, `/request-access`)
- Commercial-only positioning statement
- Secure portal handoff page (`/portal-login`) to external authenticated portal
- Fallback RFQ form and request form compatible with third-party form providers
- SEO basics: metadata, Open Graph image, sitemap integration, favicon, robots rules

## Tech Stack

- Astro (static output)
- Tailwind CSS

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment variables

Create a `.env` file for local development:

```bash
PUBLIC_SECURE_PORTAL_URL=https://secure.example.com/login
PUBLIC_REQUEST_ACCESS_FORM_ENDPOINT=https://formspree.io/f/your-request-access-id
PUBLIC_RFQ_FORM_ENDPOINT=https://formspree.io/f/your-rfq-id
```

## 3) Run locally

```bash
npm run dev
```

Open `http://localhost:4321`.

## 4) Validate before deploy

```bash
npm run check
npm run build
```

## 5) Deploy to GitHub Pages

This repository is configured to deploy on push to `main` using `.github/workflows/deploy.yml`.

## Important form-handling note

Forms submit to third-party endpoints configured by:

- `PUBLIC_REQUEST_ACCESS_FORM_ENDPOINT`
- `PUBLIC_RFQ_FORM_ENDPOINT`

If these are unset, forms still render but won’t submit successfully.
