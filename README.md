# Abhishek Portfolio

This repository contains the source for Abhishek Wani's portfolio website and related artifacts.

## Structure

- `artifacts/portfolio/` — React + Vite portfolio application
- `artifacts/mockup-sandbox/` — mockup preview sandbox
- `lib/` — shared libraries and API-related packages
- `scripts/` — build and utility scripts

## Workflows

- `/.github/workflows/deploy-portfolio.yml` — deploys the portfolio build to GitHub Pages root

## Current status

- Portfolio site content and SEO metadata updated
- GitHub Pages deployment configured from repository root
- `project-notes/UPDATE_PROJECTS.md` added for future project summary improvements

## Next improvements

- Add richer project previews and engineering case studies
- Add screenshot/video assets for each featured project
- Strengthen project summaries with problem, solution, and impact details
- Add social preview image for Open Graph sharing
- Add a dark/light theme toggle to the site (planned for tomorrow)

## Local development

```bash
pnpm install
pnpm --dir artifacts/portfolio dev
```

## Deployment

The workflow builds the portfolio app in `artifacts/portfolio` and copies the output to repository root before committing the generated files.
