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

test('hero keeps exactly one semantic page heading as slides change', () => {
  const source = readFileSync(new URL('components/home/hero-slider.tsx', root), 'utf8')
  assert.match(source, /const Heading = i === index \? 'h1' : 'h2'/)
  assert.match(source, /<Heading/)
  assert.doesNotMatch(source, /<h1 className=/)
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
  assert.match(header, />YIDIANYUAN</)
  assert.match(footer, /legalOwner/)
  assert.doesNotMatch(footer, /\{company\.legalName\}\. All rights reserved/)
})

test('approved motion plan is represented by three component-level motion scenes', () => {
  const sources = [
    'components/home/category-grid.tsx',
    'components/home/manufacturing-facts-section.tsx',
    'components/product-card.tsx',
  ].map((file) => readFileSync(new URL(file, root), 'utf8')).join('\n')
  assert.ok((sources.match(/motion\/react/g) ?? []).length >= 3)
  assert.doesNotMatch(sources, /initial=\{[^\n]*opacity:\s*0/)
})
