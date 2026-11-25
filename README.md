# Wusooly POS

Marketing website and documentation for **Wusooly POS** — point-of-sale and business management software for shops, supermarkets, cafés, and restaurants.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Static Export via `output: 'export'`)
- **UI & Motion**: React 19, GSAP, Lenis, Motion, Lucide Icons, `@ziqx/react-comps`
- **Hosting**: Firebase Hosting (`worknest-abb22`)

## Development
```bash
npm install
npm run dev -- -p 3001
```

## Production Build & Deploy
```bash
npm run build
npx firebase deploy --only hosting --project worknest-abb22
```
