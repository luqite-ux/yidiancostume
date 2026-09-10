# YIDIANYUAN Motion Plan

Customer: Shantou Yidianyuan Garment Industry Co., Ltd.  
Industry: stage costumes, porch-goose outfits, pet apparel, OEM/ODM garment manufacturing  
Goal: make the site feel editorial and theatrical while keeping product evaluation and RFQ conversion fast, legible, and trustworthy.

## Inputs and recent-combination check

- Brand signals: deep green and warm gold Logo, detailed full-length garments, seasonal costume color, real sewing-floor evidence.
- Conversion path: category discovery → product detail/gallery → Request a Quote.
- The recent ledger combinations rely heavily on industrial signal paths, aperture reveals, product rails, or shallow factory parallax. This plan does not reuse those complete combinations.
- Basic one-time in-view/card coverage remains a usability mechanism, but the identifying motion is a stage-curtain hero transition and shared-layout product filtering.

## Foreign-trade case-library reference

The owner requested a fresh case-library lookup on 2026-09-10. Two apparel/manufacturing searches returned zero matching rows, so the implementation reuses the three previously validated apparel references already recorded in `.codex-delivery/case-reference.md`:

- Tahui Sweater Factory — https://www.tahui-factory.cn/ — borrow only its clear factory-to-product information rhythm.
- Binhar — https://www.binhar.com/ — borrow only its category hierarchy and buyer-path pacing.
- COMMTEX — https://www.gocommtex.com/ — borrow only its restrained manufacturing storytelling.

No customer facts, images, copy, page structure, branding, or code are copied from these references.

## Owner-directed full-homepage coverage

The final implementation expands the four authored scenes across every homepage section: Hero, category lines, featured products, OEM/ODM process, manufacturing facts, quality control, buyer applications, FAQ, and News. Section headings, repeated cards, manufacturing media, and the primary process CTA enter in bounded reading order; the Hero remains the focal authored sequence. The implementation keeps content partially visible before enhancement, runs once per viewport, caps stagger, and removes spatial movement when `prefers-reduced-motion` is enabled.

## External candidates and scoring

Score: 1 (poor) to 5 (strong). Total is out of 35 across industry fit, hierarchy, conversion help, recent differentiation, desktop, 390px, performance/reduced-motion.

| Candidate | Source | Industry | Hierarchy | Conversion | Difference | Desktop | 390px | Perf / reduced | Total | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| EXT-YIDIAN-01 keyed `AnimatePresence` with clip-path entrance/exit | Motion official AnimatePresence docs | 5 | 5 | 4 | 5 | 5 | 4 | 4 | 32 | Adopt as a short stage-curtain hero reveal; use stable keyed slides and never hide DOM copy by default. |
| EXT-YIDIAN-02 shared `layoutId` underline and transform-based layout animation | Motion official layout-animation docs | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 33 | Adopt for category selection and bounded product-grid reflow. |
| EXT-YIDIAN-03 scroll-linked progress / parallax through `useScroll` | Motion official scroll-animation docs | 3 | 3 | 2 | 2 | 4 | 2 | 2 | 18 | Reject: continuous scroll coupling adds little purchasing value and is fragile for long mobile catalogs. |
| EXT-YIDIAN-04 native View Transition wrapper / shared route morph | Motion `animateView` docs | 3 | 4 | 3 | 4 | 4 | 4 | 2 | 24 | Reject for first release: snapshot transitions are non-interruptible and the React wrapper currently carries canary/Motion+ constraints. |

Sources reviewed 2026-09-09:

- https://motion.dev/docs/react-animate-presence
- https://motion.dev/docs/react-layout-animations
- https://motion.dev/docs/react-scroll-animations
- https://motion.dev/docs/react-animate-view

No third-party branding, assets, copy, page structure, or restricted example code will be copied.

## Final motion scenes

### MOT-YIDIAN-01 — Stage-curtain Hero reveal

- Duty: narrative + industry signature.
- Location: Home hero, three customer-supplied promotional themes.
- Effect: the next slide enters through a restrained center-opening/inset clip, paired with a 12–18px text rise in reading order. Exit uses a brief opacity reduction; no opposing 300px slide movement.
- Timing: image 600–700ms, text stagger 70ms with a cumulative cap below 350ms. First heading and primary CTA remain immediately available.
- Implementation: keyed `AnimatePresence`; controls remain native buttons with keyboard, touch, focus, pause, and swipe support. Autoplay pauses on focus/hover/hidden page.
- 390px: use a shorter 350–450ms vertical inset reveal or crossfade, with an independently chosen safe crop and no perspective/parallax.
- Reduced motion / failure: no autoplay, no clip or displacement; static active image and all DOM text/controls are immediately visible. If JS fails, the first slide remains a complete readable hero.

### MOT-YIDIAN-02 — Shared category selector and bounded catalog reflow

- Duty: content organization + conversion help.
- Location: homepage category band and `/products` filters.
- Effect: a warm-gold shared underline/pill indicator moves between Stage Costumes, Porch Goose Outfits, and Pet Clothes; matching product cards reflow with short opacity/scale settling. No card expands over other content.
- Timing: selector 220–280ms; card reflow 250–350ms. Newly fetched/paginated cards get the same first-presentation behavior.
- Implementation: Motion `layoutId` within a namespaced `LayoutGroup`; `AnimatePresence mode="popLayout"` only if the downloaded stack supports it safely, otherwise CSS transition + DOM reorder.
- 390px: horizontally scrollable semantic tab row with visible focus/current state; reflow uses opacity only when transform would cause jank.
- Reduced motion / failure: the active category changes instantly; filters remain working buttons/links, and every product stays readable.

### MOT-YIDIAN-03 — Measuring-tape manufacturing facts

- Duty: industry-specific explanation.
- Location: verified manufacturing facts on Home and `/manufacturing`.
- Effect: a fine green/gold ruled line grows once beneath the section as four factual nodes settle into place: 800㎡, 5 sewing lines, 2 cutting machines, 80–100k pieces/month. Numbers do not spin or continuously count; the line suggests pattern-making and garment measurement.
- Timing: line 550ms; node stagger 90ms capped at 270ms.
- Implementation: CSS transform scaleX and one-time IntersectionObserver/Motion in-view; semantic list and text exist independently of the decorative line. Observer is disconnected after reveal.
- 390px: convert to a short vertical rule with 12–16px node offset; no horizontal overflow.
- Reduced motion / failure: full list and decorative rule render immediately in their final state. The rule is `aria-hidden`.

### MOT-YIDIAN-04 — Editorial card entrance and garment-detail feedback

- Duty: interaction + mandatory card coverage.
- Location: all product, capability, application, process, FAQ, news, team/data, and other repeated information-card collections.
- Effect: every card gets a one-time 20–24px fade/rise in bounded reading order. Product cards add a 4px lift, small border/shadow change, and at most 1.025 image scale while preserving the complete subject; CTA arrows move 3–4px. Accordion icons rotate once on open/close.
- Timing: 500–620ms entrance, 70–90ms stagger with cumulative cap below 500ms; hover/focus 160–220ms.
- Implementation: progressive enhancement only. Base CSS is visible; hiding is allowed only after a synchronous `data-motion-ready` marker. Dynamic filter/page results participate on first presentation.
- 390px: all cards still receive short opacity/12px entry; hover-only transforms are omitted and press/focus feedback remains.
- Reduced motion / failure: remove displacement, scaling, stagger, and smooth scrolling; cards, forms, and details are immediately visible.

## Required verification

- Desktop: Home hero manual/auto controls; first and last card in every repeated collection; category filter reflow; manufacturing facts; CTA hover/focus; no clipped garments or text.
- 390px: Home, Products, one product detail, Manufacturing, About, News empty state, Contact/CAPTCHA; first and last card participation; no horizontal overflow or hover-only information.
- Failure safety: verify normal JS, JavaScript disabled, motion script blocked, slow load, and `prefers-reduced-motion: reduce`. Core content must remain visible in all cases.
- Performance: no continuous background loops, particle fields, scroll hijacking, 3D rotation, or deep parallax. Clear observers/listeners/timers on unmount.

Status before v0 generation: desktop-ready `PASS`; 390px-ready `PASS`; reduced-motion design `PASS`.

Production verification status: pending the 2026-09-10 Logo and full-homepage motion release.
