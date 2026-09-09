import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (file) => readFileSync(new URL(file, root), 'utf8')

test('products and articles are read from the tenant backend', () => {
  for (const file of ['lib/products-db.ts', 'lib/articles-db.ts', 'app/news/[slug]/page.tsx']) assert.equal(existsSync(new URL(file, root)), true, `missing ${file}`)
  for (const file of ['app/page.tsx', 'app/products/page.tsx', 'app/products/[slug]/page.tsx', 'app/news/page.tsx']) {
    const source = read(file)
    assert.doesNotMatch(source, /@\/lib\/products['"]|@\/lib\/site-data['"].*articles/)
  }
})

test('product detail exposes the complete backend gallery without cropping products', () => {
  const page = read('app/products/[slug]/page.tsx')
  const gallery = read('components/product-gallery.tsx')
  assert.match(page, /<ProductGallery images=\{product\.images\}/)
  assert.match(gallery, /availableImages\.map/)
  assert.match(gallery, /object-contain/)
  assert.match(gallery, /aria-label=\{`View image/)
  assert.match(read('lib/products-db.ts'), /\[main,\s*\.\.\.images\.filter/)
})

test('manufacturing page uses every qualified client-supplied facility photograph', () => {
  const page = read('app/manufacturing/page.tsx')
  for (const image of ['factory-latest.png', 'warehouse.png', 'sewing-line.png', 'finishing-area.png']) {
    assert.equal(existsSync(new URL(`public/images/${image}`, root)), true, `missing ${image}`)
    assert.match(page, new RegExp(image.replace('.', '\\.')))
  }
})

test('inquiry CAPTCHA is consumed before the inquiry insert', () => {
  const route = read('app/api/inquiries/route.ts')
  const verify = route.indexOf('verifyCaptchaSubmission')
  const insert = route.indexOf("from('inquiries').insert")
  assert.ok(verify >= 0 && insert > verify)
  assert.match(read('components/inquiry-form.tsx'), /InquiryCaptchaField/)
})

test('customer admin uses Route Handler login and proxy rewrites', () => {
  assert.match(read('app/api/auth/login/route.ts'), /NextResponse\.redirect\(new URL\('\/admin'/)
  assert.match(read('app/admin/login/page.tsx'), /action="\/api\/auth\/login"/)
  assert.match(read('next.config.mjs'), /source: '\/admin\/:path\*'/)
  assert.match(`${read('proxy.ts')}\n${read('lib/admin-session.ts')}`, /hq_admin_session/)
})

test('technical SEO covers robots, dynamic sitemap, canonical host, and page schemas', () => {
  for (const file of ['app/robots.ts', 'app/sitemap.ts']) assert.equal(existsSync(new URL(file, root)), true, `missing ${file}`)
  assert.match(read('app/layout.tsx'), /Organization/)
  assert.match(read('app/products/[slug]/page.tsx'), /Product/)
  assert.match(read('app/news/[slug]/page.tsx'), /Article/)
  assert.match(read('app/faq/page.tsx'), /FAQPage/)
  assert.doesNotMatch(read('app/layout.tsx'), /generator:\s*'v0\.app'/)
  assert.match(read('app/layout.tsx'), /process\.env\.VERCEL_ENV === 'production'/)
})
