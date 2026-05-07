# Skyline Travel — Improvement Tasks

Tracking all suggested improvements after the May 2026 refactor.
Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Tier 1 — Ship-blockers ✅ DONE

- [x] **1.1 React Router migration** — `react-router-dom` v7 installed, routes in App.jsx, browser nav works
- [x] **1.2 Mobile hamburger menu** — slide-in drawer, animated, closes on link/Esc/backdrop click, body-scroll lock
- [x] **1.3 ESLint + Prettier setup** — `eslint.config.js`, `.prettierrc.json`, npm scripts; lint passes with 0 errors
- [x] **1.4 404 page + Error boundary** — `NotFound.jsx`, `ErrorBoundary.jsx` wrapping app
- [x] **1.5 Detail pages** — `/destinations/:id` with hero/highlights/booking aside, `/blog/:id` with article body; cards clickable
- [x] **1.6 Localize prices and dates** — `utils/format.js` using `Intl.NumberFormat` + `Intl.DateTimeFormat`; About team, Contact success, NotFound all translated

---

## Tier 2 — Quality and polish

- [x] **2.1 TypeScript migration** — all 35 source files converted to `.ts`/`.tsx`; `tsconfig.json`; shared `types.ts`; `tsc --noEmit` passes clean; 12 tests green
- [x] **2.2 Vitest + React Testing Library** — `vite.config.js` test block, setup file, helpers, 12 tests passing (format, Contact, Newsletter)
- [x] **2.3 Lazy-load pages** — `React.lazy()` for all routes except Home, `<PageSkeleton />` Suspense fallback; pages now ship as separate chunks
- [x] **2.4 Image lazy loading** — `loading="lazy"` + `decoding="async"` on all `<img>` tags
- [x] **2.5 Toast notifications** — `<ToastProvider />` + `useToast()`, used by NewsletterForm; Contact keeps its inline success card
- [x] **2.6 Newsletter validation** — extracted to `NewsletterForm.jsx`, email regex check, error message, async submit simulation, success toast

---

## Tier 3 — Nice to have

- [x] **3.1 PWA support** — `vite-plugin-pwa`, auto service worker, `manifest.webmanifest`, install prompt banner
- [x] **3.2 SEO meta tags** — `react-helmet-async` installed, `<SEO>` component, wired on every page
- [x] **3.3 `prefers-color-scheme` detection** — ThemeProvider reads OS on first visit, falls back to dark
- [x] **3.4 Booking flow stub** — 3-step modal (travelers → dates → confirmation), localized, price calc
- [x] **3.5 Search/sort/pagination** — tag/category filter pills + full-text search on Destinations and Blog; "no results" state; localized placeholders
- [x] **3.6 Analytics** — Plausible via `VITE_PLAUSIBLE_DOMAIN` env var; auto page views on route change; `Booking Confirmed` + `Newsletter Subscribe` events
- [x] **3.7 Web Vitals monitoring** — `web-vitals` v5, color-coded console output, PROD-only

---

## Notes / Decisions

- Hero search bar is intentionally inert (UI demo only)
- All 19 tasks complete ✅
