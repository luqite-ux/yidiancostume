import { ApplicationsSection } from '@/components/home/applications-section'
import { CategoryGrid } from '@/components/home/category-grid'
import { FaqPreviewSection } from '@/components/home/faq-preview-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { HeroSlider } from '@/components/home/hero-slider'
import { ManufacturingFactsSection } from '@/components/home/manufacturing-facts-section'
import { OemProcessSection } from '@/components/home/oem-process-section'
import { QualityControlSection } from '@/components/home/quality-control-section'
import { NewsEmptyState } from '@/components/news-empty-state'
import { SiteShell } from '@/components/site-shell'
import { getPublishedArticles } from '@/lib/articles-db'
import { getCategories, getProducts } from '@/lib/products-db'

export const revalidate = 60

export default async function HomePage() {
  const [categories, products, articles] = await Promise.all([getCategories(), getProducts(), getPublishedArticles()])
  return (
    <SiteShell>
      <HeroSlider />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={products} />
      <OemProcessSection />
      <ManufacturingFactsSection />
      <QualityControlSection />
      <ApplicationsSection />
      <FaqPreviewSection />
      <section className="fabric-texture bg-secondary py-20 sm:py-28" aria-labelledby="news-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">News</p>
          <h2 id="news-heading" className="mt-3 text-center font-serif text-3xl text-foreground sm:text-4xl">
            Updates from YIDIANYUAN
          </h2>
          <div className="mt-10">{articles.length ? <div className="grid gap-4 sm:grid-cols-3">{articles.slice(0, 3).map((article) => <a key={article.slug} href={`/news/${article.slug}`} className="rounded-sm border border-border bg-card p-5"><time className="text-xs text-muted-foreground">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US') : ''}</time><h3 className="mt-2 font-serif text-lg">{article.title}</h3></a>)}</div> : <NewsEmptyState />}</div>
        </div>
      </section>
    </SiteShell>
  )
}
