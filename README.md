# SpinPix UK website

Photo booth hire website for SpinPix UK. Vite + React + TypeScript + Tailwind.

```bash
npm install
npm run dev        # local development
npm run build      # production build into dist/
```

## Content

- Business details: `src/config/site.ts`
- Booths: `src/data/services.ts`, events: `src/data/events.ts`
- FAQs and booking steps: `src/data/content.ts`
- Reviews: `src/data/reviews.ts`, gallery: `src/data/gallery.ts`
- Photos and logos: `public/` (reference them with `asset('photos/name.jpg')`)

## Enquiry form

The form emails each enquiry to the business through [Web3Forms](https://web3forms.com); nothing is stored on a server we run.

1. Create a free access key at web3forms.com using the email address that should receive enquiries.
2. Add it to GitHub as a repository secret named `VITE_WEB3FORMS_KEY` (Settings > Secrets and variables > Actions), then re-run the deploy workflow.
3. For local testing, put `VITE_WEB3FORMS_KEY=your-key` in a `.env` file.

Without a key the form falls back to opening the visitor's email app.

## Deployment

Pushes to `main` build and publish to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
