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

The access key lives in `src/config/site.ts` (`formKey`). It is safe to keep in the code: Web3Forms keys are public
by design and can only email the address they were created for. To change the receiving address, create a new key at
web3forms.com with that address and replace `formKey`. For local testing you can override it with `VITE_WEB3FORMS_KEY` in `.env`.

## Deployment

Pushes to `main` build and publish to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
