import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)

const requiredRoutes = [
  'app/page.tsx',
  'app/products/page.tsx',
  'app/products/[slug]/page.tsx',
  'app/oem-odm/page.tsx',
  'app/manufacturing/page.tsx',
  'app/about/page.tsx',
  'app/faq/page.tsx',
  'app/news/page.tsx',
  'app/contact/page.tsx',
  'app/not-found.tsx',
]

test('template exposes every required public route', () => {
  for (const route of requiredRoutes) {
    assert.equal(existsSync(new URL(route, root)), true, `missing ${route}`)
  }
})

test('home page composes the complete v0 section system', () => {
  const source = readFileSync(new URL('app/page.tsx', root), 'utf8')
  for (const section of [
    'HeroSlider',
    'CategoryGrid',
    'FeaturedProducts',
    'OemProcessSection',
    'ManufacturingFactsSection',
    'QualityControlSection',
    'ApplicationsSection',
    'FaqPreviewSection',
    'NewsEmptyState',
  ]) {
    assert.match(source, new RegExp(`<${section}`), `home page must render ${section}`)
  }
  assert.doesNotMatch(source, /SyntheticV0PageForDeployment/)
})

test('production build does not depend on fetching remote Google fonts', () => {
  const source = readFileSync(new URL('app/layout.tsx', root), 'utf8')
  assert.doesNotMatch(source, /next\/font\/google/)
})

test('hero stores a distinct copy position for every supplied banner', () => {
  const source = readFileSync(new URL('components/home/hero-slider.tsx', root), 'utf8')
  assert.equal((source.match(/contentPositionDesktop:/g) ?? []).length, 4)
  assert.equal((source.match(/contentPositionMobile:/g) ?? []).length, 4)
})

test('hero leads with the promoted goose outfits and uses the three client banners without gradients', () => {
  const source = readFileSync(new URL('components/home/hero-slider.tsx', root), 'utf8')
  const promoted = source.indexOf("image: '/images/banner-goose-outfits.jpg'")
  const manufacturing = source.indexOf("image: '/images/banner-3.jpg'")
  const stage = source.indexOf("image: '/images/banner-2.jpg'")

  assert.ok(promoted >= 0, 'missing promoted porch-goose banner')
  assert.ok(manufacturing > promoted, 'manufacturing banner must follow promoted porch-goose banner')
  assert.ok(stage > manufacturing, 'stage-costume banner must be the third slide')
  assert.doesNotMatch(source, /bg-gradient-/)
  assert.doesNotMatch(source, /backdrop-blur/)
  assert.doesNotMatch(source, /imageNote/)
})

test('mobile hero separates the client banner from an opaque copy panel and clips reveal overflow', () => {
  const hero = readFileSync(new URL('components/home/hero-slider.tsx', root), 'utf8')
  const layout = readFileSync(new URL('app/layout.tsx', root), 'utf8')

  assert.match(hero, /h-\[220px\].*sm:inset-0.*sm:h-auto/)
  assert.match(hero, /pt-\[220px\]/)
  assert.match(hero, /bg-background p-5/)
  assert.doesNotMatch(hero, /bg-background\/95/)
  assert.match(layout, /overflow-x-clip/)
})

test('hero keeps exactly one semantic page heading as slides change', () => {
  const source = readFileSync(new URL('components/home/hero-slider.tsx', root), 'utf8')
  assert.match(source, /const Heading = i === index \? 'h1' : 'h2'/)
  assert.match(source, /<Heading/)
  assert.doesNotMatch(source, /<h1 className=/)
})

test('hero reads reduced-motion preference without an effect-driven state update', () => {
  const source = readFileSync(new URL('components/home/hero-slider.tsx', root), 'utf8')
  assert.match(source, /useReducedMotion/)
  assert.doesNotMatch(source, /setReducedMotion/)
})

test('hero removes inactive slides from focus order and gives slide tabs usable touch targets', () => {
  const source = readFileSync(new URL('components/home/hero-slider.tsx', root), 'utf8')
  assert.match(source, /inert=\{i !== index\}/)
  assert.match(source, /h-7 w-7/)
  assert.match(source, /aria-hidden="true"/)
})

test('brand positions remain legible and footer punctuation is normalized', () => {
  const header = readFileSync(new URL('components/site-header.tsx', root), 'utf8')
  const footer = readFileSync(new URL('components/site-footer.tsx', root), 'utf8')
  assert.match(header, /alt="YIDIANYUAN logo"/)
  assert.match(footer, /legalOwner/)
  assert.doesNotMatch(footer, /\{company\.legalName\}\. All rights reserved/)
  assert.equal(existsSync(new URL('public/icon.svg', root)), true, 'admin proxy favicon fallback must be branded')
})

test('approved motion plan is represented by three component-level motion scenes', () => {
  const sources = [
    'components/home/category-grid.tsx',
    'components/home/manufacturing-facts-section.tsx',
    'components/product-card.tsx',
  ].map((file) => readFileSync(new URL(file, root), 'utf8')).join('\n')
  assert.ok((sources.match(/motion\/react/g) ?? []).length >= 3)
  assert.doesNotMatch(sources, /initial=\{[^\n]*opacity:\s*0(?:[,\s}]|$)/)
})

test('category cards keep product imagery unobscured by separating image and copy', () => {
  const source = readFileSync(new URL('components/home/category-grid.tsx', root), 'utf8')
  assert.doesNotMatch(source, /bg-gradient-to-t/)
  assert.match(source, /data-category-image/)
  assert.match(source, /object-contain/)
  assert.match(source, /data-category-content/)
})

test('header and footer use the complete transparent official logo without duplicate wordmarks', () => {
  const header = readFileSync(new URL('components/site-header.tsx', root), 'utf8')
  const footer = readFileSync(new URL('components/site-footer.tsx', root), 'utf8')
  const layout = readFileSync(new URL('app/layout.tsx', root), 'utf8')

  assert.equal(existsSync(new URL('public/images/logo-transparent.png', root)), true)
  assert.equal(existsSync(new URL('public/images/logo.jpg', root)), false, 'obsolete white-canvas logo must be removed')
  assert.match(header, /src="\/images\/logo-transparent\.png"/)
  assert.doesNotMatch(header, /<strong[^>]*>YIDIANYUAN<\/strong>/)
  assert.doesNotMatch(header, /Specialty apparel manufacturing/)
  assert.match(footer, /src="\/images\/logo-transparent\.png"/)
  assert.doesNotMatch(footer, /bg-background p-3/)
  assert.doesNotMatch(footer, /font-serif text-base tracking-\[0\.08em\].*YIDIANYUAN/)
  assert.match(layout, /logo: 'https:\/\/yidiancostume\.com\/images\/logo-transparent\.png'/)
})

test('every homepage section has perceptible progressive-enhancement motion', () => {
  const sections = {
    'components/home/hero-slider.tsx': 'hero',
    'components/home/category-grid.tsx': 'categories',
    'components/home/featured-products.tsx': 'featured-products',
    'components/home/oem-process-section.tsx': 'oem-process',
    'components/home/manufacturing-facts-section.tsx': 'manufacturing',
    'components/home/quality-control-section.tsx': 'quality-control',
    'components/home/applications-section.tsx': 'applications',
    'components/home/faq-preview-section.tsx': 'faq',
    'app/page.tsx': 'news',
  }

  for (const [file, id] of Object.entries(sections)) {
    const source = readFileSync(new URL(file, root), 'utf8')
    assert.match(source, new RegExp(`data-motion-section="${id}"`), `${file} must identify its motion scene`)
    assert.match(source, /MotionReveal|motion\./, `${file} must implement visible motion`)
  }

  const reveal = readFileSync(new URL('components/motion/motion-reveal.tsx', root), 'utf8')
  assert.match(reveal, /useReducedMotion/)
  assert.match(reveal, /whileInView/)
  assert.match(reveal, /once:\s*true/)
  assert.doesNotMatch(reveal, /opacity:\s*0(?:[,\s}]|$)/)
  assert.match(readFileSync(new URL('components/product-card.tsx', root), 'utf8'), /whileInView/)
})
