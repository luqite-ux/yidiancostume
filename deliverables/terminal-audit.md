# Terminal audit

Date: 2026-09-10 (Asia/Shanghai)

Result: **PASS** for the local Production candidate.

## Verification evidence

- `node --test tests/*.test.mjs`: 14/14 passed.
- `pnpm build`: Next.js Production build and TypeScript validation passed.
- Playwright production-route audit: 42 routes checked at 390 px, including all 32 product detail routes; no unexpected status, CJK leakage, duplicate/missing `h1`, or horizontal overflow.
- JavaScript-disabled audit: products, manufacturing, about, news, contact, and a representative product detail remained visible and returned 200.
- Lighthouse (`output/lighthouse-local-final.json`): Performance 93, Accessibility 100, Best Practices 100, SEO 100; no failed binary audits.
- Inquiry negative path: invalid CAPTCHA returned the intended English error without creating an inquiry.
- Mobile navigation, product image containment, full product gallery, footer identity, runtime copyright year, branded icon candidates, reduced-motion handling, and empty-news state were manually inspected in the real browser.

## Findings resolved during the terminal audit

- Inactive carousel slides are now inert and removed from the keyboard focus order.
- Carousel tabs now provide at least 28 × 28 px interactive targets while retaining the original compact visual dots.
- Accent labels use separate accessible colors for light and dark backgrounds.
- The carousel renders one active `h1`; inactive slides use `h2`.
- Analytics only loads on an actual Vercel Production deployment, avoiding invalid local requests.

## Remaining platform checks

The same route, metadata, CAPTCHA, admin-proxy, icon, responsive, and visual checks must be repeated against the Vercel Production host and then the formal domain before the site is considered Production-verified.
