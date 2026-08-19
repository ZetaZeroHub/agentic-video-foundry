# Agentic Video Foundry website

This directory contains the dependency-free, bilingual public landing page for Agentic Video Foundry.

- `/` is the default English page.
- `/zh/` is the Simplified Chinese page.
- Both pages have self-referencing canonicals and reciprocal hreflang links.

## Preview

Open `index.html` directly in a browser, or serve this directory with any static HTTP server.

The evidence section expects a deployment-only video at:

```text
website/assets/agentic-video-foundry-demo.mp4
```

The video is intentionally ignored by Git. Copy an approved public master to that path before packaging or deploying the site. It starts muted when at least 45% of the player enters the viewport, pauses after leaving, and does not autoplay when the visitor requests reduced motion.

## Publish

The site is compatible with Nginx, GitHub Pages, and other static hosts. Publishing is intentionally separate from building: validate the public copy, links, responsive layout, media, and repository state before enabling a deployment.

Serve the directory root as `https://video.zzh.app/`; do not serve `website/` as a URL prefix. Keep trailing slashes for locale directories so the canonical `/zh/` URL remains consistent.

## Search and agent discovery

- `sitemap.xml` lists both locales and their reciprocal alternates.
- `robots.txt` permits crawling and points to the sitemap.
- `llms.txt` summarizes the project and canonical resources for AI agents.
- Each page includes Open Graph, Twitter Card, and JSON-LD metadata.
- `favicon.svg`, `assets/apple-touch-icon.png`, and `assets/og-cover.png` share the AV identity.

## Safety boundary

Do not commit API keys, local absolute paths, paid assets, private recordings, or user media. Deployment packages may contain separately approved public media, but those files must remain outside Git history.
