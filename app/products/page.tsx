import type { Metadata } from 'next'
import { InnerPageHero } from '@/components/inner-page-hero'
import { ProductCard } from '@/components/product-card'
import { SiteShell } from '@/components/site-shell'
import { getCategories, getProducts } from '@/lib/products-db'
import { getLocalized } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Wholesale Costume & Specialty Apparel Products',
  description: 'Explore representative stage costumes, porch goose outfits, and pet clothes available for OEM/ODM wholesale programs.',
  alternates: { canonical: '/products' },
  openGraph: { type: 'website', url: '/products', images: ['/images/banner-1.jpg'] },
}

export const revalidate = 60

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])
  return (
    <SiteShell>
      <InnerPageHero eyebrow="Product catalog" title="Garments built for distinct wholesale programs" description="Browse representative products across our three confirmed lines. Share your references, sizing and quantity for OEM/ODM development." image="/images/banner-1.jpg" />
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3" aria-label="Product categories">
            {categories.map((category) => <a key={category.slug} href={`#${category.slug}`} className="rounded-full border border-primary/25 bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary">{getLocalized(category.name)}</a>)}
          </div>
          {categories.map((category) => (
            <section key={category.slug} id={category.slug} className="scroll-mt-28 pt-16" aria-labelledby={`${category.slug}-heading`}>
              <h2 id={`${category.slug}-heading`} className="font-serif text-3xl text-foreground">{getLocalized(category.name)}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">{getLocalized(category.shortDescription)}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.filter((product) => product.category === category.slug).map((product) => <ProductCard key={product.slug} product={product} />)}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
