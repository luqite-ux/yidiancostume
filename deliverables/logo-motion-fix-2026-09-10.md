# Official Logo and Homepage Motion Fix — 2026-09-10

Customer: 汕头市依甸原服装实业有限公司

Domain: `https://yidiancostume.com`

Tenant: `ac8709c2-5781-4cac-99e2-2871a1489289`

## Owner request

- Replace the incorrect small square/duplicate wordmark treatment with the supplied complete `YD 依甸原 YIDIANYUAN` Logo.
- Remove the white Logo canvas and enlarge the actual mark in both header and footer.
- Consult the foreign-trade case library and make every homepage section visibly animated.

## Implemented scope

- Derived a transparent PNG from the supplied official horizontal Logo without redrawing, recoloring, or changing its proportions.
- Replaced header and footer branding with one complete Logo image and removed duplicate HTML wordmarks/taglines.
- Removed the obsolete white-canvas `public/images/logo.jpg` asset.
- Moved the footer to a light sage brand surface so the official dark-green Logo remains legible without a white box.
- Rebuilt favicon and Apple touch icon assets from the official `YD` emblem only.
- Uploaded the transparent Logo and square favicon to the tenant R2 brand path and updated only this tenant's `logo_url` and `favicon_url`; database readback passed.
- Added purposeful one-time motion to all nine homepage sections: Hero, Categories, Featured Products, OEM/ODM Process, Manufacturing, Quality Control, Applications, FAQ, and News.
- Added reduced-motion final-state recovery and progressive-enhancement defaults so content remains readable if JavaScript or the motion runtime is unavailable.

## Case-library reference

The requested live apparel/manufacturing queries returned zero matching rows. The pass therefore reused the already validated references in `.codex-delivery/case-reference.md`: Tahui Sweater Factory, Binhar, and COMMTEX. Only information rhythm and motion pacing were considered; no external customer facts, text, images, brand assets, page structure, or code were copied.

## Verification evidence

- Unit/integration suite: `20/20 PASS`.
- TypeScript: `PASS`.
- Next.js Production build: `PASS`.
- Impeccable detector: `[]` (no findings).
- Desktop full-page evidence: `output/playwright/logo-motion-home-desktop.png`.
- 390px full-page evidence: `output/playwright/logo-motion-home-mobile-390.png`.
- 390px open-menu evidence: `output/playwright/logo-mobile-menu-open-390.png`.
- 390px footer evidence: `output/playwright/logo-footer-mobile-390.png`.
- JavaScript-disabled evidence: `output/playwright/logo-motion-no-js-390.png`; HTTP `200`, nine motion sections present, Products/FAQ/News content present.
- Reduced-motion calculation after corrective pass: `opacity: 1`, `transform: none`.
- Normal-motion calculation: OEM heading changed from `opacity: 0.88; translateX(-22px)` to `opacity: 1; transform: none` after entering the viewport.

## Production status

`PASS`.

- GitHub company identity/owner: `luqite-ux` / `luqite-ux`.
- Implementation SHA: `b089db70a0a64fb33244fe4dbc0bd29e33b51f86`.
- Implementation deployment: `dpl_5Hhdb7Kihh1RvyY3SYPfCP1kgCfG`, `READY`, same SHA.
- Formal-domain desktop and 390px browser: `PASS`; nine motion sections, no horizontal overflow, zero console errors on the clean formal-domain session.
- Header Logo desktop render: `205 × 70.28px`; complete mark with no duplicate text.
- Formal-domain asset checks: transparent Logo, favicon, Apple icon, R2 Logo, and R2 favicon all returned HTTP `200`.
- Obsolete `https://yidiancostume.com/images/logo.jpg`: HTTP `404`; formal HTML contains the transparent Logo URL and no old Logo reference.
