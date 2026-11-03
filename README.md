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

## Event portal (guest QR codes and galleries)

Couples log in at `/my-event` with an event code and password to get their guest QR code, printable table cards and gallery link.
The team creates and manages events at `/admin`. Guests upload through TouchPix; this portal only stores the event details
(name, date, the TouchPix guest and gallery links, the gallery password) in a small Cloudflare Worker in `worker/`.

**Deploy the Worker once** (needs a free Cloudflare account):

```bash
cd worker
npm install
npx wrangler login
npx wrangler kv namespace create EVENTS      # prints an id: paste it into worker/wrangler.toml
npx wrangler secret put ADMIN_PASSWORD       # the password the team uses at /admin
npx wrangler secret put TOKEN_SECRET         # any long random string
npx wrangler deploy                          # prints the Worker's address
```

Then put that address in `src/config/site.ts` as `apiUrl` (for example `https://spinpix-events.your-name.workers.dev`) and merge.
If the website's address ever changes, add it to `ALLOWED_ORIGINS` in `worker/wrangler.toml` and deploy again.
Until `apiUrl` is set, the portal pages show a friendly "being set up" message.

**Run it locally:** create `worker/.dev.vars` with `ADMIN_PASSWORD=...` and `TOKEN_SECRET=...`, then `npm run dev` in `worker/`
and `VITE_API_URL=http://localhost:8787 npm run dev` in the project root.

**Privacy:** customer passwords are stored only as salted hashes. Photos and videos stay in TouchPix and never touch this service.

## Deployment

Pushes to `main` build and publish to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
