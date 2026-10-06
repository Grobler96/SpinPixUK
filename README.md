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

Enquiries are saved to Supabase (`supabase/migrations`). Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
(locally in `.env`; on GitHub as repository variable `VITE_SUPABASE_URL` and secret `VITE_SUPABASE_ANON_KEY`).
Without them the form opens the visitor's email app instead.

## Deployment

Pushes to `main` build and publish to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
