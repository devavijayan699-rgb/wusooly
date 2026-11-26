# Wusooly POS

Marketing website and documentation for **Wusooly POS** — point-of-sale and business management software for retail shops, supermarkets, cafés, and restaurants.

## Tech Stack
- **Framework**: Next.js 16.4.6 (App Router, Static Export via `output: 'export'` and `images: { unoptimized: true }` in `next.config.mjs`)
- **UI & Motion**: React 19, GSAP (`gsap`, `@gsap/react`), Lenis (`lenis`), Motion (`motion`), Lucide Icons (`lucide-react`), `@ziqx/react-comps`

## Routes
- `/` — Main landing page (Hero, Features Grid, Pricing, FAQ, Testimonials, Download, CTA)
- `/solutions` — Sector-tailored solutions (Retail & F&B toggle)
- `/helper` — Wusooly Helper Android companion showcase & pairing guide
- `/pricing` — Plans & comparison view
- `/about` — Company story & counter workflow
- `/contact` — Contact & demo request
- `/privacy`, `/terms` — Legal documentation

## Architecture Notes for Developers
- **`lib/audienceMotion.js`**: Shared Motion transition configs and spring tokens (`AUDIENCE_PILL_SPRING`, `useAudienceTransition`, `headerTextVariants`) synchronizing the Retail / Cafe switcher across `AudienceToggle`, `FeaturesGrid`, `PricingSection`, and `/solutions`.
- **`app/components/sections/HelperPhonePreview.js`**: Non-interactive CSS/JSX hardware mockup sized to Nothing Phone (4a) Pro proportions (`76.62 / 163.66`, slim symmetrical bezels, right-side Volume/Power keys, left-side Essential Key) using `lucide-react` icons.
- **`app/components/layout/Navbar.js` & `TransitionProvider.js`**: Floating pill navigation with conditional hero styling and smooth route/anchor transitions.

## Local Development
```bash
npm install
npm run dev
```

## Production Static Build
```bash
npm run build
```
Generates the static export bundle inside `out/` (deployable to any static host or CDN such as Vercel, Netlify, Cloudflare Pages, Nginx, or S3). Remove `output: 'export'` from `next.config.mjs` if switching to Node.js/SSR hosting.
