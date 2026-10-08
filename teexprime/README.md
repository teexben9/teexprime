# Teexprime website

Frontend-only marketing site for Teexprime: Home, Work (case studies), Services, Process, About and the Start a Project diagnostic. Built with Astro and Tailwind CSS, in English, Chinese, Spanish, French and German, with light and dark themes.

## Run it

```bash
npm install
cp .env.example .env   # then paste your Web3Forms key into .env
npm run dev            # http://localhost:4321
npm run build          # static site in dist/
```

## Before launch

| What | Where |
|---|---|
| Web3Forms key | `.env` locally, and an environment variable `PUBLIC_WEB3FORMS_KEY` on the host |
| WhatsApp number, email, location, social links | `src/lib/site.ts` (empty values are hidden) |
| Real logo | Put the file in `public/` and set `logo` in `src/lib/site.ts` |
| Case studies | `src/content/work/` (copy a `_template-*.md` file, fill it in, set `draft: false`) |
| Screenshots | `public/work/<client>/` and list them under `images` in the case study |
| Translations | `src/i18n/locales/*.ts` (non-English files are drafts; have a fluent speaker check them) |
| Domain | `SITE_URL` environment variable |

## How it fits together

- `src/i18n/` holds every word on the site, one file per language. English (`en.ts`) defines the shape; the others must match it.
- `src/styles/global.css` holds the design tokens (black, light purple accent, greys and off-white) for both themes.
- `src/lib/diagnostic.ts` holds the diagnostic questions, the scoring and the suggested solution. Each submission is emailed through Web3Forms with every answer plus a summary (primary problem, suggested solution, lead score).
- Answers are saved in the visitor's browser while they fill in the form, so nothing is lost if the connection drops.
- Animations switch off for visitors whose device asks for reduced motion.

## Hosting

Any static host works. On Vercel, Netlify or Cloudflare Pages: build command `npm run build`, output folder `dist`, and add `PUBLIC_WEB3FORMS_KEY` and `SITE_URL` as environment variables.

Research notes and decisions behind this site: [docs/research.md](docs/research.md).
