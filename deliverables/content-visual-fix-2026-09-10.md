# Content Visual Fix — 2026-09-10

## Scope

This is a targeted correction of two owner-evidenced visual defects. The approved site structure, routes, copy, branding, product data, backend links, inquiry flow and motion system remain unchanged.

Design Read: an existing B2B garment-manufacturing site for wholesale buyers, using a clean and documentary visual language. This pass preserves the current design system and applies only the minimum changes required for unobscured products and cleaner factual factory photography.

## Issues and resolutions

### VIS-PRODUCT-CATEGORY-OVERLAY

- Previous condition: a dark green bottom gradient and overlaid copy obscured the lower portion of all three category images.
- Resolution: removed the gradient and image-overlay copy. Each card now has a dedicated 4:3 image stage using `object-contain`, followed by a separate light information panel.
- Product integrity: the stage costume, porch goose outfit and pet clothes subjects are fully visible at desktop and 390px. No hover zoom can crop the subjects.
- Result: PASS.

### VIS-FACTORY-PHOTO-DATE-RETOUCH

- Previous condition: the four supplied factory images included orange date stamps and had inconsistent noise, exposure and fluorescent color casts.
- Resolution: created versioned AI-cleaned derivatives that remove the date stamps, reconstruct only the covered floor/background area, reduce noise, recover moderate tonal detail and normalize color.
- Factual integrity: viewpoint, crop intent, workers, machines, work tables, garment piles, storage racks, packages, signage and room geometry remain based on the supplied photographs. No equipment, production line, worker, certification or capability was invented.
- Result: PASS.

| Supplied public asset | Adopted derivative |
| --- | --- |
| `factory-latest.png` | `factory-latest-clean.png` |
| `sewing-line.png` | `sewing-line-clean.png` |
| `finishing-area.png` | `finishing-area-clean.png` |
| `warehouse.png` | `warehouse-clean.png` |

The original source archive remains preserved in `.codex-delivery/source/yidiancostume-v0.zip` for provenance. Public components use only the versioned clean derivatives.

## Browser evidence

- Desktop category section: `output/playwright/visual-fix-categories-desktop.png`
- 390px category section: `output/playwright/visual-fix-categories-mobile-390.png`
- Desktop manufacturing page: `output/playwright/visual-fix-manufacturing-desktop.png`
- 390px manufacturing page: `output/playwright/visual-fix-manufacturing-mobile-390.png`
- 390px sewing image: `output/playwright/visual-fix-sewing-mobile-390.png`
- 390px finishing image: `output/playwright/visual-fix-finishing-mobile-390.png`
- 390px warehouse image: `output/playwright/visual-fix-warehouse-mobile-390.png`

Local Production browser console result: 0 errors. The two observed warnings are Next.js preload timing warnings for the hero image and do not indicate a failed image request.

## Local verification

- Full automated test suite: 18/18 PASS.
- TypeScript: PASS.
- Next.js Production build: PASS.
- Taste outcome: PASS for the requested surfaces at desktop and 390px.

## Formal Production verification

- Visual correction commit: `63286e5dabd7a591bee9ba94f82263f424160579`.
- Visual Production deployment: `dpl_3uS1CHYsNKoXucerKBLAmi8gTie1`, state `READY`.
- Follow-up static-page canonical correction commit: `6fd08304211d8e7d96fa7026dd188fe90b3ccaf9`.
- Canonical correction Production deployment: `dpl_EeDo1fLbieKZ7XbbZEtPWiLXZP4o`, state `READY`.
- Formal routes `/` and `/manufacturing`: HTTP 200.
- All four adopted clean image assets: HTTP 200.
- Formal HTML uses all four clean assets and does not contain the removed category gradient class.
- Formal desktop category evidence: `output/playwright/formal-visual-fix-categories-desktop.png`.
- Formal 390px category evidence: `output/playwright/formal-visual-fix-categories-mobile-390.png`.
- Formal desktop manufacturing evidence: `output/playwright/formal-visual-fix-manufacturing-desktop.png`.
- Formal 390px manufacturing evidence: `output/playwright/formal-visual-fix-manufacturing-mobile-390.png`.
- Formal browser console: 0 errors and 0 warnings on the final screenshot pass.

The first valid Lighthouse manufacturing-page report scored Performance 96, Accessibility 100 and Best Practices 100. Its only SEO failure was an inherited homepage canonical on the manufacturing route. That pre-existing defect was corrected for `/about`, `/contact`, `/faq`, `/manufacturing`, `/news`, `/oem-odm` and `/products`; each route was then read back from the formal domain with an HTTP 200, its own canonical URL and matching Open Graph URL. A subsequent Lighthouse CLI attempt produced no usable audit because Windows denied cleanup of the tool's temporary directory, so no score is claimed from that empty report.
