# Production verification

Date: 2026-09-10 (Asia/Shanghai)

Customer: 汕头市依甸原服装实业有限公司  
Formal English entity: Shantou Yidianyuan Garment Industry Co., Ltd.  
Tenant: `ac8709c2-5781-4cac-99e2-2871a1489289`  
Formal site: https://yidiancostume.com  
Platform Production: https://yidiancostume.vercel.app  
Repository: https://github.com/luqite-ux/yidiancostume  
Workbench task: `717d7aa4-e1a0-490c-9433-51f6d1352a07`

## Production result

Result: **PASS**, with final irreversible v0/local cleanup intentionally pending the required owner cleanup gate.

- Vercel Production is READY and linked to `luqite-ux/yidiancostume`, branch `main`.
- `yidiancostume.com` and `www.yidiancostume.com` are verified by Vercel; `www` redirects to the canonical bare domain with HTTP 308.
- Cloudflare Zone `yidiancostume.com` is active and authoritative through `eleanor.ns.cloudflare.com` and `sterling.ns.cloudflare.com`.
- The root uses Vercel's project-specific `216.150.1.1` and `216.150.16.1` A records; `www` uses `fb73f6b441ddcf23.vercel-dns-016.com` as a DNS-only CNAME.
- The pre-existing mail configuration was backed up and preserved: two MX records, four TXT records (SPF, DKIM, DMARC and provider verification), plus three Forward Email CNAME records.
- HTTPS returns 200 on the bare domain and the browser receives the intended branded icon candidates.

## Content, backend and admin

- Tenant display name, formal domain, contact email, `admin_group = 2`, default language `en`, supported languages `['en']`, R2 logo/favicon and translation profile were read back from Supabase.
- The sole active administrator is `info@yidiancostume.com`; `must_change_password = false`.
- 32/32 active products are backend-driven and have R2 absolute cover URLs; all supplied gallery coverage was reconciled during content integration.
- There are no demo news records and no residual test inquiries.
- A real formal-domain admin login reached the tenant dashboard and displayed 32 products, with the expected products/articles/inquiries/settings navigation.
- The future-language extension flow was exercised by temporarily enabling Chinese. A product and a temporary draft article were translated with the admin's DeepSeek action, manually refined, saved, reopened and read back. All applicable populated product field groups and all three article field groups persisted correctly. The draft was then deleted and the tenant returned to English-only launch configuration.

## Public routes, SEO and compliance

- Formal-domain Sitemap: 40 URLs; 40/40 returned 200.
- All 40 public URLs have unique titles and descriptions, the formal-domain canonical and `og:url`, absolute HTTPS Open Graph images, one `h1`, and no Chinese leakage in the English launch pages.
- `robots.txt` and `sitemap.xml` return 200; robots declares `https://yidiancostume.com/sitemap.xml` and blocks admin/API routes.
- Homepage `Organization` and `WebSite` JSON-LD and product `Product` JSON-LD are present on Production.
- Source, backend content and every Sitemap page returned zero matches for warranty/guarantee/质保/保修 terms.
- Branded PNG icon candidates and the branded `/icon.svg` admin-proxy fallback all return 200.

## Visual, accessibility and inquiry protection

- Formal-domain desktop (1440 × 900) and mobile (390 × 844) screenshots were inspected; brand, hero, products, manufacturing, FAQ, news empty state and footer remain coherent and readable.
- Lighthouse on the formal domain: Performance 90, Accessibility 100, Best Practices 100, SEO 100; no failed binary audits.
- Local Production browser audit covered 42 routes including all 32 product details, with no unexpected status, CJK leakage, duplicate/missing `h1`, or horizontal overflow. Core routes also remained visible with JavaScript disabled.
- The image CAPTCHA, 4-character input and refresh control are visible on the formal contact page. The invalid-code path returns the intended English error. Atomic issue/consume, replay rejection, validation-before-insert and failure-before-notification behavior are covered by the automated integration contract; no CAPTCHA-solving or live inquiry submission was used for acceptance.

## Automated verification

- `node --test tests/*.test.mjs`: 14/14 passed.
- `pnpm build`: passed, including TypeScript validation.
- GitHub company-token identity: `luqite-ux`; remote `main` was read back after push.
- Vercel Production deployment SHA was read back and matched the pushed source SHA before this documentation-only final commit.
