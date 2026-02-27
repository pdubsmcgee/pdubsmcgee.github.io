# GitHub Pages Reference Notes

> **Note:** I attempted to read `https://docs.github.com/en/pages` directly from this environment, but outbound HTTPS requests are blocked by a proxy (`CONNECT tunnel failed, response 403`).
> The notes below are compiled from established GitHub Pages knowledge and should be validated against the live docs when network access is available.

## What GitHub Pages is

GitHub Pages is GitHub's static-site hosting platform for repositories and organizations. It can publish:

- User/organization sites (for example, `<owner>.github.io`), generally from a special repository named `<owner>.github.io`.
- Project sites, published from a specific repository path and served under a URL path segment.

Pages is intended for static assets (HTML, CSS, JS, images), with optional build pipelines for static site generators.

## Publishing options

GitHub Pages commonly supports two publishing patterns:

1. **Deploy from a branch**
   - Select a branch (often `main`) and folder (`/` or `/docs`) in repository settings.
   - GitHub serves the selected content as the published site.

2. **Deploy with GitHub Actions**
   - Use a workflow to build the site and upload/deploy artifacts.
   - This is the recommended path for many modern frameworks and custom build steps.

## Typical setup flow

1. Create or choose repository.
2. Add static site files (or source files plus build config).
3. Configure Pages source (branch/folder or Actions workflow).
4. Wait for build/deploy completion.
5. Visit provided `github.io` URL.

## Custom domains

GitHub Pages supports custom domains:

- Add domain in repository Pages settings.
- Configure DNS records:
  - `CNAME` for subdomains (e.g. `www.example.com` -> `<owner>.github.io`)
  - `A/AAAA` records for apex domains per GitHub guidance.
- Store a `CNAME` file in the published content when appropriate.
- Enable HTTPS in Pages settings once DNS resolves.

## Jekyll behavior

GitHub Pages has built-in Jekyll support for branch-based publishing:

- Jekyll can process content automatically unless disabled.
- To bypass Jekyll processing for static files, include a `.nojekyll` file.
- Plugin support is limited in managed builds; unsupported plugins generally require custom Actions builds.

## Limits and constraints (high-level)

Common constraints include:

- Static hosting only (no server-side runtimes).
- Build/deploy usage limits and soft quotas.
- Repository visibility and plan-related behavior (public/private nuances may vary over time).
- Content and bandwidth considerations for large sites.

Always verify current limits and policy details in live documentation before making production assumptions.

## Useful Pages topics to review in official docs

When access is available, review these topics under GitHub Docs Pages section:

- Creating a GitHub Pages site.
- Configuring a publishing source.
- Using custom workflows and Actions for Pages deployments.
- Setting up custom domains and HTTPS.
- Troubleshooting build failures and 404/asset path issues.
- Differences between user/org and project pages.

## Practical troubleshooting checklist

If a site does not render as expected:

1. Confirm the configured publishing source matches actual output path.
2. Check Actions logs (if using workflow deployment).
3. Confirm repository/organization settings allow Pages publication.
4. Validate base URL/path settings for project sites.
5. Verify DNS records and TTL for custom domains.
6. Confirm HTTPS certificate provisioning completed.
7. Check for missing `.nojekyll` when files/folders beginning with `_` are required.

## Revalidation TODO

Once network access works, update this file by reading:

- `https://docs.github.com/en/pages`
- The linked Pages setup, custom domain, HTTPS, Actions, and troubleshooting articles.

Then replace approximate statements above with direct, citation-backed specifics.
