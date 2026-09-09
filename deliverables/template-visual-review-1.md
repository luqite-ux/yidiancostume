# Template visual review 1

- Verdict: `TARGETED_FIX`
- Review basis: real Chromium screenshots at 1440px and 390px, with first and last Hero slides captured separately.
- Desktop evidence: `D:\Cursor\Grand\yidiancostume\output\playwright\template-home-desktop.png`
- Mobile evidence: `D:\Cursor\Grand\yidiancostume\output\playwright\template-home-mobile-390.png`
- Hero evidence: `template-hero-1-desktop.png`, `template-hero-3-desktop.png`

## Score

| Dimension | Score | Finding |
|---|---:|---|
| Banner / commercial composition | 2/4 | Supplied composites are visually coherent, but every slide forces copy left; slide 1 overlaps the first product medallion and slide 2 competes with the central performer. |
| Brand specificity | 3/4 | Green, warm ivory, gold and supplied imagery are specific, but the real Logo reads too small in header/footer. |
| Typography / hierarchy | 3/4 | Editorial serif hierarchy is clear; mobile hero copy is dense and needs a safer content panel. |
| Image quality / authenticity | 2/4 | Factory image is truthful, but v0 duplicated/misassigned several representative product assets. |
| Page narrative / rhythm | 4/4 | Product lines → products → OEM → factory → QC → buyers → FAQ → news forms a coherent B2B story. |
| Motion / responsive behavior | 2/4 | Hero autoplay and hover states work; the four-scene motion plan is not yet fully represented, and 390px hero positioning needs refinement. |

Total: **16/24**. No dimension reaches 0, but the required PASS threshold is not met.

## Blocking findings

- `VIS-BANNER-COPY-SAFE-AREA`: configure per-slide desktop/mobile alignment and focal point; do not cover core subjects.
- `VIS-BRAND-LOGO-VISIBILITY`: enlarge/clarify header and footer brand positions while preserving the supplied Logo ratio.
- `VIS-PRODUCT-GRID-COVER-CONSISTENCY`: replace v0-misassigned representative images with the verified originals before reviewing the grid.
- `VIS-MOTION-PERCEPTIBLE-COVERAGE`: implement the approved four-scene motion plan with reduced-motion fallbacks.
- Footer legal owner normalization: prevent `Ltd..` by trimming trailing punctuation before adding the sentence period.

All fixes are local, evidence-based and preserve the accepted green / ivory / gold visual system.
